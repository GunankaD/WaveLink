import mongoose from 'mongoose'

// create a message model
// message model requires a messageSchema

const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "User", // like foreign key, reference to User model
            required:true,
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        text: {
            type:String,
        },
        image: {
            type:String,
        },
    },
    {timestamps:true}
);

const Message = mongoose.model("Message", messageSchema);

export default Message;