import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type Player from "@/models/Player";
import type Score from "@/models/Score";
import { getInitials, getRandomPrimaryColor } from "@/utils/CommonUtils";
import { useNotifier } from "vuetify-notifier";

export const useCounterStore = defineStore("counter", () => {
  const players = ref<Player[]>([]);
  const scores = ref<Score[]>([]);
  const round = ref<number>(1);
  const notifier = useNotifier();

  const addPlayer = (name: string) => {
    players.value.push({
      name: name,
      id: crypto.randomUUID(),
      initials: getInitials(name),
      color: getRandomPrimaryColor(),
    });

    notifier.toast({
      text: "Usuario añadido correctamente!!",
      type: "success",
    });
  };

  const removePlayer = (id: string) => {
    players.value = players.value.filter((player) => player.id !== id);
    notifier.toast({
      text: "Usuario elimnado correctamente!!",
      type: "error",
    });
  };

  const updatePlayer = (id: string, name: string) => {
    const player = players.value.find((p) => p.id === id);
    if (player) {
      player.name = name;
      player.initials = getInitials(name);
      notifier.toast({
        text: "Usuario actualizado correctamente!!",
        type: "success",
      });
    }
  };

  return { players, scores, addPlayer, removePlayer, updatePlayer };
});
