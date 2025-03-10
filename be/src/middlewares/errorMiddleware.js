const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Xử lý lỗi trong môi trường development
  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  } 
  // Xử lý lỗi trong môi trường production
  else {
    // Lỗi hoạt động
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    } 
    // Lỗi lập trình hoặc lỗi không xác định
    else {
      console.error('ERROR 💥', err);
      res.status(500).json({
        status: 'error',
        message: 'Đã có lỗi xảy ra!'
      });
    }
  }
};

module.exports = errorHandler; 