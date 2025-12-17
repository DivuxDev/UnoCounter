<template>
    <div class="d-flex flex-column ga-3">
        <h2>Añadir Puntuaciones</h2>

        <ul class="player-list" :key="players.length">
            <li v-for="player in players" :key="player.id">
                <playerScore :player="player" />
            </li>
             <p v-if="players.length < 1">No hay jugadores aún, añade un jugador para continuar.</p>
        </ul>
        <v-btn class="btn-primary" @click="saveAndAdvance" :disabled="players.length < 1">¡Guardar y siguiente ronda!</v-btn>
        <v-btn variant="tonal" v-if="counterStore.round >0" @click="showConfirmDialog = true">Finalizar partida</v-btn>

  
        <v-dialog v-model="showConfirmDialog" max-width="400">
            <v-card>
                <v-card-title class="text-h5">
                    ¿Finalizar partida?
                </v-card-title>
                <v-card-text>
                    ¿Estás seguro de que deseas finalizar la partida? Esta acción eliminará todas las puntuaciones y rondas actuales. No se podrá deshacer.
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey" variant="text" @click="showConfirmDialog = false">
                        Cancelar
                    </v-btn>
                    <v-btn color="error" variant="tonal" @click="resetGame">
                        Finalizar partida
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts" setup>
import { useCounterStore } from '@/stores/Counter';
import { useCommonStore } from '@/stores/Common';
import { computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import playerScore from '@/components/PlayerScore.vue';

const counterStore = useCounterStore();
const commonStore = useCommonStore();
const router = useRouter();
const showConfirmDialog = ref(false);


const players = computed(() => counterStore.players);

// Cargar datos de la base de datos al entrar a la vista
onMounted(async () => {
    await counterStore.refreshDataFromDB();
    commonStore.navbarTitle = 'Ronda ' + (counterStore.round + 1).toString();
});

const saveAndAdvance = async () => {
    await counterStore.saveRoundAndAdvance();
    commonStore.navbarTitle = 'Ronda ' + (counterStore.round + 1).toString();
};

const resetGame = async () => {
    await counterStore.resetGame();
    showConfirmDialog.value = false;
    router.push('/');
};


</script>
<style lang="scss" scoped>
:deep(.v-input__append) {
    background-color: var(--color-primary);
    border-radius: 1rem;
    color: white;
    padding: 1rem;
}

:deep(.v-field) {
    background-color: white;
    border-radius: 1rem;
}

.subtitle {
    font-weight: bold;
}

.player-list {
    border: 1px solid var(--color-bg-3);
    border-radius: 15px;
    min-height: 65vh;
    height: 65vh;
    list-style: none;
    padding: 15px;
    margin: 0;
    overflow-y: auto;
}
</style>