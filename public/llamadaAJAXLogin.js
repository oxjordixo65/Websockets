window.addEventListener('load', () => {



    document.getElementById('botonLogin').addEventListener('click', (e) => {
        e.preventDefault(); //para que el form no confunda un boton normal y corriente como un boton tipo submit
        $.ajax({
            method: "POST",
            url: "/login",
            data: { email: $("#email").val(), password: $("#password").val() }
        }).done(function (a) {
            $('#infoLogin').html(`${JSON.stringify(a)}`);
        }).fail(function () {
            $('#infoLogin').html("Error");
        });

    }, true);

    document.getElementById('botonSecureLogin').addEventListener('click', (e) => {
        e.preventDefault(); //para que el form no confunda un boton normal y corriente como un boton tipo submit
        $.ajax({
            method: "GET",
            url: `/user/profile?secret_token=${$("#secret_token").val()}`,

        }).done(function (a) {
            $('#infoSecureLogin').html(`${JSON.stringify(a)}`);
        }).fail(function () {
            $('#infoSecureLogin').html("Error");
        });

    }, true);

    document.getElementById('copiarText').addEventListener('click', (e) => {
        e.preventDefault();
        var copyText = document.getElementById("infoLogin");

        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /*For mobile devices*/

        /* Copy the text inside the text field */
        document.execCommand("copy");

        /* Alert the copied text */
        alert("Copied the text: " + copyText.textContent);
    });






});