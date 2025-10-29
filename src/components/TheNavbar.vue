<template>
    <div class="navbar parent">
        <div class="div1">
            <v-btn v-if="commonStore.hasGoBack" icon="mdi-arrow-left" variant="text" @click="goHome()"></v-btn>
            <v-btn v-if="commonStore.hasMenu" icon="mdi-menu" variant="text" @click="openMenu()"></v-btn>

        </div>
        <div class="middle" @click="goHome()" style="cursor: pointer;">
            <h3>
                {{ commonStore.navbarTitle === '' ? 'Uno Counter' : commonStore.navbarTitle }}
            </h3>
        </div>
        <div class="div3">

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

    height: var(--navbar-height);
    padding: 0 0.5rem; 
    z-index: 1300; 
    background-color: #FEFFFE  ;
    border-bottom: 1px solid var(--color-bg-3);
}
.parent {
display: grid;
grid-template-columns: 0.2fr 1fr 0.2fr;
grid-template-rows: 1fr;
grid-column-gap: 0px;
grid-row-gap: 0px;
}

.div1 { grid-area: 1 / 1 / 2 / 2; }

.div3 { grid-area: 1 / 3 / 2 / 4; }
.middle {
    grid-area: 1 / 2 / 2 / 3;
    display: flex;
    justify-content: center;
    align-self: center;
}
</style>