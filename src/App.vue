<script setup lang="ts">
import TheNavbar from '@/components/TheNavbar.vue';

import TheFooter from '@/components/TheFooter.vue';
import TheSidebar from '@/components/TheSidebar.vue';



</script>

<template>

    <div class="app">
      <TheSidebar />
      <TheNavbar />
      <VNotifierContainer /> 
      <main class="main-content">
        <router-view />
      </main>
      <TheFooter />
    </div>

</template>

<style scoped>
html, body, #app, .v-application {
  font-family: 'Roboto', sans-serif;
}
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--main-color-bg);
}

.main-content {
  flex: 1;
  padding: 1rem;
}</style>
