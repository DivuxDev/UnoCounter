<template>
    <div class="navbar">
        <div class="left-buttons">
            <v-btn v-if="commonStore.hasGoBack" icon="mdi-arrow-left" variant="text" @click="goHome()"></v-btn>
            <v-btn v-if="commonStore.hasMenu" icon="mdi-menu" variant="text" @click="openMenu()"></v-btn>

        </div>
        <div class="middle" @click="goHome()" style="cursor: pointer;">
            <h3>
                {{ commonStore.navbarTitle === '' ? 'Uno Counter' : commonStore.navbarTitle }}
            </h3>
        </div>
        <div class="navbar-right-buttons">

        </div>
    </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useCommonStore } from '@/stores/Common';
const commonStore = useCommonStore();

const router = useRouter();
function goHome() {
    router.push('/')
}

function openMenu() {
    commonStore.changeSidebarVisibility();
}

</script>

<style lang="css" scoped>
.navbar {
    --navbar-height: 56px;
    display: flex;
    justify-content: space-between;
    align-items: center; 
    height: var(--navbar-height);
    padding: 0 0.5rem; 
    z-index: 1300; 
    background-color: #FEFFFE  ;
    border-bottom: 1px solid var(--color-bg-3);
}
.navbar div {
    width: 33%;
}
.middle {
    display: flex;
    justify-content: center;
    align-self: center;
}
</style>