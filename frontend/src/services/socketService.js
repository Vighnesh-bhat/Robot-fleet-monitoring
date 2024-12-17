// import io from 'socket.io-client';

// const SOCKET_URL = 'http://localhost:5000';

// export const initializeSocket = () => {
//   const socket = io(SOCKET_URL);

//   socket.on('connect', () => {
//     console.log('Connected to WebSocket');
//   });

//   return socket;
// };

import io from 'socket.io-client';

export const initializeSocket = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
  return io(backendUrl);
};