<script setup lang="ts">
import TheNavbar from '@/components/TheNavbar.vue';

import TheFooter from '@/components/TheFooter.vue';

import { useCommonStore } from '@/stores/Common';

const commonStore = useCommonStore();
commonStore.hasMenu = false;
</script>

<template>
 <v-theme-provider >
  <v-app>
    <div class="app">
      <TheNavbar />
      <main class="main-content">
        <router-view />
      </main>
      <TheFooter />
    </div>
  </v-app>
</v-theme-provider>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

}

.main-content {
  flex: 1;
  padding: 2rem;
}</style>
