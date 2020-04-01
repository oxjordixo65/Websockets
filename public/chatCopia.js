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

    //var myArray = [[1, 2, 3], [4, 5, 6]];

    var myArray = [0, 0, 0, 0, 0, 0]
    var newArray = new Array();


   
    function start() {
        var result = "<table id='mytab2' border=1><tbody id=mytab1>";
        for (var i = 0; i < myArray.length; i++) {
            result += "<tr>";

            result += `<td id="${i}"> ${myArray[i]} </td>`;

            result += "</tr>";
        }
        result += "</tbody></table>";
        juego.innerHTML = result;



    }
    start();

  

    //td click
    $('td').click(function () {
        
        //$(this).css('backgroundColor', '#000');
        
        newArray = [];
        $(this).html('1');


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
        var txt="vacio";
        socket.emit('chat-message2', { 'users':txt });
       
        

    });

    //usuario escribiendo
    message.addEventListener('keypress', () => {
        socket.emit('chat-typing', username.value);
    });


    socket.on('server-message', (data) => {
        alert("data"+data);
        actions.innerHTML = "";
        output.innerHTML += `<p><strong>${data.username}</strong>: ${data.message}</p>`;
    });

    socket.on('server-message2', (data) => {
        alert(data);
        actions.innerHTML = "";
        output.innerHTML += `<p><strong>${data}</strong></p>`;
    });
    

    socket.on('server-typing', (data) => {
        actions.innerHTML = `<p><em>${data} is typing</em></p>`;
    });

    //printar nuevo array
    socket.on('server-array', (data) => {
        
        var result = document.getElementById("mytab1");
        result.innerHTML = "";

        for (var i = 0; i < myArray.length; i++) {
            result.innerHTML += `<td id="${i}"> ${data[i]} </td>`;
        }
        

        $('td').click(function () {
            
            newArray = [];
            $(this).html('1');
           

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
    setInterval(function () {
        if (time > 0) {

            tiempo.innerHTML = --time;
        }

    }, 1000);














});
