window.addEventListener('load', () => {

    const socket = io("http://localhost:3000");

    let message = document.getElementById("message");
    let username = document.getElementById("username");
    let send = document.getElementById("send");
    let btnUsers = document.getElementById("btnUsers");
    let output = document.getElementById("output");
    let actions = document.getElementById("actions");
    var tiempo = document.getElementById("tiempo");
    var time = 15;
    var juego = document.getElementById("juego");

    var puntos = 0;


    var myArray = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]]
    var newArray = new Array();




    function start() {
        var result = "<table id='mytab2' border=1><tbody id=mytab1>";
        for (var i = 0; i < myArray.length; i++) {
            result += "<tr>";

            for (var j = 0; j < myArray.length; j++) {
                result += `<td id="${i}${j}"> ${myArray[i][j]} </td>`;
            }



            result += "</tr>";
        }
        result += "</tbody></table>";
        juego.innerHTML = result;



    }
    start();


    document.getElementById("startBtn").addEventListener("click", () => {
        $("#startBtn").css('background-color', 'green');
        socket.emit('startGame', 1);
    });

    //td click
    $('td').click(function () {

        puntos += 100;
        
        newArray = [];

        if (localStorage.getItem("name") == "1") {

            if ($(this).html() == 0) {
                $(this).html('1');
            }

        } if (localStorage.getItem("name") != "1") {
            if ($(this).html() == 0) {
                $(this).html('2');
            }
        }

        if ($(this).html() == "1") {
            $(this).css('backgroundColor', 'blue');
        }
        if ($(this).html() == "2") {
            $(this).css('backgroundColor', 'red');
        }

        $('#mytab1 tr').each(function (item, index) {
            console.log(`item: ${item}, index:${index}`);
            $(this).find('td').each(function () {

                newArray.push(this.innerHTML);

            })
        });

        console.log("--------");

        socket.emit('chat-array', newArray);
        console.log(
            newArray
        )

    });


    send.addEventListener('click', () => {
        socket.emit('chat-message', { "message": message.value, "username": username.value });
        console.log(
            username.value,
            message.value
        )
    });

    btnUsers.addEventListener('click', () => {
        var txt = "vacio";
        socket.emit('chat-message2', { 'users': txt });

    });

    //usuario escribiendo
    message.addEventListener('keypress', () => {
        socket.emit('chat-typing', username.value);
    });


    socket.on('server-message', (data) => {
        
        actions.innerHTML = "";
        output.innerHTML += `<p><strong>${data.username}</strong>: ${data.message}</p>`;
    });

    socket.on('server-message2', (data) => {
        alert(JSON.stringify(data));
        
    });


    socket.on('server-typing', (data) => {
        actions.innerHTML = `<p><em>${data} is typing</em></p>`;
    });

    //printar nuevo array
    socket.on('server-array', (data) => {

        juego.innerHTML = "";
        var result2 = "<table id='mytab2' border=1><tbody id=mytab1>";
        var aux = 0;
        for (var i = 0; i < myArray.length; i++) {
            result2 += "<tr>";

            for (var j = 0; j < myArray.length; j++) {

                result2 += `<td id="${i}${j}"> ${data[aux]} </td>`;
                aux++;
            }



            result2 += "</tr>";
        }
        result2 += "</tbody></table>";
        juego.innerHTML = result2;


        $('td').click(function () {

            newArray = [];
            if (localStorage.getItem("name") == "1") {

                if ($(this).html() == 0) {
                    $(this).html('1');
                }

            } if (localStorage.getItem("name") != "1") {
                if ($(this).html() == 0) {
                    $(this).html('2');
                }

            }
            if ($(this).html() == "1") {
                $(this).css('backgroundColor', 'blue');
            }
            if ($(this).html() == "2") {
                $(this).css('backgroundColor', 'red');
            }

            $('#mytab1 tr').each(function (item, index) {
                console.log(`item: ${item}, index:${index}`);
                $(this).find('td').each(function () {

                    newArray.push(this.innerHTML);

                })
            });
            console.log("--------");

            socket.emit('chat-array', newArray);
            console.log(
                newArray
            )

        });
    });


    //contador
    socket.on('server-startGame', (data) => {
        const interval = setInterval(function () {
            if (time > 0) {

                tiempo.innerHTML = --time;
            }
            if (time == 0) {
                $('#estadoJuego').html("Juego finalizado");
                clearInterval(interval);
                $('td').unbind();
                $('#puntuacion').html("Puntuacion: " + puntos);
               

                if (localStorage.getItem("name") == "1") {

                    socket.emit("finishedGame1", {
                        "name": localStorage.getItem("name"),
                        "passw": localStorage.getItem("passw"),
                        "points": puntos
                    });

                } if (localStorage.getItem("name") != "1") {
                    socket.emit("finishedGame2", {
                        "name": localStorage.getItem("name"),
                        "passw": localStorage.getItem("passw"),
                        "points": puntos
                    });

                }
                socket.emit("end",true);
            }


        }, 1000);
    });


   /*  document.getElementById("signUpBtn").addEventListener("click", () => {
        let name = document.getElementById("name").value;
        let passw = document.getElementById("passw").value;
        localStorage.setItem("name", name);
        localStorage.setItem("passw", passw);
        //document.getElementById("result").innerHTML = localStorage.getItem("lastname");
    });

    document.getElementById("deleteAllBtn").addEventListener("click", () => {

        //document.getElementById("result").innerHTML = localStorage.getItem("lastname");
    });

    */
    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem('name');
        localStorage.removeItem('passw');
        alert("Logout!");
    }); 


    document.getElementById("showBestBtn").addEventListener("click",()=>{
        $.ajax({
            type: "GET",
            url: '/showBest',
            success: function(data) {
                alert(JSON.stringify(data));
                document.getElementById("bestPlayersP").innerHTML=JSON.stringify(data);
            },
            error: function() {
                console.log("No se ha podido obtener la información");
            }
        });
    })











});
