/* DRUMS */



/* CREO ARRAY DE DRUMS CON 8 CUERPOS Y ASIGNO SONIDO */
const drums = [
    new Tone.Player("./audios/crash.mp3"),
    new Tone.Player("./audios/HHo.mp3"),
    new Tone.Player("./audios/HHc.mp3"),
    new Tone.Player("./audios/snap.mp3"),
    new Tone.Player("./audios/clap.mp3"),
    new Tone.Player("./audios/snareB.mp3"),
    new Tone.Player("./audios/snareA.mp3"),
    new Tone.Player("./audios/kick.mp3")
]





/*  CUANTO QUIERO QUE DURE CADA NOTA */
Tone.Transport.scheduleRepeat(repeatDrums,'4n');

/* ASIGNO NOTAS A LOS INPUTS = ARRAY */
const $rowsDrums = document.body.querySelectorAll('section#drums > div > div > div');
let indexDrums = 0;



/* VOLUMEN */
/* CREO VOLUMEN Y LO CONECTO AL GAIN */
let volDrums = 1;
let drumsVol = new Tone.Volume(1).connect(gain);

const volDrumsControl = document.querySelector('#volDrums');
const gainDrumsValor = document.querySelector('#volDrumsVal');

    /* VISUAL VOLUMEN */
volDrumsControl.addEventListener('input', function(e) {
    volDrums = Number(e.target.value);
    gainDrumsValor.innerText = volDrums;
}, false);

/* BOTON MUTE */
const muteDrums = document.querySelector('#muteDrums')
$("#muteDrums").on("click", function() {
    drumsVol.mute = !(drumsVol.mute);

    if (drumsVol.mute == false) {
        muteDrums.innerText = "Mute";
    }

    else if (drumsVol.mute == true) {
        muteDrums.innerText = "Unmute";
    }   
});



/* REVERB */
/* CREO REVERB Y LA CONECTO AL VOLUMEN */
let revDrums = 0;
let drumsRev = new Tone.Reverb(5).connect(drumsVol);
drumsRev.wet.value = 0;

const revDrumsControl = document.querySelector('#revDrums');
const revDrumsValor = document.querySelector('#revDrumsVal');

    /* VISUAL REVERB */
revDrumsControl.addEventListener('input', function(e) {
    revDrums = Number(e.target.value);
    revDrumsValor.innerText = revDrums;
}, false);



/* DELAY */
/* CREO DELAY Y LA CONECTO AL VOLUMEN */
let delayDrums = 0;
let drumsDelay = new Tone.FeedbackDelay("8n", 0.5).connect(drumsVol);
drumsDelay.wet.value = 0;

const delayDrumsControl = document.querySelector('#delayDrums');
const delayDrumsValor = document.querySelector('#delayDrumsVal');

    /* VISUAL DELAY */
delayDrumsControl.addEventListener('input', function(e) {
    delayDrums = Number(e.target.value);
    delayDrumsValor.innerText = delayDrums;
}, false);



/*  CONECTO EL SINTE A DELAY Y REVERB */
drums.forEach(drums => drums.chain(drumsDelay, drumsRev));




/* ESTABLECE PARAMETROS */
$("#enviarParDrums").on("click", function (e) {
    e.preventDefault();

    /* VOLUMEN */
    volDrums = document.querySelector("#volDrums").value;
    drumsVol.volume.value = volDrums;

    /* REVERB */
    revDrums = document.querySelector("#revDrums").value;
    drumsRev.wet.value = revDrums;

    /* DELAY */
    delayDrums = document.querySelector("#delayDrums").value;
    drumsDelay.wet.value = delayDrums;
});



/* BOTON CLEAR */
$("#botonClearDrums").on('click', function () {
    document.querySelectorAll('.inputDrums')
    .forEach(inputDrumsCheck => inputDrumsCheck.checked = false);
});






/* FUNCION DEL LOOP */
function repeatDrums(time) {
let stepDrums = indexDrums % 32;
    for (let i = 0; i < $rowsDrums.length; i++) {
        let drum = drums[i],
            $row = $rowsDrums[i],
            $input = $row.querySelector(`input:nth-child(${stepDrums + 1})`);
        if ($input.checked) drum.start(time);;
    }

    indexDrums++;
    drums.autostart = true;
} 

