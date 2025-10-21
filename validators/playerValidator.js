const { body } = require('express-validator');

exports.validatePlayer = [
  body('name').notEmpty().withMessage('Name is required'),
  body('age').isInt({ min: 1 }).withMessage('Age must be a number'),
  body('overall').isInt({ min: 0, max: 100 }).withMessage('Overall must be between 0 and 100'),
];
