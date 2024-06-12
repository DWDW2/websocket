import User from '../models/user.models.js'
export const getUsersForSideBar = async (req, res) => {
    try{
        console.log('getUsersForSideBar called')
        const loggedInUserId = req.user._id

        const allUsers = await User.find({_id: {$ne: loggedInUserId}}).select('-password')

        return res.json(allUsers)
    }catch(err){
        console.log('error in getUserForSideBar',err)
        res.status(500).json({message:err.message})
    }
}