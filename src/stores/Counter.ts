import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type Player from "@/models/Player";
import type Score from "@/models/Score";
import { getInitials, getRandomPrimaryColor } from "@/utils/CommonUtils";
import { useNotifier } from "vuetify-notifier";
import { StorageService } from "@/services/StorageService";

export const useCounterStore = defineStore("counter", () => {
  const players = ref<Player[]>([]);
  const scores = ref<Score[]>([]);
  const round = ref<number>(0);
  const notifier = useNotifier();

  // Load round from db when store is initialized
  StorageService.getGameState()
    .then(data => {
      if (data && data.round !== undefined) {
        round.value = data.round;
      }
    })
    .catch(() => {
      notifier.toast({
        text: "Error al cargar el estado del juego",
        type: "error",
      });
    });

  const addPlayer = async (name: string) => {
    const newPlayer = {
      name: name,
      id: crypto.randomUUID(),
      initials: getInitials(name),
      color: getRandomPrimaryColor(),
    };

    try {
      await StorageService.addPlayer(newPlayer);
      players.value.push(newPlayer);
      notifier.toast({
        text: "Usuario añadido correctamente!!",
        type: "success",
      });
    } catch (error) {
      notifier.toast({
        text: "Error al añadir el usuario",
        type: "error",
      });
    }
  };

  const removePlayer = async (id: string) => {
    try {
      await StorageService.deletePlayer(id);
      players.value = players.value.filter((player) => player.id !== id);
      notifier.toast({
        text: "Usuario eliminado correctamente!!",
        type: "error",
      });
    } catch (error) {
      notifier.toast({
        text: "Error al eliminar el usuario",
        type: "error",
      });
    }
  };

  const updatePlayer = async (id: string, name: string) => {
    const player = players.value.find((p) => p.id === id);
    if (player) {
      const updatedPlayer = {
        ...player,
        name: name,
        initials: getInitials(name)
      };

      try {
        await StorageService.updatePlayer(id, updatedPlayer);
        Object.assign(player, updatedPlayer);
        notifier.toast({
          text: "Usuario actualizado correctamente!!",
          type: "success",
        });
      } catch (error) {
        notifier.toast({
          text: "Error al actualizar el usuario",
          type: "error",
        });
      }
    }
  };

  // Cargar los jugadores al inicio
  StorageService.getPlayers()
    .then(data => {
      players.value = data;
    })
    .catch(() => {
      notifier.toast({
        text: "Error al cargar los jugadores",
        type: "error",
      });
    });

  const updatePlayerScore = (playerId: string, score: number) => {
    const player = players.value.find(p => p.id === playerId);
    if (player) {
      player.score = score;
    }
  };

  const getPlayersWithTotalScores = async () => {
    try {
      const playersWithTotals = await StorageService.getPlayersWithTotalScores();
      return playersWithTotals;
    } catch (error) {
      notifier.toast({
        text: "Error al cargar los jugadores con sus totales",
        type: "error",
      });
      throw error;
    }
  };

  const refreshDataFromDB = async () => {
    try {
      // Obtener jugadores con sus totales y scores actualizados
      const [playersWithTotals, scoresData] = await Promise.all([
        StorageService.getPlayersWithTotalScores(),
        StorageService.getScores()
      ]);

      // Actualizar el array de players con los nuevos datos
      players.value = playersWithTotals.map(p => ({
        ...p,
        score: 0  // Resetear el score actual a 0 para la nueva ronda
      }));

      // Actualizar los scores
      scores.value = scoresData;

      // Recargar el gameState
      const gameState = await StorageService.getGameState();
      round.value = gameState.round;

    } catch (error) {
      notifier.toast({
        text: "Error al refrescar los datos desde la base de datos",
        type: "error",
      });
    }
  };

  const resetGame = async () => {
    try {
      // Reset scores
      await StorageService.deleteAllScores();

      // Reset game state
      await StorageService.updateGameState({ round: 0 });

      // Reset local state
      scores.value = [];
      round.value = 0;
      players.value.forEach(player => {
        player.score = 0;
      });

      notifier.toast({
        text: "Partida reiniciada correctamente",
        type: "success",
      });
    } catch (error) {
      notifier.toast({
        text: "Error al reiniciar la partida",
        type: "error",
      });
    }
  };

  const saveRoundAndAdvance = async () => {
    // Save scores for current round
    const roundScores = players.value.map(player => ({
      id: crypto.randomUUID(),
      userId: player.id,
      round: round.value,
      value: player.score || 0
    }));

    try {
      // Save all scores for this round
      await Promise.all(roundScores.map(score => 
        StorageService.addScore(score)
      ));

      // Update game state with new round
      const newRound = round.value + 1;
      await StorageService.updateGameState({ round: newRound });

      // Update local state
      round.value = newRound;
      scores.value = [...scores.value, ...roundScores];

      // Reset player scores for next round
      players.value.forEach(player => {
        player.score = 0;
      });

      notifier.toast({
        text: "¡Ronda guardada correctamente!",
        type: "success",
      });
    } catch (error) {
      notifier.toast({
        text: "Error al guardar la ronda",
        type: "error",
      });
    }
  };

  // Load scores when store is initialized
  StorageService.getScores()
    .then(data => {
      scores.value = data;
    })
    .catch(() => {
      notifier.toast({
        text: "Error al cargar las puntuaciones",
        type: "error",
      });
    });

  return { 
    players, 
    scores, 
    round,
    addPlayer, 
    removePlayer, 
    updatePlayer,
    updatePlayerScore,
    saveRoundAndAdvance,
    resetGame,
    getPlayersWithTotalScores,
    refreshDataFromDB
  };
});
