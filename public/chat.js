window.addEventListener('load', () => {

    const socket = io("http://localhost:3000");

    let message = document.getElementById("message");
    let username = document.getElementById("username");
    let send = document.getElementById("send");
    let output = document.getElementById("output");
    let actions = document.getElementById("actions");
    var tiempo = document.getElementById("tiempo");
    var time = 15;
    var juego = document.getElementById("juego");

    var myArray = [[1, 2, 3], [4, 5, 6]];


    function clicar() {
        alert("clikar");
    }
    function start() {
        var result = "<table border=1>";
        for (var i = 0; i < myArray.length; i++) {
            result += "<tr>";
            for (var j = 0; j < myArray[i].length; j++) {
                result += `<td id="${i}${j}"> ${myArray[i][j]} </td>`;
            }
            result += "</tr>";
        }
        result += "</table>";
        juego.innerHTML = result;

        /* var tdClick = document.getElementsByClassName("tdClick");
        tdClick.addEventListener('click', function () {
            alert("clicao");
        }); */

    }
    start();

    $('td').click(function () {
        //$(this).css('backgroundColor', '#000');
        $(this).html('hola');
        if($(this).attr('id')=='00'){
            $(this).css('backgroundColor', '#000');
        }
        
    });

    send.addEventListener('click', () => {
        socket.emit('chat-message', { "message": message.value, "username": username.value });
        console.log(
            username.value,
            message.value
        )
    });


    message.addEventListener('keypress', () => {
        socket.emit('chat-typing', username.value);
    });


    socket.on('server-message', (data) => {
        actions.innerHTML = "";
        output.innerHTML += `<p><strong>${data.username}</strong>: ${data.message}</p>`;
    });

    socket.on('server-typing', (data) => {
        actions.innerHTML = `<p><em>${data} is typing</em></p>`;
    });

    setInterval(function () {
        if (time > 0) {

            tiempo.innerHTML = --time;
        }

    }, 1000);














});
