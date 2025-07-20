import React from 'react';
import './Card.css';

const SUIT_SYMBOLS = {
    hearts: '♥',
    diamonds: '♦',
    clubs: '♣',
    spades: '♠',
};

export const Card = ({ card }) => {
    if (!card) {
        return <div className="card card-back"></div>;
    }

    const colorClass = (card.suit === 'hearts' || card.suit === 'diamonds') ? 'red' : 'black';

    return (
        <div className={`card ${colorClass}`}>
            <div className="card-value top">{card.value}</div>
            <div className="card-suit">{SUIT_SYMBOLS[card.suit]}</div>
            <div className="card-value bottom">{card.value}</div>
        </div>
    );
};