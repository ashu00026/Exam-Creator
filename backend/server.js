import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import paperRoutes from "./routes/paperRoutes.js";
import studentRoutes from "./routes/studentRoute.js";
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import path from 'path'

connectDB();

const __dirname=path.resolve();

const app=express();

app.use(express.json()) // receive data
app.use(express.urlencoded({extended: true})) // send data
app.use(cookieParser())

app.use('/api/users',userRoutes);
app.use('/api/papers',paperRoutes);
app.use('/api/students',studentRoutes);

// app.get('/',(req,res)=>{
//     res.send("Backend running fine")
// })

app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
})

app.use(notFound)
app.use(errorHandler)


// npm run server or // npm run dev (t run both frontend and backend)
const port=process.env.PORT || 5000;
app.listen(port,()=>{console.log(`backend running on port ${port}`)})












/*

-**POST  /api/users **- Register a user
-**POST  /api/users/auth **- Authenticate a user and get token
-**POST  /api/users/logout **- Logout a user and clear cookie
-**GET   /api/users/profile **- Get user profile
-**PUT   /api/users/profile **- Updadte Profile

*/