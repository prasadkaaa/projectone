const EventEmitter =  require("events");

class Chat extends EventEmitter{
    sendMessage(msg){
        console.log(`Message send: ${msg}`);
        this.emit('messageReceived', msg)
    }
}