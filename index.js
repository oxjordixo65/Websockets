const express = require("express");
const app = express();
const path = require("path");
const SocketIO = require("socket.io");

//settings
app.set("port", process.env.PORT || 3000);

//static files

app.use(express.static(path.join(__dirname, "public")));

//start server
const server = app.listen(app.get("port"), () => {
    console.log("Server on port", app.get("port"));
});


//websockets
const io = SocketIO(server);

io.on("connection", (socket) => {
    console.log("New connection", socket.id);

    socket.on('chat-message', (data) => {
        io.sockets.emit('server-message', data); //enviar a todos
        //socket.broadcast.emit('server-message', data);
    });

    socket.on('chat-typing', (data) => {
        socket.broadcast.emit('server-typing', data); //enviar a todos menos a mi
    });



});




