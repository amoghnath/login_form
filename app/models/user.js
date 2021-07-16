const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    local: {
        email: String,
        password: String,
    },

    facebook: {
        id: String,
        token: String,
        name: String,
        email: String,
    },

    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String,
    },

    google: {
        id: String,
        token: String,
        email: String,
        name: String,
    }
});

const passSalt = bcrypt.genSaltSync(8);

userSchema.methods.generateHash = function (password){
    return bcrypt.hashSync(password, passSalt, null);
};

userSchema.methods.validPassword = function (password){
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model("User", userSchema);    