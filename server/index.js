require('dotenv').config();
const express=require('express');
const app=express();
const cors=require('cors');
const route=require('./route')
const server=require('http').Server(app);
const kanbanSocket=require('./socket/update-kanban');

const PORT=process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(route);

server.listen(PORT,()=>{
    console.log('Server jalan di port '+PORT);
})

kanbanSocket(server);