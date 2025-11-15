<template>
  <div class="home">
    <div class="card-holder">
      <UnoCards />
    </div>

    <h1>Score UNO</h1>
    <p>La forma más fácil de registrar y revivir tus partidas de UNO</p>

    <div class="buttons">
      <v-btn class="btn-secondary button" :disabled="counterStore.$state.round>0"  @click="router.push('/scores')">
        Nueva partida
      </v-btn>

      <v-btn variant="tonal" class="button" @click="router.push('/results')">
        Ver partida en curso
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
import UnoCards from '@/components/UnoCards.vue';
import { useRouter } from 'vue-router';
const router = useRouter();

import{ useCounterStore }from '@/stores/Counter';
import { onMounted } from 'vue';

const counterStore = useCounterStore();

</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%; /* ocupa todo el main-content */
  width: 100%;
  gap: 1.5rem;
  text-align: center;
  overflow: hidden; /* 🔸 sin scroll */
}

.card-holder {
  flex: 0 0 auto;
  width: clamp(200px, 40vw, 350px); /* 🔸 tamaño adaptable */
  height: auto;
}

.button {
  width: 100%;
  max-width: 250px;
}

.buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
}

@media (min-width: 960px) {
  .buttons {
    width: 33%;
  }
}
</style>
