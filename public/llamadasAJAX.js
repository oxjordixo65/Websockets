window.addEventListener('load', () => {

    document.getElementById('botonIniciarJoc').addEventListener('click', (e) => {
        e.preventDefault(); //para que el form no confunda un boton normal y corriente como un boton tipo submit
        $.ajax({
            method: "POST",
            url: "/iniciarJoc/codiPartida",
            data: { codi: $("#codiIniciarJoc").val() }
        }).done(function (a) {
            $('#infoIniciarJoc').html(JSON.stringify(a));
        }).fail(function () {
            $('#infoIniciarJoc').html("Error");
        });

    }, true);



    document.getElementById('botonObtenirCarta').addEventListener('click', (e) => {
        e.preventDefault();
        $.ajax({
            method: "GET",
            url: `/obtenirCarta/:${$("#codiObtenirCarta").val()}`,

        }).done(function (a) {
            $('#infoObtenirCarta').after(JSON.stringify(a));
        }).fail(function () {
            $('#infoObtenirCarta').html("Error");
        });

    }, true);

    document.getElementById('botonMostrarCartes').addEventListener('click', (e) => {
        e.preventDefault();
        $.ajax({
            method: "GET",
            url: `/mostrarCartes/${$("#codiMostrarCartes").val()}`,

        }).done(function (a) {

            $.parseJSON(a).forEach(e => {
                $('#infoMostrarCartes').after(`<img src='${e.imagen}'>`);
            });

        }).fail(function () {
            $('#infoMostrarCartes').html("Error");
        });

    }, true);


    document.getElementById('botonTirarCarta').addEventListener('click', (e) => {
        e.preventDefault(); //para que el form no confunda un boton normal y corriente como un boton tipo submit
        $.ajax({
            method: "PUT",
            url: "/tirarCarta/codiPartida/carta",
            data: { player: $("#playerTirarCarta").val() }
        }).done(function (a) {
            $('#infoTirarCarta').html(JSON.stringify(a));
        }).fail(function () {
            $('#infoTirarCarta').html("Error");
        });

    }, true);


    document.getElementById('botonAcabarJoc').addEventListener('click', (e) => {
        e.preventDefault(); //para que el form no confunda un boton normal y corriente como un boton tipo submit
        $.ajax({
            method: "DELETE",
            url: `/acabarJoc/${$('#codiAcabarJoc').val()}`,
        }).done(function (a) {
            $('#infoAcabarJoc').html(JSON.stringify(a));
        }).fail(function () {
            $('#infoAcabarJoc').html("Error");
        });

    }, true);







});