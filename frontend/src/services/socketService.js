import io from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

export const initializeSocket = () => {
  const socket = io(SOCKET_URL);

  socket.on('connect', () => {
    console.log('Connected to WebSocket');
  });

  return socket;
};