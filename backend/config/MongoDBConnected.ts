import mongoose from 'mongoose'
const MongoDBConnected = async () =>{
    mongoose.connect(process.env.MONGODB_URL as string)
     .then(() =>{
        console.log("database connected")

    }).catch((err) =>{
        console.log(err.message)
    })
}

export default MongoDBConnected;