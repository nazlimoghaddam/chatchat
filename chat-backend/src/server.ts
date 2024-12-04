import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import cors from 'cors';

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

app.use(cors());
app.use(express.json());

const PORT = 3001;

const clients: Set<any> = new Set();

wss.on('connection', (ws) => {
    clients.add(ws);
    console.log('New client connected.');

    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        for (const client of clients) {
            if (client !== ws && client.readyState === client.OPEN) {
                client.send(message);
            }
        }
    });

    ws.on('close', () => {
        clients.delete(ws);
        console.log('Client disconnected.');
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
