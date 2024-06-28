let io;

module.exports = {
    init : (httpServer, rule)=>{
        io = require('socket.io')(httpServer, rule);
        return io;
    },
    getIO : ()=>{
        if(!io){
            throw new Error('Socket.io not Initialized!');
        }
        return io;
    }

}