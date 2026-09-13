const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false }); // collect ALL errors
  if (error)
    return res.status(400).json({
      errors: error.details.map((d) => ({
        field: d.path[0],
        message: d.message,
      })),
    });
  req.body = value; // hand the route the cleaned, sanitised data
  next();
};
module.exports = validate;
