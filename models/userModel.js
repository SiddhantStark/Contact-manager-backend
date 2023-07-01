const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the user name!"]
    },
    email: {
        type: String,
        required: [true, "Please add the email id!"],
        unique: [true, "Email address already taken!"]
    },
    password: {
        type: String,
        required: [true, "Please add the password!"]
    }
},{
    timeStamps: true,
}
);

module.exports = mongoose.model("User", userSchema);