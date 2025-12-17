<template>
    <div class="results-container" v-if="counterStore.round > 0">

        <!-- Partida en Curso - Líder Actual -->
        <v-card class="leader-card mb-4" elevation="4">
            <v-card-title class="d-flex align-center justify-space-between">
                <span class="text-h6">Lider actual</span>
            </v-card-title>
            <v-card-text>
                <div class="d-flex align-center ga-4 justify-space-between">

                    <div>
                        <div class="text-h4 font-weight-bold">{{ currentLeader?.name }}</div>
                        <div class="text">{{ currentLeader?.totalScore }} Puntos</div>
                    </div>
                    <v-avatar :size="80" :style="{ backgroundColor: currentLeader?.color }">
                        <span class="text-h text-white">{{ currentLeader?.initials }}</span>
                    </v-avatar>
                </div>
            </v-card-text>
        </v-card>

        <!-- Tabla de Clasificación -->
        <span class="text-h6">Tabla de Clasificación</span>
        <div class="mb-4" elevation="4" v-for="(player, index) in sortedPlayers" :key="player.id">

            <div class="leaderboard-item bg-default d-flex align-center ga-3 pa-3 mb-2">
                <div class="rank-badge">{{ index + 1 }}</div>
                <v-avatar :size="50" :style="{ backgroundColor: player.color }">
                    <span class="text-h6 text-white">{{ player.initials }}</span>
                </v-avatar>
                <div class="flex-grow-1">
                    <div class="font-weight-bold">{{ player.name }}</div>
                    <div class="text-subtitle-2 text-grey">{{ player.totalScore }} puntos</div>
                </div>
                <div class="position-change" v-if="previousRanking[player.id]">
                    <v-icon :color="getPositionChange(player.id, index) === 'up' ? 'success' : 'error'" size="small">
                        {{ getPositionChange(player.id, index) === 'up' ? 'mdi-trending-up' :
                            'mdi-trending-down' }}
                    </v-icon>
                </div>
            </div>

        </div>

        <!-- Progresión de Puntuaciones -->
        <span class="text-h6">Progresión de Puntuaciones</span>
        <v-card class="chart-card" elevation="4">

            <v-card-text>
                <canvas ref="chartCanvas"></canvas>


            </v-card-text>
        </v-card>
    </div>
    <div v-else class="no-matches">
        <p class="bold-text"> Sin partida activa</p>
        <p>
            Parece que no hay ninguna partida de UNO en curso, ¿Listo para romper algunas amistades?
        </p>

        <v-btn class="btn-secondary" :disabled="counterStore.$state.round > 0" @click="router.push('/players')">
            Nueva partida
        </v-btn>
    </div>
</template>

<script lang="ts" setup>
import { useCounterStore } from '@/stores/Counter';
import { computed, onMounted, ref, watch } from 'vue';
import { Chart, registerables } from 'chart.js';
import { useRouter } from 'vue-router';
const router = useRouter();
Chart.register(...registerables);

const counterStore = useCounterStore();
const chartCanvas = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;
const previousRanking = ref<Record<string, number>>({});

const players = computed(() => counterStore.players);
const round = computed(() => counterStore.round);

const sortedPlayers = computed(() => {
    return [...players.value].sort((a, b) => (b.totalScore || 0) - (a.totalScore || 0));
});

const currentLeader = computed(() => sortedPlayers.value[0]);



// Función para obtener el cambio de posición
const getPositionChange = (playerId: string, currentIndex: number): 'up' | 'down' | null => {
    const previousIndex = previousRanking.value[playerId];
    if (previousIndex === undefined) return null;
    if (currentIndex < previousIndex) return 'up';
    if (currentIndex > previousIndex) return 'down';
    return null;
};

// Función para obtener el color del jugador
const getPlayerColor = (playerId: string): string => {
    const player = players.value.find(p => p.id === playerId);
    return player?.color || '#000000';
};

// Crear el gráfico de progresión
const createChart = () => {
    if (!chartCanvas.value) return;

    // Destruir el gráfico anterior si existe
    if (chartInstance) {
        chartInstance.destroy();
    }

    // Obtener los datos agrupados por ronda
    const maxRound = Math.max(...counterStore.scores.map(s => s.round), 0);
    const rounds = Array.from({ length: maxRound + 1 }, (_, i) => `R${i + 1}`);

    // Preparar datos para cada jugador
    const datasets = sortedPlayers.value.map(player => {
        const data = [];
        let cumulativeScore = 0;

        for (let r = 0; r <= maxRound; r++) {
            const roundScores = counterStore.scores.filter(s => s.userId === player.id && s.round === r);
            if (roundScores.length > 0) {
                const roundTotal = roundScores.reduce((sum, s) => sum + s.value, 0);
                cumulativeScore += roundTotal;
            }
            data.push(cumulativeScore);
        }

        return {
            label: player.name,
            data: data,
            borderColor: player.color,
            backgroundColor: player.color + '40',
            tension: 0.4,
            fill: false,
        };
    });

    chartInstance = new Chart(chartCanvas.value, {
        type: 'line',
        data: {
            labels: rounds,
            datasets: datasets,
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#ffffff',
                        usePointStyle: false,
                        generateLabels(chart) {
                            return chart.data.datasets.map((dataset, i) => ({
                                text: dataset.label || '',
                                fillStyle: String(dataset.borderColor), // Cast to string
                                strokeStyle: String(dataset.borderColor), // Cast to string
                                fontColor: '#ffffff',
                                lineWidth: 2,
                                hidden: !chart.isDatasetVisible(i),
                                datasetIndex: i,
                                pointStyle: 'circle'
                            }));
                        }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                },

            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 50,
                    },
                },
            },
            elements: {
                point: {
                    radius: 4,
                    hoverRadius: 6,
                },
            },
        },
        plugins: [],
    });
};

// Actualizar ranking anterior sortPlayers
const updatePreviousRanking = () => {
    sortedPlayers.value.forEach((player, index) => {
        previousRanking.value[player.id] = index;
    });
};

// Cargar datos al montar
onMounted(async () => {
    await counterStore.refreshDataFromDB();
    updatePreviousRanking();
    createChart();
});

// Actualizar gráfico cuando cambien los datos
watch(() => [counterStore.scores, counterStore.players], () => {
    createChart();
}, { deep: true });

// Variables de estadísticas adicionales
const additionalStats = computed(() => players.value.length > 0);
</script>

<style lang="scss" scoped>
.results-container {
    max-width: 1200px;
    margin: 0 auto;
}

.bold-text {
    font-size: 1.5rem;
    font-weight: bold;
}

.no-matches {
    display: flex;
    flex-direction: column;
    text-align: center;
    color: var(--color-text-secondary);
    justify-content: center;
    align-items: center;
    height: 100%;
    gap: 1rem;
}

.leader-card {
    background: var(--color-bg-2);
    color: white;
    border-radius: 1rem;

    :deep(.v-card-title),
    :deep(.v-card-text) {
        color: white;
    }
}

.leaderboard-card {
    :deep(canvas) {
        max-height: 400px;
    }
}

.leaderboard-item {
    border-radius: 12px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
}



.bg-default {
    background-color: var(--color-bg-2) !important;
    color: white;
}

.rank-badge {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 18px;
}

.legend-container {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
}

.legend-item {
    padding: 4px 12px;
    background-color: #f5f5f5;
    border-radius: 20px;
}

.legend-color {
    width: 20px;
    height: 20px;
    border-radius: 4px;
}

.chart-card {
    background-color: var(--color-bg-2);

    :deep(canvas) {
        max-height: 400px;
    }
}
</style>