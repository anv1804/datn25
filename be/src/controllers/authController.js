const User = require('../models/User');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

exports.register = async (req, res) => {
  try {
    const { fullName, email, password, role, userType } = req.body;

    // Kiểm tra email tồn tại
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'Email đã được sử dụng'
      });
    }

    // Tạo user mới
    const user = await User.create({
      fullName,
      email,
      password,
      role: role || 'user',
      userType
    });

    // Tạo token
    const token = signToken(user._id);

    // Loại bỏ password từ output
    user.password = undefined;

    res.status(201).json({
      status: 'success',
      token,
      data: { user }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide email and password'
      });
    }

    // Find user and validate password
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        status: 'error',
        message: 'Incorrect email or password'
      });
    }

    // Generate token
    const token = signToken(user._id);

    // Exclude password from response
    user.password = undefined;

    // Cập nhật trạng thái online
    await User.findByIdAndUpdate(user._id, {
      isOnline: true,
      lastActive: new Date()
    });

    res.status(200).json({
      status: 'success',
      token,
      data: { user }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.logout = async (req, res) => {
  try {
    // Cập nhật trạng thái offline
    await User.findByIdAndUpdate(req.user._id, {
      isOnline: false,
      lastActive: new Date()
    });

    res.status(200).json({
      status: 'success',
      message: 'Đăng xuất thành công'
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
}; 