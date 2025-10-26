<template>

    <div class="d-flex flex-column align-center ga-5">
        <UnoCards />
        <h1>Score UNO</h1>
        <p>La forma más facil de registrar y revivir tus partidas de UNO</p>
        <div class="d-flex flex-column align-center ga-3 responsive-width ">
            <v-btn class="btn-secondary button" >
                Nueva partida
            </v-btn>

            <v-btn variant="tonal" class="button">
                Ver partidas
            </v-btn>

        </div>
    </div>
</template>
<script lang="ts" setup>
import UnoCards from '@/components/UnoCards.vue'; 
</script>

<style lang="css" scoped>

.button {
    width: 100%;
}
.responsive-width {
    width: 100%;
}

@media (min-width: 960px) {
    .responsive-width {
        width: 33%;
    }
}
</style>