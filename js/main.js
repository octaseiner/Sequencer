console.clear();

/* INICIALIZO */
document.documentElement.addEventListener('mousedown', () => {
    if (Tone.context.state !== 'running') Tone.context.resume();
});



/* CONVIERTO BOTON EN BULEANO */
/* EVENTO CLICK PARA CAMBIAR TRUE/FALSE */
/* TRUE = REPRODUCE / FALSE = FRENA */

const play = document.querySelector('#botonPlay');
let bool = false;

$("#botonPlay").on("click", function () {
    bool = !bool;

    if (bool == true) {
        Tone.Transport.start();

        $('#repro').append("<p id='reproduciendo'>Reproduciendo...</p>").css({"color": "snow"});
        $("#reproduciendo").delay(1000)
                            .fadeOut(2000);

        play.innerText = "Stop";
    }

    else if (bool == false) {
        Tone.Transport.stop();
        $('#reproduciendo').remove();

        play.innerText = "Play";
    }   
});



/* APRETO PARA LIMPIAR TODOS LOS INPUTS */
$("#botonClearAll").on('click', function () {
    document.querySelectorAll('input[type="checkbox"]')
    .forEach(inputCheck => inputCheck.checked = false);
});










