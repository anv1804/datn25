const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Vui lòng nhập họ tên'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Vui lòng nhập email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Email không hợp lệ']
  },
  password: {
    type: String,
    required: [true, 'Vui lòng nhập mật khẩu'],
    minlength: [6, 'Mật khẩu phải có ít nhất 6 ký tự'],
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'collaborator'],
    default: 'user'
  },
  dateOfBirth: {
    type: Date,
    validate: {
      validator: function(value) {
        return value <= new Date();
      },
      message: 'Ngày sinh không hợp lệ'
    }
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    default: 'other'
  },
  avatar: {
    url: String,
    publicId: String
  },
  description: {
    type: String,
    maxLength: [500, 'Mô tả không được vượt quá 500 ký tự']
  },
  photoAlbum: [{
    url: String,
    publicId: String,
    caption: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  isOnline: {
    type: Boolean,
    default: false
  },
  lastActive: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Mã hóa mật khẩu trước khi lưu
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Phương thức kiểm tra mật khẩu
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Thêm method mới để xử lý ảnh
userSchema.methods.addToPhotoAlbum = function(photo) {
  this.photoAlbum.push(photo);
  return this.save();
};

userSchema.methods.removeFromPhotoAlbum = function(photoId) {
  this.photoAlbum = this.photoAlbum.filter(
    photo => photo._id.toString() !== photoId
  );
  return this.save();
};

const User = mongoose.model('User', userSchema);

module.exports = User; 