import User from "../models/user.model";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id; // this because of protectRoute

        const filteredUsers = await User.find({_id: {$ne:loggedInUserId}}).select("-password"); // fetches all users except the logged in user and also selects all fields except password

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getUsersForSidebar", error.message);
        res.status(500).json({message:"Internal Server Error (getUsersForSidebar"});
    }
};