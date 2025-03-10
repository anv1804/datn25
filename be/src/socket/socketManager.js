const User = require('../models/User');

let io;
const userSockets = new Map(); // Lưu trữ socket.id của mỗi user

exports.init = (httpServer) => {
  io = require('socket.io')(httpServer, {
    cors: {
      origin: "http://localhost:3000", // Frontend URL
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('New client connected');

    // Xử lý khi user đăng nhập
    socket.on('user_connected', async (userId) => {
      try {
        // Lưu socket.id cho user
        userSockets.set(userId, socket.id);
        
        // Cập nhật trạng thái online
        await User.findByIdAndUpdate(userId, {
          isOnline: true,
          lastActive: new Date()
        });

        // Thông báo cho tất cả clients khác
        io.emit('user_status_changed', {
          userId,
          isOnline: true
        });
      } catch (error) {
        console.error('Socket error:', error);
      }
    });

    // Xử lý disconnect
    socket.on('disconnect', async () => {
      try {
        // Tìm userId từ socket.id
        const userId = [...userSockets.entries()]
          .find(([_, socketId]) => socketId === socket.id)?.[0];

        if (userId) {
          // Xóa socket mapping
          userSockets.delete(userId);

          // Cập nhật trạng thái offline
          await User.findByIdAndUpdate(userId, {
            isOnline: false,
            lastActive: new Date()
          });

          // Thông báo cho tất cả clients
          io.emit('user_status_changed', {
            userId,
            isOnline: false
          });
        }
      } catch (error) {
        console.error('Socket disconnect error:', error);
      }
    });
  });

  return io;
};

// Hàm tiện ích để gửi thông báo
exports.notifyUser = (userId, event, data) => {
  const socketId = userSockets.get(userId);
  if (socketId) {
    io.to(socketId).emit(event, data);
  }
}; 