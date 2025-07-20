import React from 'react';
import { Card } from './Card';
import './WarGameView.css';

export const WarGameView = ({ gameState, onPlayCard }) => {
    if (!gameState) {
        return <p>En attente des informations du serveur...</p>;
    }

    const { players, battleZone, status, canPlay } = gameState;

    const player1Card = battleZone.find(c => c.player === 'player1')?.card;
    const player2Card = battleZone.find(c => c.player === 'player2')?.card;

    return (
        <div className="war-game-view">
            <div className="players-info">
                <span>{players[0].name}: {players[0].cardCount} cartes</span>
                <span>{players[1].name}: {players[1].cardCount} cartes</span>
            </div>

            <div className="game-board">
                <div className="player-deck">
                    <Card card={null} />
                </div>
                <div className="battle-zone">
                    <Card card={player1Card} />
                    <Card card={player2Card} />
                </div>
                 <div className="player-deck">
                    <Card card={null} />
                </div>
            </div>

            <div className="game-controls">
                <p className="status">Statut : {status}</p>
                <button onClick={onPlayCard} disabled={!canPlay}>
                    Jouer une carte
                </button>
            </div>
        </div>
    );
};