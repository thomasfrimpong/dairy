const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email: email });

  if (user) {
    return next(new ErrorResponse(`User already exists.`, 400));
  }

  user = new User({
    password,
    email,
    name,
  });
  await user.save();

  sendResponseToken(user, 201, res);
};

const sendResponseToken = (user, statusCode, res) => {
  //Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV == "production") {
    options.secure = true;
  }
  //console.log(options);

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};
