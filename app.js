const express = require("express");
const app = express();
var cors = require('cors');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(cors());
app.options('*', cors()); 

const bodyParser = require("body-parser");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('an user connected');
    socket.on('room', function(room) {
        console.log(room);
        socket.join(room);
        socket.emit('message', 'done');
    });
    socket.on('shoot', function(room) {
        io.sockets.in(room).emit('message', 'what is going on, party people?');
    });
});

  
http.listen(3000, function(){
    console.log('listening on *:3000');
});