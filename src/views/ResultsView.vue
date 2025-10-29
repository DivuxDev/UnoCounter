<template>
    <div class="results-container">
        <!-- Partida en Curso - Líder Actual -->
        <v-card class="leader-card mb-4" elevation="4">
            <v-card-title class="d-flex align-center justify-space-between">
                <span class="text-h6">Partida en Curso</span>
                <v-icon>mdi-trophy</v-icon>
            </v-card-title>
            <v-card-text>
                <div class="d-flex align-center ga-4">
                    <v-avatar :size="80" :style="{ backgroundColor: currentLeader?.color }">
                        <span class="text-h4 text-white">{{ currentLeader?.initials }}</span>
                    </v-avatar>
                    <div>
                        <div class="text-subtitle-2 text-grey">Líder Actual</div>
                        <div class="text-h5 font-weight-bold">{{ currentLeader?.name }}</div>
                        <div class="text-h6 text-primary">{{ currentLeader?.totalScore }} Puntos</div>
                    </div>
                </div>
            </v-card-text>
        </v-card>

        <!-- Tabla de Clasificación -->
        <v-card class="leaderboard-card mb-4" elevation="4">
            <v-card-title class="d-flex align-center ga-2">
                <v-icon>mdi-podium</v-icon>
                <span class="text-h6">Tabla de Clasificación</span>
            </v-card-title>
            <v-card-text>
                <div class="leaderboard-list">
                    <div 
                        v-for="(player, index) in sortedPlayers" 
                        :key="player.id" 
                        class="leaderboard-item d-flex align-center ga-3 pa-3 mb-2"
                        :class="getRankClass(index)"
                    >
                        <div class="rank-badge">{{ index + 1 }}</div>
                        <v-avatar :size="50" :style="{ backgroundColor: player.color }">
                            <span class="text-h6 text-white">{{ player.initials }}</span>
                        </v-avatar>
                        <div class="flex-grow-1">
                            <div class="font-weight-bold">{{ player.name }}</div>
                            <div class="text-subtitle-2 text-grey">{{ player.totalScore }} puntos</div>
                        </div>
                        <div class="position-change" v-if="previousRanking[player.id]">
                            <v-icon 
                                :color="getPositionChange(player.id, index) === 'up' ? 'success' : 'error'"
                                size="small"
                            >
                                {{ getPositionChange(player.id, index) === 'up' ? 'mdi-trending-up' : 'mdi-trending-down' }}
                            </v-icon>
                        </div>
                    </div>
                </div>
            </v-card-text>
        </v-card>

        <!-- Progresión de Puntuaciones -->
        <v-card class="chart-card" elevation="4">
            <v-card-title class="d-flex align-center ga-2">
                <v-icon>mdi-chart-line</v-icon>
                <span class="text-h6">Progresión de Puntuaciones</span>
            </v-card-title>
            <v-card-text>
                <canvas ref="chartCanvas"></canvas>
                <div class="legend-container mt-4">
                    <div 
                        v-for="player in sortedPlayers" 
                        :key="player.id"
                        class="legend-item d-flex align-center ga-2"
                    >
                        <div 
                            class="legend-color" 
                            :style="{ backgroundColor: getPlayerColor(player.id) }"
                        ></div>
                        <span class="text-body-2">{{ player.name }}</span>
                    </div>
                </div>
            </v-card-text>
        </v-card>

        <!-- Estadísticas Adicionales -->
        <v-row class="mt-4" v-if="additionalStats">
            <v-col cols="12" md="4">
                <v-card elevation="2">
                    <v-card-text class="text-center">
                        <v-icon color="primary" size="48">mdi el-games</v-icon>
                        <div class="text-h5 mt-2">{{ totalRounds }}</div>
                        <div class="text-subtitle-2">Rondas Jugadas</div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                <v-card elevation="2">
                    <v-card-text class="text-center">
                        <v-icon color="success" size="48">mdi-account-group</v-icon>
                        <div class="text-h5 mt-2">{{ players.length }}</div>
                        <div class="text-subtitle-2">Jugadores</div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                <v-card elevation="2">
                    <v-card-text class="text-center">
                        <v-icon color="warning" size="48">mdi-target</v-icon>
                        <div class="text-h5 mt-2">{{ averageScore }}</div>
                        <div class="text-subtitle-2">Puntos Promedio</div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts" setup>
import { useCounterStore } from '@/stores/Counter';
import { computed, onMounted, ref, watch } from 'vue';
import { Chart, registerables } from 'chart.js';

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

const totalRounds = computed(() => round.value);

const averageScore = computed(() => {
    if (players.value.length === 0) return 0;
    const total = players.value.reduce((sum, p) => sum + (p.totalScore || 0), 0);
    return Math.round(total / players.value.length);
});

// Función para obtener la clase CSS según la posición
const getRankClass = (index: number): string => {
    switch (index) {
        case 0: return 'bg-gold';
        case 1: return 'bg-silver';
        case 2: return 'bg-bronze';
        default: return 'bg-default';
    }
};

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
                    display: false,
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

.leader-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;

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

.bg-gold {
    background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
    color: white;
}

.bg-silver {
    background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
}

.bg-bronze {
    background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
}

.bg-default {
    background-color: #f5f5f5;
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
    :deep(canvas) {
        max-height: 400px;
    }
}
</style>