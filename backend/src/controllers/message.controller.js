import User from "../models/user.model";
import Message from "../models/message.model";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id; // this because of protectRoute

        const filteredUsers = await User.find({_id: {$ne:loggedInUserId}}).select("-password"); // fetches all users except the logged in user and also selects all fields except password

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getUsersForSidebar", error.message);
        res.status(500).json({error:"Internal Server Error (getUsersForSidebar"});
    }
};

export const getMessages = async (req, res) => {
    try {
        const { id:userToChatId } = req.params; // the receiver id (them)
        const myId = req.user._id; // current sender id (us)

        // get messages which are 
        // 1. (sent by us and received by them) and 
        // 2. (sent by them and received by us)
        const messages = await Message.find({
            $or:[
                {senderId: myId, receiverId: userToChatId},
                {senderId: userToChatId, receiverId: myId}
            ]
        });

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages", error.message);
        res.status(500).json({error: "Internal Server Error (getMessages)"});
    }
};