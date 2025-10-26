<script setup>
import { motion } from "motion-v"

const cards = [
  { id: 1, color: "#4361EE", label: "5", rotate: -24, z: 1 ,left:-30},   // azul
  { id: 2, color: "#55AA55", label: "7", rotate: -12, z: 2,left:10 },    // verde
  { id: 3, color: "#E63946", label: "2", rotate: 0, z: 5 },   // rojo
  { id: 4, color: "#F4C430", label: "9", rotate: 12, z:4,right:10  },    // amarillo
  { id: 5, color: "#0D1117", label: "WILD", rotate: 24, z:3,right:30  }  // negro (comodín)
]
</script>

<template>
  <div class="fan-container">
    <motion.div v-for="card in cards" :key="card.id" :initial="{ rotate: card.rotate, y: 0,right : card.right, left: card.left, scale: 1 }"

      :style="{ backgroundColor: card.color, zIndex: card.z }" class="uno-card"></motion.div>
  </div>
</template>

<style scoped>
.fan-container {
  position: relative;
  width: 320px;
  height: 480px;
  margin: 60px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.uno-card {
  position: absolute;
  width: 220px;
  height: 340px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  /* sin borde y sin sombra */
}
</style>