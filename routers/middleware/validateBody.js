const validateBody = (req, res, next) => {
  if (!req.body.name) return res.status(400).json({
    message: 'Missing required name field',
  });
};

module.exports = validateBody;