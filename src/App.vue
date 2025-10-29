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

<style >
html, body, #app, .v-application {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden; /* 🔸 evita cualquier scroll */
}

.v-application {
  min-height: 100vh;
}body {
  overflow-y: auto;
}


.app {
  display: flex;
  flex-direction: column;
  height: 100vh; /* 🔸 ocupa toda la pantalla */
  width: 100vw;
  background-color: var(--main-color-bg);
  overflow: hidden; /* 🔸 nada se desborda */
}

.main-content {
  flex: 1;
  padding: 1rem;
  overflow: auto; /* 🔸 evita scroll interno */
  padding: 1rem; /* opcional */
}
</style>
