const User = require('../models/User');
const cloudinary = require('../config/cloudinary');

exports.getOnlineUsers = async (req, res) => {
  try {
    const users = await User.find({ isOnline: true })
      .select('fullName email isOnline lastActive');

    res.status(200).json({
      status: 'success',
      data: { users }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const allowedFields = [
      'fullName',
      'dateOfBirth',
      'gender',
      'description'
    ];

    const updateData = {};
    Object.keys(req.body).forEach(key => {
      if (allowedFields.includes(key)) {
        updateData[key] = req.body[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({
      status: 'success',
      data: { user }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'Vui lòng upload ảnh'
      });
    }

    // Xóa ảnh cũ trên cloudinary nếu có
    const currentUser = await User.findById(req.user._id);
    if (currentUser.avatar?.publicId) {
      await cloudinary.uploader.destroy(currentUser.avatar.publicId);
    }

    // Upload ảnh mới
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'avatars'
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        avatar: {
          url: result.secure_url,
          publicId: result.public_id
        }
      },
      { new: true }
    ).select('-password');

    res.status(200).json({
      status: 'success',
      data: { user }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.addToPhotoAlbum = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'Vui lòng upload ảnh'
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'albums'
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: {
          photoAlbum: {
            url: result.secure_url,
            publicId: result.public_id,
            caption: req.body.caption || ''
          }
        }
      },
      { new: true }
    ).select('-password');

    res.status(200).json({
      status: 'success',
      data: { user }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.removeFromPhotoAlbum = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const photo = user.photoAlbum.id(req.params.photoId);

    if (!photo) {
      return res.status(404).json({
        status: 'error',
        message: 'Không tìm thấy ảnh'
      });
    }

    // Xóa ảnh từ cloudinary
    await cloudinary.uploader.destroy(photo.publicId);

    // Xóa ảnh khỏi album
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: {
          photoAlbum: { _id: req.params.photoId }
        }
      }
    );

    res.status(200).json({
      status: 'success',
      message: 'Đã xóa ảnh thành công'
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    res.status(200).json({
      status: 'success',
      data: { user }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.getPhotoAlbum = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('photoAlbum')
      .sort({ 'photoAlbum.uploadedAt': -1 });

    res.status(200).json({
      status: 'success',
      data: { photos: user.photoAlbum }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.getTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ userType: 'teacher' });
    res.status(200).json({
      status: 'success',
      data: { teachers }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const students = await User.find({ userType: 'student' });
    res.status(200).json({
      status: 'success',
      data: { students }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.status(200).json({
      status: 'success',
      data: { users }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
}; 