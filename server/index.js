require('dotenv').config();
const express=require('express');
const app=express();
const cors=require('cors');
const route=require('./route')

const PORT=process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use(route);

app.listen(PORT,()=>{
    console.log('Server jalan di port '+PORT);
})