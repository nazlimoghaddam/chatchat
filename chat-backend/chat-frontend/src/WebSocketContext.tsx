import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

const WebSocketContext = createContext<WebSocket | null>(null);

interface WebSocketProviderProps {
    children: ReactNode; 
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:3001'); // Update the WebSocket URL as needed
        setSocket(ws);

        ws.onopen = () => console.log('WebSocket connected');
        ws.onclose = () => console.log('WebSocket disconnected');
        ws.onerror = (error) => console.error('WebSocket error:', error);

        return () => {
            ws.close();
        };
    }, []);

    return (
        <WebSocketContext.Provider value={socket}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => useContext(WebSocketContext);
