window.addEventListener('load', () => {

    document.getElementById('botonSignUp').addEventListener('click', (e) => {
        e.preventDefault(); //para que el form no confunda un boton normal y corriente como un boton tipo submit
        $.ajax({
            method: "POST",
            url: "/signup",
            data: { email: $("#email").val(), password: $("#password").val()}
        }).done(function (a) {
            $('#infoSignUp').html(`${JSON.stringify(a)}`);
        }).fail(function () {
            $('#infoSignUp').html("Error");
        });

    }, true);


});