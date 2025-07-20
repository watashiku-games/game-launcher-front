import React from 'react';
import './ConnectionManager.css';

export const ConnectionManager = ({ status, onConnect, onDisconnect }) => {
    return (
        <div className="connection-manager">
            <p>Statut : <span className={`status-${status}`}>{status}</span></p>
            {status !== 'connected' ? (
                <button onClick={onConnect} disabled={status === 'connecting'}>
                    Se Connecter
                </button>
            ) : (
                <button onClick={onDisconnect}>Se Déconnecter</button>
            )}
        </div>
    );
};