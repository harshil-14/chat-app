import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import {connectDb} from './lib/db.js'
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";

import {app,server} from "./lib/socket.js";

dotenv.config();
// const app=express();

const port=process.env.PORT;
const __dirname = path.resolve();



app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
// app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}));

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);


if (process.env.NODE_ENV==="production") {
  app.use(express.static(path.join(__dirname,"../frontend/dist")));

  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
  })
}

app.get('/', (req, res) => {
  res.send('API is running');
});


server.listen(port, ()=>{
    console.log(`server running at http://localhost:${port}`)
    connectDb();
})