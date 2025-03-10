const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const uploadMiddleware = require('../middlewares/uploadMiddleware');

const router = express.Router();

// Protect all routes
router.use(authMiddleware.protect);

// Profile routes
router.get('/profile', userController.getProfile);
router.patch('/update-profile', userController.updateProfile);

// Avatar routes
router.post(
  '/upload-avatar',
  uploadMiddleware.single('avatar'),
  userController.uploadAvatar
);

// Photo album routes
router.get('/photo-album', userController.getPhotoAlbum);
router.post(
  '/photo-album',
  uploadMiddleware.single('photo'),
  userController.addToPhotoAlbum
);
router.delete('/photo-album/:photoId', userController.removeFromPhotoAlbum);

module.exports = router; 