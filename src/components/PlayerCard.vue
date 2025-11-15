<template>
    <div class="player-card">
        <section class="d-flex align-center ga-2 w-100" >
            <v-avatar :style="{ backgroundColor: player.color }">
                <span class="text-h6">{{ player.initials }}</span>
            </v-avatar>
            <div class="player-name">

            
            <div v-if="!isEditing" >
                <span>{{ player.name }}</span>
            </div>
            <div v-else>
                <v-text-field
                    v-model="editedName"
                    :rules="nameRules"
                    density="compact"
                    variant="outlined"
                    hide-details
                    @keyup.enter="saveEdit"
                ></v-text-field>
            </div>
            </div>
        </section>
        <section class="d-flex align-center ga-3 ml-3">
            <v-btn
                v-if="!isEditing"
                variant="plain"
                density="compact"
                icon="mdi-pencil"
                color="black"
                @click="startEdit"
            ></v-btn>
            <v-btn
                v-else
                variant="plain"
                density="compact"
                icon="mdi-content-save"
                color="success"
                @click="saveEdit"
            ></v-btn>
            <v-btn
                v-if="!isEditing"
                variant="plain"
                density="compact"
                icon="mdi-trash-can-outline"
                color="red"
                @click="deleteUser"
            ></v-btn>
            <v-btn
                v-else
                variant="plain"
                density="compact"
                icon="mdi-close"
                color="error"
                @click="cancelEdit"
            ></v-btn>
        </section>
    </div>
</template>
<script lang="ts" setup>
import type Player from '@/models/Player';
import { useCounterStore } from '@/stores/Counter.ts';
import { ref } from 'vue';

const counterStore = useCounterStore();
const isEditing = ref(false);
const editedName = ref('');

interface Props {
    player: Player;
}

const props = defineProps<Props>();

const nameRules = [
    (v: string) => !!v || 'El nombre es requerido',
    (v: string) => v.length >= 3 || 'El nombre debe tener al menos 3 caracteres',
    (v: string) => v.length <= 20 || 'El nombre debe tener máximo 20 caracteres',
];

function deleteUser() {
    counterStore.removePlayer(props.player.id);
}

function startEdit() {
    editedName.value = props.player.name;
    isEditing.value = true;
}

function saveEdit() {
    if (editedName.value.length >= 3 && editedName.value.length <= 20) {
        counterStore.updatePlayer(props.player.id, editedName.value);
        isEditing.value = false;
    }
}

function cancelEdit() {
    isEditing.value = false;
    editedName.value = props.player.name;
}
</script>

<style lang="css" scoped>
.player-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    margin-bottom: 0.5rem;
    background-color: #fafafa;
}

.player-name{
    width: 100%;
}
</style>