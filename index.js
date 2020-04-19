const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const path = require("path");

const JugadorEX = require('./JugadorEX.js');
const PartidaEX = require('./PartidaEX.js');
/* var jugadorEx = new JugadorEX(1,1);
console.log(jugadorEx); */

var jugadores = [];
var partidas = [];
//SocketIO

const SocketIO = require("socket.io");


//settings
app.set("port", process.env.PORT || 3000);

//static files

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//start server
const server = app.listen(app.get("port"), () => {
    console.log("Server on port", app.get("port"));
});


//websockets
const io = SocketIO(server);
var users = [];
var jugadorsInLobby = 0;
var puntuaciones = {};
var flag1 = false;
var flag2 = false;
io.on("connection", (socket) => {
    console.log("New connection", socket.id);
    partidas.push(new PartidaEX(socket.id));
    users.push(socket.id);

    socket.on('chat-message', (data) => {
        io.sockets.emit('server-message', data); //enviar a todos
        //socket.broadcast.emit('server-message', data);
    });

    socket.on('chat-message2', (data) => {
        io.sockets.emit('server-message2', partidas); //enviar a todos
        //socket.broadcast.emit('server-message', data);
    });

    socket.on('chat-typing', (data) => {
        socket.broadcast.emit('server-typing', data); //enviar a todos menos a mi
    });


    socket.on('chat-array', (data) => {
        socket.broadcast.emit('server-array', data); //enviar a todos menos a mi
        //console.log("usuarios: " + users);
    });

    console.log("Jugadors en la lobby: " + jugadorsInLobby);
    socket.on('startGame', (data) => {
        jugadorsInLobby += data;
        console.log(jugadorsInLobby);
        //socket.broadcast.emit('server-message', data);
        if (jugadorsInLobby == 2) {
            io.sockets.emit('server-startGame', true); //enviar a todos
        }
    });

    socket.on('finishedGame1', (data) => {
        jugadores.push(new JugadorEX(data.name, data.passw, data.points));
        console.log("jugadores: " + JSON.stringify(jugadores));
        flag1 = true;
    });

    socket.on('finishedGame2', (data) => {
        jugadores.push(new JugadorEX(data.name, data.passw, data.points));
        console.log("jugadores: " + JSON.stringify(jugadores));
        flag2 = true;

    });
    socket.on("end", (data) => {
        if (flag1 && flag2) {
            var max = jugadores.reduce(function (prev, current) {
                return (prev.points > current.points) ? prev : current;
            });

            MongoClient.connect(url, function (err, db) {

                if (err) throw err;
                var dbo = db.db("Websockets");


                dbo.collection("bestPlayers").insertOne(max, function (err, res) {
                    if (err) throw err;
                    console.log("1 document inserted");
                    db.close();
                });
                console.log(`Puntuacion de ${max.name} registrado correctamente!`);
                //}



            });
            console.log("max: " + max + JSON.stringify(max));
        } else {
            console.log("sudo del max bro" + flag1 + flag2);
        }
    })






});


var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("Websockets");
    dbo.createCollection("players", function (err, res) {
        if (err) throw err;
        console.log("Collection players created!");
        db.close();
    });
});


app.post('/signUp', function (req, res) {

    MongoClient.connect(url, function (err, db) {

        if (err) throw err;
        var dbo = db.db("Websockets");
        var query = { name: req.body.name };

        dbo.collection("players").find(query).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });


        var myobj = { name: req.body.name, password: req.body.passw };
        dbo.collection("players").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
        console.log(`Usuario ${req.body.name} registrado correctamente!`);

        res.send(`Usuario ${req.body.name} registrado correctamente!`);

    });


});

app.get('/deleteAll', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Websockets");
        var myquery = {};
        dbo.collection("players").deleteMany(myquery, function (err, obj) {
            if (err) throw err;
            console.log(obj.result.n + " document(s) deleted");
            db.close();
        });

        res.send(`Eliminados todos los usuarios!`);
    });


});

app.get('/deleteAllMarks', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Websockets");
        var myquery = {};
        dbo.collection("bestPlayers").deleteMany(myquery, function (err, obj) {
            if (err) throw err;
            console.log(obj.result.n + " document(s) deleted");
            db.close();
        });

        res.send(`Eliminados todos las marcas!`);
    });


});
var bestPlayers = [];
app.get('/showBest', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("Websockets");
        dbo.collection("bestPlayers").find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            bestPlayers.push(result);
            db.close();
        });
    });
    res.send(bestPlayers);
    console.log("bestPlayers: " + bestPlayers);
    bestPlayers = [];
});