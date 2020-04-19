const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const path = require("path");

/* const passport = require('passport');
const mongoose = require('mongoose');

const UserModel = require('./model');

mongoose.connect('mongodb://127.0.0.1:27017/passport-jwt', { useMongoClient: true });
mongoose.connection.on('error', error => console.log(error));
mongoose.Promise = global.Promise;

require('./auth');

app.use(bodyParser.urlencoded({ extended: false }));

const routes = require('./routes');
const secureRoute = require('./secure-route');

app.use('/', routes);
//We plugin our jwt strategy as a middleware so only verified users can access this route
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);

//Handle errors
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err });
}); */

//HASTA AQUI PASSPORT



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
io.on("connection", (socket) => {
    console.log("New connection", socket.id);
    users.push(socket.id);

    socket.on('chat-message', (data) => {
        io.sockets.emit('server-message', data); //enviar a todos
        //socket.broadcast.emit('server-message', data);
    });

    socket.on('chat-message2', (data) => {
        io.sockets.emit('server-message2', users); //enviar a todos
        //socket.broadcast.emit('server-message', data);
    });

    socket.on('chat-typing', (data) => {
        socket.broadcast.emit('server-typing', data); //enviar a todos menos a mi
    });


    socket.on('chat-array', (data) => {
        socket.broadcast.emit('server-array', data); //enviar a todos menos a mi
        console.log("usuarios: " + users);
    });






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
        //var flag=false;

        dbo.collection("players").find(query).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            flag = true;
            db.close();
        });

        //console.log("resultados..." + results);

        //if(flag){
        var myobj = { name: req.body.name, password: req.body.passw };
        dbo.collection("players").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
        console.log(`Usuario ${req.body.name} registrado correctamente!`);
        //}

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

