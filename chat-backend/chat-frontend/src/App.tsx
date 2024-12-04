import React, { useState } from 'react';
import { useWebSocket } from './WebSocketContext';

const App: React.FC = () => {
    const socket = useWebSocket();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<string[]>([]);

    React.useEffect(() => {
        if (!socket) return;

        socket.onmessage = (event) => {
            setMessages((prev) => [...prev, event.data]);
        };
    }, [socket]);

    const sendMessage = () => {
        if (socket && message) {
            socket.send(message);
            setMessage('');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Real-Time Chat</h1>
            <div style={{ border: '1px solid black', padding: '10px', marginBottom: '10px' }}>
                {messages.map((msg, idx) => (
                    <div key={idx}>{msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default App;
