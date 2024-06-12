import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/messages.routes.js'
import connectToMongoDB from './db/connectToMongoDB.js'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import userRoutes from './routes/user.routes.js'
const app = express()
dotenv.config()
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.json())

app.use('/api/messages', messageRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)


app.listen(3000, () => {
    connectToMongoDB()
    console.log('Example app listening on port 3000!')
})