import type Player from '@/models/Player';
import type Score from '@/models/Score';

const API_URL = process.env.DB_SERVER || import.meta.env.VITE_API_URL || 'http://localhost:3000';
const TIMEOUT_MS = 5000; // 5 segundos de timeout
const MAX_RETRIES = 3;   // Número máximo de reintentos
const RETRY_DELAY = 1000; // 1 segundo entre reintentos
// Para debugging - ver qué URL se está usando
console.log('API_URL:', API_URL);
console.log('VITE_API_URL env:', import.meta.env.VITE_API_URL);
console.log('DB_SERVER env:', process.env.DB_SERVER);
// Función para hacer fetch con timeout
const fetchWithTimeout = async (url: string, options: RequestInit = {}): Promise<Response> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
};

// Función para hacer fetch con reintentos
const fetchWithRetry = async (url: string, options: RequestInit = {}): Promise<Response> => {
    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
        try {
            const response = await fetchWithTimeout(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response;
        } catch (error) {
            lastError = error as Error;
            if (error instanceof Error && error.name === 'AbortError') {
                console.warn(`Request timeout on attempt ${attempt + 1}`);
            } else {
                console.warn(`Request failed on attempt ${attempt + 1}:`, error);
            }
            if (attempt < MAX_RETRIES - 1) {
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
            }
        }
    }
    
    throw lastError || new Error('Request failed after max retries');
};

// Cache para almacenar las respuestas temporalmente
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 60000; // 1 minuto

export const StorageService = {
    // Player operations
    async getPlayers(): Promise<Player[]> {
        const cacheKey = 'players';
        const cached = cache.get(cacheKey);
        
        // Si hay datos en caché y no han expirado, usarlos
        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
            return cached.data;
        }

        const response = await fetchWithRetry(`${API_URL}/players`);
        const data = await response.json();
        
        // Guardar en caché
        cache.set(cacheKey, {
            data,
            timestamp: Date.now()
        });

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