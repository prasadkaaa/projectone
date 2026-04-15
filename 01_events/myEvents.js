const EventEmitter = require("events");

const eventEmitter = new EventEmitter()

eventEmitter.on('greet',(username)=>{
    console.log(`hello ${username} and welcome to evenst in node js`);
})

eventEmitter.once('pushnotify',()=>{
     console.log(`this event will trigger only once `);
})


// Emit the events
// eventEmitter.emit('greet', 'prasad');
// eventEmitter.emit('pushnotify');
// eventEmitter.emit('pushnotify');

const myListener = () => console.log("i am a test listner");
eventEmitter.on('test',myListener);
eventEmitter.emit("test");
eventEmitter.emit("test");
eventEmitter.emit("test");
eventEmitter.removeListener("test",myListener);
eventEmitter.emit("test");

console.log(eventEmitter.listeners("greet"))
