<template>
    <div class="d-flex flex-column ga-3 align-center">

        <h2 class="title">Configuración de Partida</h2>

        <p class="subtitle">Prepara tu juego y añade jugadores</p>

        <div class="section add-player-card">
            <span class="title">Añadir nuevo jugador </span>
            <v-text-field append-icon="mdi-plus" label="Escriba el nombre del jugador..." variant="outlined"
                v-model="newPlayerName" maxlength="20" :rules="[
                    v => !v || v.length >= 3 || 'Mínimo 3 caracteres',
                    v => !v || v.length <= 20 || 'Máximo 20 caracteres',
                    v => !v || /^[a-zA-Z\s]*$/.test(v) || 'Solo letras y espacios permitidos'
                ]" counter @input="newPlayerName = $event.target.value.replace(/[^a-zA-Z\s]/g, '')"
                @click:append="addPlayer()" >
    
            </v-text-field>
        </div>

        <div class="players-ready-card section"><p class="title">Jugadores listos</p> <span class="players-ready-number">{{ players.length }}</span></div>
        <ul class="player-list section" :key="players.length">
            <li v-for="player in players" :key="player.id">
                <playerCard :player="player" />
            </li>
            <p v-if=" players.length < 1">No hay jugadores aún, añade un jugador para continuar.</p>
        </ul>
        <v-btn class="btn-primary" :disabled="players.length < 1" @click="() => { router.push('scores') }"> {{ counterStore.round > 0 ? 'Ver Puntuaciones' : '¡Empezar partida!'}} </v-btn>
    </div>
</template>

<script lang="ts" setup>
import { useCounterStore } from '@/stores/Counter';
import { ref, computed, onMounted } from 'vue';
import PlayerCard from '@/components/PlayerCard.vue';
import {useRouter} from "vue-router";

const router = useRouter();
const counterStore = useCounterStore();

counterStore.round 

const newPlayerName = ref('');
const players = computed(() => counterStore.players);

// Cargar datos de la base de datos al entrar a la vista
onMounted(async () => {
    await counterStore.refreshDataFromDB();
});

const addPlayer = () => {
    if (newPlayerName.value.trim().length >= 3 && newPlayerName.value.trim().length <= 20) {
        counterStore.addPlayer(newPlayerName.value.trim());
        newPlayerName.value = '';
    }
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
    background-color: #F1F5F9;
    border-radius: 1rem;
    border: none;
}

.title {
    font-weight: bold;
}
.players-ready-card{
    align-items: center;
    display: flex;
    justify-content: space-between;

}

.subtitle {
    color: var(--color-text-secondary);
    font-size: 0.8rem;
}

.section{
    width: 100%;

}

.players-ready-number{
    background-color: var(--color-primary);
    opacity: 0.5;
    color:  var(--color-bg-1);
    border-radius: 5px;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
}

.add-player-card {
   box-shadow: 1px 1px 1px 1px rgba(194, 192, 192, 0.2);
    padding: 1rem;
    border-radius: 15px;
    background-color: white;
}
.player-list {
    border-radius: 15px;
    min-height: 40vh;
    height: 40vh;
    list-style: none;
    padding-top: 5px;
    margin: 0;
    overflow-y: auto;
}
</style>