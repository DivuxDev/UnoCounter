<template>
    <div class="navbar">
        <div class="left-buttons" v-if="commonStore.hasMenu">
            <!-- <v-btn icon="mdi-arrow-left" variant="text" @click="goHome()"></v-btn> -->
            <v-btn icon="mdi-menu" variant="text" @click="openMenu()"></v-btn>

        </div>
        <div class="middle">
            <h3>
                Uno Tracker
            </h3>
        </div>
        <!-- <div class="right-buttons">
            <v-btn icon="mdi-menu" variant="text" @click="openMenu()"></v-btn>
        </div> -->
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
    router.push('/')
}

</script>

<style lang="css" scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
}
</style>