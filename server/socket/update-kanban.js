const socketIO=require('socket.io');

module.exports=(app)=>{
    const io=socketIO(app);
    const kanban=io.on('connection',function(socket){
      console.log('User connected')  ;
      socket.on('task-added',(d)=>{
          socket.broadcast.emit('broadcast-task',d);
      })

      socket.on('task-deleted',(d)=>{
        socket.broadcast.emit('broadcast-task-deleted',d);
      })

      socket.on('task-updated',(d)=>{
          socket.broadcast.emit('broadcast-task-updated',d);
      })
      
    })
}