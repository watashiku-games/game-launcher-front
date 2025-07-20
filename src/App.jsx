import React, { useState, useEffect } from 'react';
import { useWebSocket } from './hooks/useWebSocket';
import { ConnectionManager } from './components/ConnectionManager';
import { WarGameView } from './components/WarGameView';

// L'URL de base de notre future API. En local, on la laisse vide pour utiliser un proxy.
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

function App() {
    const [games, setGames] = useState([]);
    const [selectedGameUrl, setSelectedGameUrl] = useState('');

    const { gameState, connectionStatus, connect, disconnect, sendMessage } = useWebSocket(selectedGameUrl);

    // 1. Au chargement, on récupère la liste des jeux
    useEffect(() => {
        const fetchGames = async () => {
            try {
                if (!API_BASE_URL) {
                    console.warn("L'URL de l'API n'est pas définie. Réponse mockée.");
                    setGames([{id: 1, name: "Jeu de la bataille"}]);
                    return;
                }
                const response = await fetch(`${API_BASE_URL}/api/games`);
                const data = await response.json();
                setGames(data);
            } catch (error) {
                console.error("Impossible de charger la liste des jeux:", error);
            }
        };
        fetchGames();
    }, []);

    // 2. Fonction pour demander le démarrage d'un jeu
    const handleLaunchGame = async (gameId) => {
        try {
            if (!API_BASE_URL) {
                console.warn("L'URL de l'API n'est pas définie. Démarrage du jeu mocké.");
                setSelectedGameUrl("ws://localhost:8080/war-csharp");
                return;
            }
            const response = await fetch(`${API_BASE_URL}/api/games/${gameId}/start`, { method: 'POST' });
            const data = await response.json();
            setSelectedGameUrl(data.webSocketUrl); // On met à jour l'URL pour le hook WebSocket
        } catch (error) {
            console.error("Erreur lors du lancement du jeu:", error);
        }
    };

    // 3. Le hook se connectera automatiquement quand selectedGameUrl changera
    useEffect(() => {
        if (selectedGameUrl) {
            connect();
        }
    }, [selectedGameUrl, connect]);


    const handlePlayCard = () => {
        sendMessage({ action: 'play_card' });
    };

    // Si on est en jeu, on affiche la vue du jeu
    if (connectionStatus === 'connected') {
        return (
            <>
                <ConnectionManager status={connectionStatus} onDisconnect={disconnect} />
                <WarGameView gameState={gameState} onPlayCard={handlePlayCard} />
            </>
        );
    }

    // Sinon, on affiche la liste des jeux à lancer
    return (
        <>
            <header>
                <h1>Lanceur de Jeux</h1>
            </header>
            <main className="game-list">
                <h2>Choisissez un jeu à lancer :</h2>
                {games.map(game => (
                    <div key={game.id}>
                        <span>{game.name}</span>
                        <button onClick={() => handleLaunchGame(game.id)}>Lancer</button>
                    </div>
                ))}
            </main>
        </>
    );
}

export default App;