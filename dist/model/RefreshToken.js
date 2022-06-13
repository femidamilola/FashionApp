let refresh_mongoose = require("mongoose");
const refreshSchema = refresh_mongoose.Schema;
const RefreshSchema = new refresh_mongoose.Schema({
    token: {
        type: String,
        unique: true,
        required: true,
    },
    refreshToken: {
        type: String,
        unique: true,
        required: true,
    },
    user: {
        type: refreshSchema.Types.ObjectId,
        ref: "user",
    },
}, {
    timestamps: true,
});
const RefreshToken = refresh_mongoose.model("refresh_token", RefreshSchema);
module.exports = RefreshToken;
//# sourceMappingURL=RefreshToken.js.map