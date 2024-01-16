import express from 'express';
import http from 'http';
import bodyparser from 'body-parser';
import cookieparser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';
import mongoose from 'mongoose';
import router from './router';

require('dotenv').config();

const app=express();
app.use(cors({
    credentials:true,
}))


app.use(compression());
app.use(cookieparser());
app.use(bodyparser.json());


const server=http.createServer(app);    

server.listen(5050,()=>{
    console.log("Server is running on port 5050 at http://localhost:5050");
});
console.log(process.env.MONGO_URI);
const MONGO_URL=process.env.MONGO_URI;
mongoose.Promise=Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error',(error: Error)=>console.log(error));

app.use('/', router());