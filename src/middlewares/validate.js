const Joi = require('joi');

/**
 * Middleware de validación genérico para body, params y query.
 * @param {object} schemas - { body, params, query }
 */
module.exports = (schemas) => (req, res, next) => {
  const toValidate = ['body', 'params', 'query'];
  for (const key of toValidate) {
    if (schemas[key]) {
      const { error } = schemas[key].validate(req[key]);
      if (error) {
        return res
          .status(400)
          .json({ error: error.details.map((d) => d.message).join(', ') });
      }
    }
  }
  next();
};
