import type Player from '@/models/Player';
import type Score from '@/models/Score';

const API_URL = 'http://localhost:3001';

export const StorageService = {
    // Player operations
    async getPlayers(): Promise<Player[]> {
        const response = await fetch(`${API_URL}/players`);
        const data = await response.json();
        return data;
    },

    async getPlayersWithTotalScores(): Promise<(Player & { totalScore: number })[]> {
        const [players, scores] = await Promise.all([
            this.getPlayers(),
            this.getScores()
        ]);

        // Calcular el total de scores para cada jugador
        const playersWithTotals = players.map(player => {
            const totalScore = scores
                .filter(score => score.userId === player.id)
                .reduce((sum, score) => sum + score.value, 0);
                
            return {
                ...player,
                totalScore: totalScore
            };
        });
            console.log(playersWithTotals);
        return playersWithTotals;
    },

    async addPlayer(player: Player): Promise<void> {
        const response = await fetch(`${API_URL}/players`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(player)
        });
        if (!response.ok) {
            throw new Error('Failed to add player');
        }
    },

    async updatePlayer(id: string, player: Player): Promise<void> {
        const response = await fetch(`${API_URL}/players/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(player)
        });
        if (!response.ok) {
            throw new Error('Failed to update player');
        }
    },

    async deletePlayer(id: string): Promise<void> {
        const response = await fetch(`${API_URL}/players/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete player');
        }
    },

    // Score operations
    async getScores(): Promise<Score[]> {
        const response = await fetch(`${API_URL}/scores`);
        const data = await response.json();
        return data;
    },

    async addScore(score: Score): Promise<void> {
        const response = await fetch(`${API_URL}/scores`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(score)
        });
        if (!response.ok) {
            throw new Error('Failed to add score');
        }
    },

    async deleteAllScores(): Promise<void> {
        // Primero obtenemos todas las puntuaciones
        const scores = await this.getScores();
        
        // Luego eliminamos cada puntuación individualmente
        const deletePromises = scores.map(score => 
            fetch(`${API_URL}/scores/${score.id}`, {
                method: 'DELETE'
            }).then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to delete score ${score.id}`);
                }
                return response;
            })
        );

        // Esperamos a que todas las eliminaciones se completen
        await Promise.all(deletePromises);
    },

    // Game state operations
    async getGameState(): Promise<{ round: number }> {
        const response = await fetch(`${API_URL}/gameState`);
        const data = await response.json();
        return data;
    },

    async updateGameState(state: { round: number }): Promise<void> {
        const response = await fetch(`${API_URL}/gameState`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(state)
        });
        if (!response.ok) {
            throw new Error('Failed to update game state');
        }
    },

    async resetGameState(): Promise<void> {
        const response = await fetch(`${API_URL}/gameState`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ round: 0 })
        });
        if (!response.ok) {
            throw new Error('Failed to reset game state');
        }
    }
};