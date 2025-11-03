<template>
    <div class="player-card">
        <section class="d-flex align-center ga-2 w-100">
            <v-avatar :style="{ backgroundColor: player.color }">
                <span class="text-h5">{{ player.initials }}</span>

            </v-avatar>
            <div class="player-name">
                
                    <span class="title">{{ player.name }}</span>
                    <span class="subtitle">Puntuación total: {{ player.totalScore }}</span>
                
            </div>
        </section>
        <section class="score-section">
            <v-number-input variant="solo" v-model="playerScore" :min="0" :max="99999" control-variant="split" inset
                :step="1" density="compact" class="score-input">
            </v-number-input>
        </section>
    </div>
</template>
<script lang="ts" setup>
import Player from '@/models/Player';
import { useCounterStore } from '@/stores/Counter';
import { computed } from 'vue';

const counterStore = useCounterStore();

interface Props {
    player: Player;
}

const props = defineProps<Props>();

const playerScore = computed({
    get: () => props.player.score || 0,
    set: (value: number) => counterStore.updatePlayerScore(props.player.id, value)
});


</script>

<style lang="scss" scoped>
.player-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    margin-bottom: 0.5rem;
    background-color: white;
}

.player-name {
    width: 100%;

    display: flex;

    flex-direction: column;

    .title {
        font-weight: bold;
        font-size: 1.2rem;
    }

    .subtitle {
        color: var(--color-primary);
        font-size: 0.8rem;
    }
}

.score-section {
    width: 63%;
    display: flex;
    align-items: center;
}

.score-input {
    width: 100%;




    :deep(.v-input__details) {
        display: none;
    }
}
</style>