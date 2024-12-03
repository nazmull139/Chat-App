import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/AuthRoutes.js";
import channelRoutes from "./routes/ChannelRoutes.js";
import contactRoutes from "./routes/ContactsRoutes.js";
import messagesRoutes from "./routes/MessagesRoutes.js";
import setupSocket from "./socket.js";

dotenv.config();

const app = express();

const port  = process.env.PORT || 3001;


//const databaseURL = process.env.DATABASE_URL;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));


app.use("/uploads/profiles", express.static("uploads/profiles"));
app.use("/uploads/files", express.static("uploads/files"));


app.use(cookieParser());
app.use(express.json());

app.use('/api/auth',authRoutes); 
app.use('/api/contacts',contactRoutes); 
app.use('/api/messages', messagesRoutes);
app.use('/api/channel', channelRoutes);

main().then(()=>console.log("mongodb connected successfully")).catch(err => console.log(err));
const server = app.listen(port,()=>{
    console.log(`server is running at htttp://localhost:${port}`);
});

setupSocket(server);

async function main() {
    await mongoose.connect(process.env.DATABASE_URL);
  
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  
    app.get('/', (req, res) => {
      res.send('Hello World!')
    })
  
  } 
  //chat-app:HSV0By7fJlZk88V8