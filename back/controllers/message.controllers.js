import Conservation from "../models/conservaton.models.js"
import Message from "../models/message.models.js"

const sendMessage = async (req, res) => {
    try{
        console.log(req.body)
        console.log(req.user)
        const { message }  = req.body 
        const {id: receiverId} = req.params
        const senderId = req.user._id 
        console.log(senderId)
        console.log(receiverId)
        console.log(message)

        let conservation = await Conservation.findOne({
            participants: { $all: [senderId, receiverId] },
        })
        console.log(conservation)
        if(conservation === null){
            const conservation = await Conservation.create({
                participants: [senderId, receiverId],
            })
        }
        console.log(conservation)
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })
        console.log(newMessage)
        if (newMessage) {
			conservation.messages.push(newMessage._id)
		}
        //Socket oi functionality

        // await conservation.save()
        // await newMessage.save()

        await Promise.all([conservation.save(), newMessage.save()])
        res.status(200).json(newMessage)
    }catch(err){
        res.status(500).json({error: "failed to send message"})
        console.log(err)
    }
}


const getMessages = async (req, res) => {
    try{
        const {id: userToChatId} = req.params

        const senderId = req.user._id
        const conservation = await Conservation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate('messages')
        if(conservation === null){
            return res.status(200).json([])
        }
        res.status(200).json(conservation.messages)
    }catch(err){
        console.log(err)
        res.status(500).json({error: "failed to get messages"})
    }
}

export  {sendMessage, getMessages}