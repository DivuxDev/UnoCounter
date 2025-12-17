<template>

        <template v-slot:default></template>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const loader = ref(true);

interface Props {
    loading: boolean;
}

const props = defineProps<Props>();
</script>