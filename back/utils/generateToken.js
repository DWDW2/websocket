import jwt from "jsonwebtoken"

const genderateToken = (userId, res) => {
    const jwt_token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn:'15d'})

    res.cookie('token', jwt_token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite:"strict",
        secure: process.env.NODE_ENV === 'production'
    })
}

export default genderateToken