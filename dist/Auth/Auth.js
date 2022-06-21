var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const user = require("../model/User");
const refresh = require("../model/RefreshToken");
const auth_verify = require("../model/Verification");
const argon2 = require("argon2");
const auth_sendEmail = require("../lib/mail");
const auth_jwt = require("jsonwebtoken");
const cleanEmail = (email) => {
    return email.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, "");
};
const validateEmail = (email) => {
    return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};
const gen = () => {
    var p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return [...Array(6)].reduce((a) => a + p[~~(Math.random() * p.length)], "");
};
exports.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
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
        const hashed_password = yield argon2.hash(password);
        yield user
            .create({
            email: cleanedEmail,
            password: hashed_password,
            fullName,
        })
            .then((response) => __awaiter(this, void 0, void 0, function* () {
            return yield auth_verify
                .create({
                user: response._id,
                token: token,
                email: response.email,
            })
                .then((result) => __awaiter(this, void 0, void 0, function* () {
                auth_sendEmail(result.email, token, res);
                yield user
                    .findByIdAndUpdate(result.user, {
                    $push: {
                        verification: result._id,
                    },
                })
                    .then((result) => __awaiter(this, void 0, void 0, function* () {
                    res.status(200).json({
                        message: "Verification email sent",
                    });
                }));
            }))
                .catch((err) => {
                throw err;
            });
        }));
    }
    catch (err) {
        if (err.message.startsWith("E11000")) {
            res.status(400).json({
                message: "User not successfully created",
                error: "Email already exists",
                details: err.message,
            });
        }
        else {
            res.status(400).json({
                message: "User not successfully created",
                error: err.message,
            });
        }
    }
});
exports.verify = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
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
    const verif = yield auth_verify.findOne({ token });
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
    const vuser = yield user.findById(verif.user);
    if (vuser.verified)
        return res.status(400).json({
            message: "Email already verified",
        });
    try {
        yield auth_verify
            .findByIdAndUpdate(verif._id, {
            verify: true,
        })
            .then((result) => __awaiter(this, void 0, void 0, function* () {
            yield user
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
        }))
            .catch((err) => {
            throw err;
        });
    }
    catch (err) {
        res.status(401).json({
            message: "User not successfully verified",
            error: err.message,
        });
    }
});
exports.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const { email, password } = req.body;
    const cleanedEmail = cleanEmail(email);
    if (!validateEmail(cleanedEmail)) {
        return res
            .status(400)
            .json({ message: "Email address is invalid", email: cleanedEmail });
    }
    const luser = yield user
        .findOne({ email: cleanedEmail })
        .select("-password -verification");
    if (!luser)
        return res.status(401).json({
            message: "Login not successful",
            error: "User not found",
        });
    if (!(yield argon2.verify((yield user.findById(luser._id)).password, password)))
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
    yield refresh
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
});
exports.resend = (req, res, nex) => __awaiter(this, void 0, void 0, function* () {
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
    const ruser = yield user.findOne({ email: cleaned_old_email });
    if (ruser.verified)
        return res.status(401).json({
            message: "User already verified",
        });
    try {
        const token = gen();
        yield user
            .findByIdAndUpdate(ruser._id, {
            email: cleaned_new_email,
        })
            .then((result) => __awaiter(this, void 0, void 0, function* () {
            yield auth_verify
                .create({
                user: result._id,
                token: token,
                email: cleaned_new_email,
            })
                .then((result) => __awaiter(this, void 0, void 0, function* () {
                auth_sendEmail(result.email, token, res);
                yield user
                    .findByIdAndUpdate(result.user, {
                    $push: {
                        verification: result._id,
                    },
                })
                    .then((result) => __awaiter(this, void 0, void 0, function* () {
                    res.status(200).json({
                        message: "Verification email sent",
                    });
                }));
            }))
                .catch((err) => {
                throw err;
            });
        }));
    }
    catch (err) {
        if (err.message.startsWith("E11000")) {
            res.status(401).json({
                message: "Email not changed successfully",
                error: "Email already exists",
                details: err.message,
            });
        }
        else {
            res.status(401).json({
                message: "Email not change successfully",
                error: err.message,
            });
        }
    }
});
exports.getToken = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const config = require("../config");
    // refresh the damn token
    try {
        const postData = req.body;
        // if refresh token exists
        if (postData.refreshToken) {
            const refresh_valid = auth_jwt.verify(postData.refreshToken, process.env.REFRESH_SECRET);
            if (!refresh_valid)
                throw "Refresh token Invalid";
            const dtoken = yield refresh
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
                yield refresh.findByIdAndUpdate(dtoken._id, {
                    token: token,
                });
                res.status(200).json(response);
            }
            else {
                res
                    .status(404)
                    .json({ message: "Refresh Token not found in database" });
            }
        }
        else {
            res.status(401).json({ message: "Invalid request" });
        }
    }
    catch (error) {
        return res.status(403).json({
            message: "Could not get token",
            error: error,
        });
    }
});
exports.me = (req, res, nex) => __awaiter(this, void 0, void 0, function* () {
    res.status(200).json({
        message: "Hi there",
        user: req.user,
    });
});
//# sourceMappingURL=Auth.js.map