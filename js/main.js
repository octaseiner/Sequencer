console.clear();

/* INITIALIZE */
document.documentElement.addEventListener('mousedown', () => {
    if (Tone.context.state !== 'running') Tone.context.resume();
});



/* PLAY - STOP BUTTON */

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



/* CLEAN ALL INSTRUMENTS INPUTS */
$("#botonClearAll").on('click', function () {
    document.querySelectorAll('input[type="checkbox"]:not(.instShow)')
    .forEach(inputCheck => inputCheck.checked = false);
});



/* RESET ALL */
$("#botonResetAll").on("click", function() {
    location.reload();
});



/* RESTART */
$("#botonRestart").on("click", function() {
    $(`input`).removeClass("snow");
    indexSynth = 0;
    indexBass = 0;
    indexDrums = 0;
    indexChords = 0;
})
