const Joi = require("joi");

const userSchema = Joi.object({
  firstname: Joi.string().min(3).max(20),
  lastname: Joi.string().min(3).max(20),
  // profileImage: Joi.string().required(),
  username: Joi.string().min(3).max(30),
  email: Joi.string().email({ tlds: { allow: false } }),
  // phone: Joi.number().required(),
  // address: Joi.object({
  //     fisrt_line: Joi.string().min(5).max(50).required(),
  //     second_line: Joi.string().allow('').optional(),
  //     city: Joi.string().min(3).max(30).required(),
  //     pincode: Joi.number().required(),
  //     country: Joi.string().min(3).max(30).required(),
  // }).required(),
  password: Joi.string().min(3).max(40).required(),
});

module.exports.validateUser = (req, res, next) => {
  const { values, password } = req.body;
  const { error } = userSchema.validate({ ...values, password });
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    console.log(msg);
    res.status(400).send(msg);
  } else {
    next();
  }
};
