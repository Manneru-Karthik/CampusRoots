
const express= require('express');
const app=express();
const mongoose=require("mongoose");
const routes=require("./routes/route");
const session= require('express-session');

const uploadroutes= require('./routes/uploadroute');

const cors= require('cors');
require("dotenv").config();

app.use(express.json());
app.use(cors());



mongoose.connect(process.env.MONGOOSE_URL);


app.use("/",(req,res)=>{
    res.send("<h1>welcome</h1>");
})

app.use("/alumnitracking",routes,uploadroutes);
const server=app.listen(process.env.PORT,()=> {
    console.log(`Server established at ${process.env.PORT}`)});


    