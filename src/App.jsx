import React from 'react';
import { useWebSocket } from './hooks/useWebSocket';
import { ConnectionManager } from './components/ConnectionManager';
import { WarGameView } from './components/WarGameView';

function App() {
    const { gameState, connectionStatus, connect, disconnect, sendMessage } = useWebSocket('ws://localhost:8080');

    const handlePlayCard = () => {
        sendMessage({ action: 'play_card' });
    };

    return (
        <>
            <header>
                <h1>Bataille en React</h1>
            </header>
            <main>
                <ConnectionManager
                    status={connectionStatus}
                    onConnect={connect}
                    onDisconnect={disconnect}
                />
                
                {connectionStatus === 'connected' && (
                    <WarGameView gameState={gameState} onPlayCard={handlePlayCard} />
                )}
            </main>
        </>
    );
}

export default App;