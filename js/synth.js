/* SYNTH */

$("#synthParameters").prepend(`  
    <div>
        <label for="volSynth">Vol.</label>
        <input name="volSynth"class="slider sliderSynth" id="volSynth" type="range" min="-20" max="20" value="1" step="1">
        <span id="volSynthVal">1</span>
    </div>
    <div>
        <label for="revSynth">Reverb</label>
        <input name="revSynth"class="slider sliderSynth" id="revSynth" type="range" min="0" max="1" value="0" step="0.1">
        <span id="revSynthVal">0</span>
    </div>
    <div>
        <label for="delaySynth">Delay</label>
        <input name="delaySynth"class="slider sliderSynth" id="delaySynth" type="range" min="0" max="1" value="0" step="0.1">
        <span id="delaySynthVal">0</span>
    </div>
    <div>
        <input type="submit" class="botonSynth buttonAnim" name="envio" value="Aplicar" id="enviarParSynth">
        <button id="muteSynth" class="botonSynth buttonAnim" data-playing="false">Mute</button>
        <button id="botonClearSynth" class="botonSynth buttonAnim" data-playing="false">Clear</button>
    </div>
`);


/* MOSTRAR PARAMETROS */

const toogleSynth = document.querySelector('#toogleSynth');
let boolToogleSynth = false;


$("#toogleSynth").on("click", function () {
    $("#synthParameters").toggle("fast");
    boolToogleSynth = !boolToogleSynth;

    if (boolToogleSynth == true) {
        toogleSynth.innerText = "▼";
    }

    else if (boolToogleSynth == false) {
        toogleSynth.innerText = "▲";
    }   
})




/* CREO ARRAY DEL SINTE CON 8 NOTAS */
const synths = [
    new Tone.Synth(),
    new Tone.Synth(),
    new Tone.Synth(),
    new Tone.Synth(),
    new Tone.Synth(),
    new Tone.Synth(),
    new Tone.Synth(),
    new Tone.Synth()
];

/* ASIGNO QUE TIPO DE SONIDO QUIERO QUE TENGA CADA NOTA */
synths[0].oscillator.type = 'square';
synths[1].oscillator.type = 'square';
synths[2].oscillator.type = 'square';
synths[3].oscillator.type = 'square';
synths[4].oscillator.type = 'square';
synths[5].oscillator.type = 'square';
synths[6].oscillator.type = 'square';
synths[7].oscillator.type = 'square';


/*  CUANTO QUIERO QUE DURE CADA NOTA */
Tone.Transport.scheduleRepeat(repeatSynth,'8n');

/* ASIGNO NOTAS A LOS INPUTS = ARRAY */
const $rowsSynth = document.body.querySelectorAll("section#synth > div > div > div"),
    notesSynth = ['C4', 'D4', 'E4','F4', 'G4', 'A4','B4', 'C5'];
let indexSynth = 0;



/* VOLUMEN */
/* CREO VOLUMEN Y LO CONECTO AL GAIN */
let volSynth = 1;
let synthVol = new Tone.Volume(1).connect(gain);

const volSynthControl = document.querySelector('#volSynth');
const gainSynthValor = document.querySelector('#volSynthVal');

    /* VISUAL VOLUMEN */
volSynthControl.addEventListener('input', function(e) {
    volSynth = Number(e.target.value);
    gainSynthValor.innerText = volSynth;
}, false);

/* BOTON MUTE */
const muteSynth = document.querySelector('#muteSynth')
$("#muteSynth").on("click", function() {
    synthVol.mute = !(synthVol.mute);

    if (synthVol.mute == false) {
        muteSynth.innerText = "Mute";
    }

    else if (synthVol.mute == true) {
        muteSynth.innerText = "Unmute";
    }   
});



/* REVERB */
/* CREO REVERB Y LA CONECTO AL VOLUMEN */
let revSynth = 0;
let synthRev = new Tone.Reverb(5).connect(synthVol);
synthRev.wet.value = 0;

const revSynthControl = document.querySelector('#revSynth');
const revSynthValor = document.querySelector('#revSynthVal');

    /* VISUAL REVERB */
revSynthControl.addEventListener('input', function(e) {
    revSynth = Number(e.target.value);
    revSynthValor.innerText = revSynth;
}, false);



/* DELAY */
/* CREO DELAY Y LA CONECTO AL VOLUMEN */
let delaySynth = 0;
let synthDelay = new Tone.FeedbackDelay("8n", 0.5).connect(synthVol);
synthDelay.wet.value = 0;

const delaySynthControl = document.querySelector('#delaySynth');
const delaySynthValor = document.querySelector('#delaySynthVal');

    /* VISUAL DELAY */
delaySynthControl.addEventListener('input', function(e) {
    delaySynth = Number(e.target.value);
    delaySynthValor.innerText = delaySynth;
}, false);




/*  CONECTO EL SINTE A DELAY Y REVERB */
synths.forEach(synth => synth.chain(synthDelay, synthRev));



/* ESTABLECE PARAMETROS */
$("#enviarParSynth").on("click", function (e) {
    e.preventDefault();

    /* VOLUMEN */
    volSynth = document.querySelector("#volSynth").value;
    synthVol.volume.value = volSynth;

    /* REVERB */
    revSynth = document.querySelector("#revSynth").value;
    synthRev.wet.value = revSynth;

    /* DELAY */
    delaySynth = document.querySelector("#delaySynth").value;
    synthDelay.wet.value = delaySynth;
});



/* BOTON CLEAR */
$("#botonClearSynth").on('click', function () {
    document.querySelectorAll('.inputSynth')
    .forEach(inputSynthCheck => inputSynthCheck.checked = false);
});



/* FUNCION DEL LOOP */
function repeatSynth(time) {
    let stepSynth = indexSynth % 32;
    for (let i = 0; i < $rowsSynth.length; i++) {
        let synth = synths[i],
            noteSynth = notesSynth[i],
            $row = $rowsSynth[i],
            $input = $row.querySelector(`input:nth-child(${stepSynth + 1})`);
        if ($input.checked) synth.triggerAttackRelease(noteSynth, '8n', time);
    }
    indexSynth++;
}
