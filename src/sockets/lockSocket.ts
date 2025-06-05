import { Server } from 'socket.io';

interface LockMap {
  [contactId: string]: string;
}

const lockMap: LockMap = {};
const userLocks: { [socketId: string]: string[] } = {};

export const setupSocket = (io: Server) => {
  io.on('connection', (socket) => {
    console.log('🔌 A user connected:', socket.id);

    socket.on('lock_contact', ({ contactId, username }) => {
      if (!lockMap[contactId]) {
        lockMap[contactId] = username;

        if (!userLocks[socket.id]) userLocks[socket.id] = [];
        userLocks[socket.id].push(contactId);

        io.emit('contact_locked', { contactId, username });
        console.log(`Contact ${contactId} locked by ${username}`);
      } else {
        socket.emit('contact_locked_error', {
          contactId,
          message: 'Contact is already being edited by another user.',
        });
      }
    });

    socket.on('unlock_contact', ({ contactId, username }) => {
      if (lockMap[contactId] === username) {
        delete lockMap[contactId];

        if (userLocks[socket.id]) {
          userLocks[socket.id] = userLocks[socket.id].filter(id => id !== contactId);
        }

        io.emit('contact_unlocked', { contactId });
        console.log(`Contact ${contactId} unlocked by ${username}`);
      }
    });

    socket.on('disconnect', () => {
      console.log('❌ A user disconnected:', socket.id);

      if (userLocks[socket.id]) {
        userLocks[socket.id].forEach(contactId => {
          delete lockMap[contactId];
          io.emit('contact_unlocked', { contactId });
          console.log(`Contact ${contactId} unlocked due to disconnect`);
        });
        delete userLocks[socket.id];
      }
    });
  });
};
