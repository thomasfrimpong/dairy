const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

exports.registerUser = async (req, res, next) => {
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

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!password || !email) {
    return next(new ErrorResponse(`All Fields are required.`, 400));
  }

  let user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse(`Invalid Credentials.`, 401));
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse(`Invalid Credentials.`, 401));
  }

  sendResponseToken(user, 200, res);
};

exports.logoutUser = async (req, res) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ success: true, data: {} });
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
