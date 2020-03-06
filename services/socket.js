import io from 'socket.io-client';

class Socket {
  constructor() {
    this.socket = null;
  }

  createConnection(wsUrl) {
    this.socket = io(wsUrl, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: Infinity,
    });
  }

  getSocket() {
    return this.socket;
  }
}

const socketConnection = new Socket();
export default socketConnection;
