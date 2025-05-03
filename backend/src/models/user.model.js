import mongoose from "mongoose";

// create a User model. now that model requires userSchema which holds the schema for the db

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type:String,
            required:true,
        },
        email: {
            type:String,
            required:true,
            unique:true,
        },
        password: {
            type:String,
            required: true,
            minlength: 6
        },
        profilePic: {
            type:String,
            default:"",
        },
    },
    { timestamps: true }
);

// mongoose wants us to send the .model(x, y) x in model as singular
const User = mongoose.model("User", userSchema);

export default User;