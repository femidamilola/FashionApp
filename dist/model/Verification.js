let verify_mongoose = require("mongoose");
const verify_schema = verify_mongoose.Schema;
const VerifySchema = new verify_mongoose.Schema({
    email: {
        type: String,
        unique: false,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    verify: {
        type: Boolean,
        default: false,
        required: false,
    },
    user: {
        type: verify_schema.Types.ObjectId,
        ref: "user",
    },
}, { timestamps: true });
const Verification = verify_mongoose.model("verification", VerifySchema);
module.exports = Verification;
//# sourceMappingURL=Verification.js.map