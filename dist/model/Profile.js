let profile_mongoose = require("mongoose");
const profileSchema = profile_mongoose.Schema;
const ProfileSchema = new profile_mongoose.Schema({
    user: {
        type: profileSchema.Types.ObjectId,
        ref: "user",
        unique: true,
        required: true,
    },
    name: {
        first: String,
        last: String,
    },
    phone: {
        type: String,
    },
}, {
    timestamps: true,
});
ProfileSchema.virtual("fullName")
    .get(function () {
    return this.name.first + " " + this.name.last;
})
    .set(function (v) {
    this.name.first = v.substr(0, v.indexOf(" "));
    this.name.last = v.substr(v.indexOf(" ") + 1);
});
const Profile = profile_mongoose.model("profile", ProfileSchema);
module.exports = Profile;
//# sourceMappingURL=Profile.js.map