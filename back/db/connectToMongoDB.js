import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try{
       await  mongoose.connect(process.env.MONGO_DB_URI)
       console.log('connected to mongodb')
    }catch(err){
        console.log('problems with connecting to mongodb',err)
    }
}

export default connectToMongoDB