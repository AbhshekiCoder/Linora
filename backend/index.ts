import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import MongoDBConnected from './config/MongoDBConnected';



const app = express();
app.use(cors());
app.use(express.json());
dotenv.config()


MongoDBConnected()
app.listen(process.env.PORT||3000, () =>{
    console.log(`Server is running on port ${process.env.PORT}`)
})