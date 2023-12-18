import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    username: {
        type: String,
        require:[true, "Must provide a username"],
        unique: [true, "Must be unique"]
    },
    email: {
        type: String,
        require:[true, "Must provide a email"],
        unique: [true, "Must be unique"]
    },
    password: {
        type: String,
        require:[true, "Must provide a passowrd"],
    },
}, {timestamps: true})

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User