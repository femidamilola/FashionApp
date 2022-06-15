var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
exports.users = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const user = require("../model/User");
    const role = req.query.role ? req.query.role : "";
    try {
        yield user
            .find(role
            ? {
                role,
            }
            : {})
            .select("-password")
            .then((users) => __awaiter(this, void 0, void 0, function* () {
            return res.status(200).json({
                data: users,
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
//# sourceMappingURL=Users.js.map