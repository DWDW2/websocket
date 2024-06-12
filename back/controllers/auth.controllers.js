import User from "../models/user.models.js"
import genderateToken from "../utils/generateToken.js"
import bcrypt from "bcrypt"

const loginUser = async (req, res) => {
    try{
        console.log(req.body)
        const {username, password} = req.body
        const user = await User.findOne({username})
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")
        if(!isPasswordCorrect && !user){
            res.status(400).json({
                error: 'invalid password or username'
            })
        }

        genderateToken(user._id, res)

        res.status(200).json(
            {
                _id: user._id,
                fullname: user.fullname,
                username: user.username,
                gender: user.gender,
                profilePicture: user.profilePicture
            }
        )
    }catch(err){
        console.log(err)
    }
}

const logoutUser = async (req, res) => {
    try{
        res.cookie('jwt', '', {maxAge: 0})
        res.status(200).json({
            message: 'logged out'
        })
    }catch(err){
        console.log(err)
    }
}

const signupUser = async (req, res) => {
    console.log('signup')
    try{
        console.log(req.body)
        const {fullname, username, password, confirmPassword, gender} = req.body
        if(password !== confirmPassword){
            return res.status(400).json({
                message: 'passwords do not match'
            })
        }

        const user = await User.findOne({username})
        if(user){
            return res.status(400).json({
                message: 'user already exists'
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`
        const newUser = new User({
            username,
            fullname,
            password:hashedPassword,
            gender,
            profilePicture: gender ==='male'? boyProfilePic : girlProfilePic
        })

        if(newUser){
            genderateToken(newUser._id, res)
            await newUser.save()
            res.json(
                {
                    _id: newUser._id,
                    fullname: newUser.fullname,
                    username: newUser.username,
                    gender: newUser.gender,
                    profilePicture: newUser.profilePicture,
                    message: 'user created successfully'
                }
            )
        }
        
    }catch(err){
        console.log('error creating user')
        console.log(err)
    }
}

export {
    loginUser,
    logoutUser,
    signupUser
}