var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
exports.profile = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const profile = require("../model/Profile");
    if (!req.query.user)
        return res.status(400).json({
            message: "No user ID provided",
        });
    const user = req.query.user;
    try {
        yield profile
            .findOne({ user })
            .then((profile) => __awaiter(this, void 0, void 0, function* () {
            return res.status(200).json({
                profile,
            });
        }))
            .catch((err) => {
            throw err;
        });
    }
    catch (err) {
        res.status(400).json({
            message: "An error occurred",
            error: err.message,
        });
    }
});
exports.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const profile = require("../model/Profile");
    const { user, fullName, phone } = req.body;
    const existing = yield profile.findOne({ user });
    if (existing)
        return res.status(400).json({
            message: "Profile already exists for this user",
        });
    try {
        yield profile
            .create({
            user,
            fullName,
            phone,
        })
            .then((data) => {
            res.status(200).json({
                message: "Profile created successfully",
                data,
            });
        })
            .catch((err) => {
            throw err;
        });
    }
    catch (error) {
        res.status(400).json({
            message: "An error occurred",
            error: error,
        });
    }
});
//# sourceMappingURL=Profile.js.map