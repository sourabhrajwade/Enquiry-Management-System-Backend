const crypto = require("crypto");

const User = require("./../models/auth");

const sendTokenResponse = (user, statuscode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statuscode).cookie("token", token, options).json({
    success: true,
    token,
    options,
    user,
  });
};

exports.signup = async (req, res, next) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      isVerified: false,
    });

    endTokenResponse(user, 200, res);
  } catch (err) {
    console.log(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password, passwordConfirm } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Provide valid credentials",
      });
    }
    const user = await User.findOne({ email }).select("password");
    const match = await user.correctPassword(password, user.password);
    if (!user || !match) {
      return res.status(400).json({
        message: "Invalid login credentials",
      });
    } else {
      sendTokenResponse(user, 200, res);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
        message: error
    })
  }
};
