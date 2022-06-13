let user_mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userSchema = user_mongoose.Schema;
const UserSchema = new user_mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    },
    role: {
        type: String,
        enum: ["Admin", "Basic", "Seller"],
        default: "Basic",
        required: true,
    },
    verified: {
        type: Boolean,
        default: false,
        required: false,
    },
    verification: [
        {
            type: userSchema.Types.ObjectId,
            ref: "verification",
        },
    ],
}, {
    timestamps: true,
});
UserSchema.methods.generateAuthToken = function () {
    const config = require("../config");
    const token = jwt.sign({ _id: this._id, role: this.role }, process.env.JWT_SECRET, { expiresIn: config.tokenLife }
    // { expiresIn: 2000 }
    );
    return token;
};
UserSchema.methods.generateRefreshToken = function () {
    const config = require("../config");
    const token = jwt.sign({ _id: this._id, role: this.role }, process.env.REFRESH_SECRET, { expiresIn: config.refreshTokenLife });
    return token;
};
const User = user_mongoose.model("user", UserSchema);
module.exports = User;
//# sourceMappingURL=User%20copy.js.map