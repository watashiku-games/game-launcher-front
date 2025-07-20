import { useState, useRef, useCallback, useEffect } from 'react';

export const useWebSocket = (url) => {
    const [gameState, setGameState] = useState(null);
    const [connectionStatus, setConnectionStatus] = useState('disconnected');
    const socketRef = useRef(null);

    const connect = useCallback(() => {
        if (socketRef.current) return;

        setConnectionStatus('connecting');
        socketRef.current = new WebSocket(url);

        socketRef.current.onopen = () => setConnectionStatus('connected');
        socketRef.current.onclose = () => {
            setConnectionStatus('disconnected');
            socketRef.current = null;
        };
        socketRef.current.onerror = () => {
            setConnectionStatus('error');
            socketRef.current = null;
        };
        socketRef.current.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                setGameState(message);
            } catch (error) {
                console.error("Failed to parse message:", error);
            }
        };
    }, [url]);

    const disconnect = useCallback(() => {
        socketRef.current?.close();
    }, []);

    const sendMessage = useCallback((message) => {
        socketRef.current?.send(JSON.stringify(message));
    }, []);
    
    // Auto-disconnect on component unmount
    useEffect(() => {
        return () => socketRef.current?.close();
    }, []);

    return { gameState, connectionStatus, connect, disconnect, sendMessage };
};