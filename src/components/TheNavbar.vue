<template>
  <header class="navbar">
      <div class="title" @click="goHome">
        <div >
          <span class="uno-red">U</span>
          <span class="uno-yellow">N</span>
          <span class="uno-green">O</span>
          <span class="tracker">Tracker</span>
        </div>

      </div>


    <nav class="tabs">
      <a
        v-for="tab in tabs"
        :key="tab.route"
        href="#"
        class="tab"
        :class="{ active: isActive(tab.route) }"
        @click.prevent="router.push(tab.route)"
      >
        <span class="material-symbols-outlined tab-icon">
         <v-icon size="small" :color="(isActive(tab.route) ? 'green' : 'grey')" :icon=tab.icon></v-icon>
        </span>
         
        <span class="tab-label">{{ tab.label }}</span>
      </a>
    </nav>
  </header>
</template>
<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { useCommonStore } from '@/stores/Common'

const router = useRouter()
const route = useRoute()
const commonStore = useCommonStore()

function goHome() {
  router.push('/')
}


const tabs = [
  { label: 'Inicio', route: '/', icon: 'mdi-home' },
  { label: 'Jugadores', route: '/players', icon: 'mdi-account' },
  { label: 'Puntuaciones', route: '/scores', icon: 'mdi-counter' },
  { label: 'resultados', route: '/results', icon: 'mdi-chart-bar' }
]

function isActive(path: string) {
  return route.path === path
}
</script>
<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 1300;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid white;
}


.title {
    width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 800;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.75rem 0.75rem 0.25rem;
}

.tracker {
  margin-left: 0.25rem;
  color: var(--color-text-secondary);
}

.custom-title {
  font-weight: 800;
}

/* ===== UNO COLORS ===== */
.uno-red {
  color: #ff5555;
}
.uno-yellow {
  color: #ffaa00;
}
.uno-green {
  color: var(--color-primary);
}

/* ===== ICON BUTTON ===== */
.icon-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--color-text-secondary);
}

/* ===== TABS ===== */
.tabs {
  display: flex;
  overflow-x: auto;
}

.tab {
  flex: 1;
  min-width: 80px;
  padding: 0.75rem 0.25rem;
  text-align: center;
  text-decoration: none;
  color: var(--color-text-secondary);
  border-bottom: 2px solid transparent;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.tab:hover {
  color: var(--color-text-secondary);
}

.tab.active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
}

.tab-icon {
  display: block;
  font-size: 24px;
  margin-bottom: 0.125rem;
}

.tab-label {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  white-space: nowrap;
}

/* Hide scrollbar */
.tabs::-webkit-scrollbar {
  display: none;
}
.tabs {
  scrollbar-width: none;
}
</style>
