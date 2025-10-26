<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCommonStore } from '@/stores/Common';
const commonStore = useCommonStore();
const router = useRouter();

function goTo(path: string) {
	router.push(path);
	// close sidebar after navigation
	commonStore.changeSidebarVisibility();
}
</script>

<template>
	<transition name="slide">
		<aside class="app-sidebar" v-if="commonStore.showSidebar">
			<nav>
				<ul>
					<li>
						<button class="nav-btn" @click="goTo('/players')">Players</button>
					</li>
					<li>
						<button class="nav-btn" @click="goTo('/scores')">Scores</button>
					</li>
					<li>
						<button class="nav-btn" @click="goTo('/results')">Results</button>
					</li>
				</ul>
			</nav>
		</aside>
	</transition>
</template>

<style scoped>
.app-sidebar {
	position: fixed;
	top: var(--navbar-height, 56px);
	left: 0;
	height: calc(100vh - var(--navbar-height, 56px));
	width: 200px;
	background: #ffffff; 
	box-shadow: 2px 0 8px rgba(0,0,0,0.08);
	padding: 1rem;
	z-index: 1200;
}
.app-sidebar nav ul {
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}
.nav-btn {
	width: 100%;
	text-align: left;
	padding: 0.5rem 0.75rem;
	border-radius: 6px;
	border: none;
	background: transparent;
	cursor: pointer;
	font-size: 1rem;
}
.nav-btn:hover {
	background: rgba(0,0,0,0.04);
}

/* Slide animation */
.slide-enter-active,
.slide-leave-active {
	transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
	transform: translateX(-100%);
}

.slide-enter-to,
.slide-leave-from {
	transform: translateX(0);
}
</style>

