const handleError = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  console.log('hata oldu');

  res.status(statusCode);
  res.json({
    message: err.message,
    desc: err.stack,
  });
};

module.exports = handleError;
