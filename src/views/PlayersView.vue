<template>
    <div class="d-flex flex-column ga-3">

        <h2>Añadir jugadores</h2>

        <p>Nombre del jugador</p>

        <v-text-field append-icon="mdi-plus" label="Escriba el nombre del jugador..." variant="outlined"
            v-model="newPlayerName" maxlength="20" :rules="[
                v => !v || v.length >= 3 || 'Mínimo 3 caracteres',
                v => !v || v.length <= 20 || 'Máximo 20 caracteres',
                v => !v || /^[a-zA-Z\s]*$/.test(v) || 'Solo letras y espacios permitidos'
            ]" counter @input="newPlayerName = $event.target.value.replace(/[^a-zA-Z\s]/g, '')"
            @click:append="addPlayer()">

        </v-text-field>

        <p class="subtitle">Jugadores ({{ players.length }})</p>
        <ul class="player-list" :key="players.length">
            <li v-for="player in players" :key="player.id">
                <playerCard :player="player" />
            </li>
        </ul>
        <v-btn class="btn-primary" @click="() => { router.push('scores') }">¡Empezar partida!</v-btn>
    </div>
</template>

<script lang="ts" setup>
import { useCounterStore } from '@/stores/Counter';
import { ref, computed, onMounted } from 'vue';
import PlayerCard from '@/components/PlayerCard.vue';
import {useRouter} from "vue-router";

const router = useRouter();
const counterStore = useCounterStore();

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
    background-color: white;
    border-radius: 1rem;
}

.subtitle {
    font-weight: bold;
}

.player-list {
    min-height: 50vh;
    height: 50vh;
    list-style: none;
    padding: 0;
    margin: 0;
    overflow-y: auto;
}
</style>