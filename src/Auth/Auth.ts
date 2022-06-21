const user = require("../model/User");
const refresh = require("../model/RefreshToken");
const auth_verify = require("../model/Verification");
const argon2 = require("argon2");
const auth_sendEmail = require("../lib/mail");
const auth_jwt = require("jsonwebtoken");

const cleanEmail = (email: string) => {
  return email.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, "");
};
const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const gen = () => {
  var p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return [...Array(6)].reduce((a) => a + p[~~(Math.random() * p.length)], "");
};

exports.register = async (req, res, next) => {
  const profile = require("../model/Profile");
  const { email, password, fullName } = req.body;
  const cleanedEmail = cleanEmail(email);
  if (!validateEmail(cleanedEmail)) {
    return res
      .status(400)
      .json({ message: "Email is invalid", email: cleanedEmail });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: "Password less than 6 characters" });
  }

  try {
    const token = gen();
    const hashed_password = await argon2.hash(password);
    await user
      .create({
        email: cleanedEmail,
        password: hashed_password,
        fullName,
      })
      .then(
        async (response) =>
          await auth_verify
            .create({
              user: response._id,
              token: token,
              email: response.email,
            })
            .then(async (result) => {
              auth_sendEmail(result.email, token, res);
              await user
                .findByIdAndUpdate(result.user, {
                  $push: {
                    verification: result._id,
                  },
                })
                .then(async (result) => {
                  res.status(200).json({
                    message: "Verification email sent",
                  });
                });
            })
            .catch((err) => {
              throw err;
            })
      );
  } catch (err) {
    if (err.message.startsWith("E11000")) {
      res.status(400).json({
        message: "User not successfully created",
        error: "Email already exists",
        details: err.message,
      });
    } else {
      res.status(400).json({
        message: "User not successfully created",
        error: err.message,
      });
    }
  }
};

exports.verify = async (req, res, next) => {
  const { email, token } = req.body;
  if (!token)
    return res.status(400).json({
      message: "I wonder how, I wonder why, I wonder where they are",
    });
  const cleanedEmail = cleanEmail(email);
  if (!validateEmail(cleanedEmail)) {
    return res
      .status(400)
      .json({ message: "Email is invalid", email: cleanedEmail });
  }
  const verif = await auth_verify.findOne({ token });
  if (!verif)
    return res.status(401).json({
      message: "No user found with that token",
    });
  let date = new Date(verif.createdAt);
  let now = new Date(Date.now());
  if (now.getTime() - date.getTime() > 5 * 60 * 1000)
    return res.status(400).json({
      message: "Token expired",
    });
  if (cleanedEmail !== verif.email) {
    return res.status(400).json({
      message: "Email does not match",
    });
  }

  const vuser = await user.findById(verif.user);
  if (vuser.verified)
    return res.status(400).json({
      message: "Email already verified",
    });
  try {
    await auth_verify
      .findByIdAndUpdate(verif._id, {
        verify: true,
      })
      .then(async (result) => {
        await user
          .findByIdAndUpdate(result.user, {
            verified: true,
          })
          .then(() => {
            return res.status(200).json({
              message: "Verified successfully",
            });
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    res.status(401).json({
      message: "User not successfully verified",
      error: err.message,
    });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const cleanedEmail = cleanEmail(email);
  if (!validateEmail(cleanedEmail)) {
    return res
      .status(400)
      .json({ message: "Email address is invalid", email: cleanedEmail });
  }
  const luser = await user
    .findOne({ email: cleanedEmail })
    .select("-password -verification");
  if (!luser)
    return res.status(401).json({
      message: "Login not successful",
      error: "User not found",
    });

  if (
    !(await argon2.verify((await user.findById(luser._id)).password, password))
  )
    return res.status(401).json({
      message: "Login not successful",
      error: "Password is incorrect",
    });

  if (!luser.verified)
    return res.status(403).json({
      message: "Login not successful",
      error: "Verification incomplete",
    });
  const token = luser.generateAuthToken();
  const refreshToken = luser.generateRefreshToken();
  await refresh
    .create({
      token,
      refreshToken,
      user: luser._id,
    })
    .then(() => {
      return res.status(200).json({
        message: "Login successful",
        user: luser,
        token: token,
        refreshToken: refreshToken,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        message: "Login unsuccessful",
        error: err,
      });
    });
};

exports.resend = async (req, res, nex) => {
  const { old_email, new_email } = req.body;
  if (!(old_email && new_email))
    return res.status(400).json({
      message: "Invalid parameters",
    });
  const cleaned_old_email = cleanEmail(old_email);
  const cleaned_new_email = cleanEmail(new_email);

  if (!(validateEmail(cleaned_new_email) && cleaned_new_email))
    return res.status(400).json({
      message: "Email is invalid",
    });
  const ruser = await user.findOne({ email: cleaned_old_email });
  if (ruser.verified)
    return res.status(401).json({
      message: "User already verified",
    });

  try {
    const token = gen();
    await user
      .findByIdAndUpdate(ruser._id, {
        email: cleaned_new_email,
      })
      .then(async (result) => {
        await auth_verify
          .create({
            user: result._id,
            token: token,
            email: cleaned_new_email,
          })
          .then(async (result) => {
            auth_sendEmail(result.email, token, res);
            await user
              .findByIdAndUpdate(result.user, {
                $push: {
                  verification: result._id,
                },
              })
              .then(async (result) => {
                res.status(200).json({
                  message: "Verification email sent",
                });
              });
          })
          .catch((err) => {
            throw err;
          });
      });
  } catch (err) {
    if (err.message.startsWith("E11000")) {
      res.status(401).json({
        message: "Email not changed successfully",
        error: "Email already exists",
        details: err.message,
      });
    } else {
      res.status(401).json({
        message: "Email not change successfully",
        error: err.message,
      });
    }
  }
};

exports.getToken = async (req, res) => {
  const config = require("../config");
  // refresh the damn token
  try {
    const postData = req.body;
    // if refresh token exists
    if (postData.refreshToken) {
      const refresh_valid = auth_jwt.verify(
        postData.refreshToken,
        process.env.REFRESH_SECRET
      );
      if (!refresh_valid) throw "Refresh token Invalid";
      const dtoken = await refresh
        .findOne({
          refreshToken: postData.refreshToken,
        })
        .populate("user");
      if (dtoken) {
        const user = { _id: dtoken.user._id, role: dtoken.user.role };
        const token = auth_jwt.sign(user, process.env.JWT_SECRET, {
          expiresIn: config.tokenLife,
        });
        const response = {
          token: token,
          user: user,
        };
        // update the token in the list
        await refresh.findByIdAndUpdate(dtoken._id, {
          token: token,
        });
        res.status(200).json(response);
      } else {
        res
          .status(404)
          .json({ message: "Refresh Token not found in database" });
      }
    } else {
      res.status(401).json({ message: "Invalid request" });
    }
  } catch (error) {
    return res.status(403).json({
      message: "Could not get token",
      error: error,
    });
  }
};

exports.me = async (req, res, nex) => {
  res.status(200).json({
    message: "Hi there",
    user: req.user,
  });
};
