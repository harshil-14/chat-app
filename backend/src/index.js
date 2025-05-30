import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import {connectDb} from './lib/db.js'

dotenv.config();
const app=express();
app.use(express.json());
const port=process.env.PORT;

app.use("/api/auth",authRoutes)

app.get('/', (req, res) => {
  res.send('API is running');
});


app.listen(port, ()=>{
    console.log(`server running at http://localhost:${port}`)
    connectDb();
})