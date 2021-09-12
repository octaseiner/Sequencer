/* CHORDS */


/* PARAMETROS */
$("#chordsParameters").prepend(`                               
    <div>
        <label for="volChords">Vol.</label>
        <input name="volChords" class="slider sliderChords" id="volChords" type="range" min="-20" max="20" value="1" step="1">
        <span id="volChordsVal">1</span>
    </div>
    <div>
        <label for="revChords">Reverb</label>
        <input name="revChords"class="slider sliderChords" id="revChords" type="range" min="0" max="1" value="0" step="0.1">
        <span id="revChordsVal">0</span>
    </div>
    <div>
        <label for="delayChords">Delay</label>
        <input name="delayChords"class="slider sliderChords" id="delayChords" type="range" min="0" max="1" value="0" step="0.1">
        <span id="delayChordsVal">0</span>
    </div>
    <div>
        <input type="submit" class="botonChords buttonAnim" name="envio" value="Aplicar" id="enviarParChords">
        <button id="muteChords" class="botonChords buttonAnim" data-playing="false">Mute</button>
        <button id="botonClearChords" class="botonChords buttonAnim" data-playing="false">Clear</button>
    </div>                     
`);


/* MOSTRAR PARAMETROS */

const toogleChords = document.querySelector('#toogleChords');
let boolToogleChords = false;


$("#toogleChords").on("click", function () {
    $("#chordsParameters").toggle("fast");
    boolToogleChords = !boolToogleChords;

    if (boolToogleChords == true) {
        toogleChords.innerText = "▲";
    }

    else if (boolToogleChords == false) {
        toogleChords.innerText = "▼";
    }   
})







/* CREO ARRAY DEL BAJO CON 8 NOTAS */
const acordes = [
    new Tone.PolySynth(),
    new Tone.PolySynth(),
    new Tone.PolySynth(),
    new Tone.PolySynth(),
    new Tone.PolySynth(),
    new Tone.PolySynth(),
    new Tone.PolySynth(),
    new Tone.PolySynth()
];

/* ASIGNO QUE TIPO DE SONIDO QUIERO QUE TENGA CADA NOTA */

acordes[0].set({ detune: 0 });
acordes[1].set({ detune: 0 });
acordes[2].set({ detune: 0 });
acordes[3].set({ detune: 0 });
acordes[4].set({ detune: 0 });
acordes[5].set({ detune: 0 });
acordes[6].set({ detune: 0 });
acordes[7].set({ detune: 0 });

/*  CUANTO QUIERO QUE DURE CADA NOTA */
Tone.Transport.scheduleRepeat(repeatChords,'8n');

/* ASIGNO NOTAS A LOS INPUTS = ARRAY */
const $rowsChords = document.body.querySelectorAll('section#chords > div > div > div'),
    notesChords = [['C4','E4','G4'], ['D4','F4','A4'], ['E4','G4','B4'],['F4','A4','C5'], ['G4','B4','D5'], ['A4','C5','E5'],['B5','D5','F5'],['C5','E5','G5']];
let indexChords = 0;




/* VOLUMEN */
/* CREO VOLUMEN Y LO CONECTO AL GAIN */
let volChords = 1;
let chordsVol = new Tone.Volume(1).connect(gain);

const volChordsControl = document.querySelector('#volChords');
const gainChordsValor = document.querySelector('#volChordsVal');

    /* VISUAL VOLUMEN */
volChordsControl.addEventListener('input', function(e) {
    volChords = Number(e.target.value);
    gainChordsValor.innerText = volChords;
}, false);

/* BOTON MUTE */
const muteChords = document.querySelector('#muteChords')
$("#muteChords").on("click", function() {
    chordsVol.mute = !(chordsVol.mute);

    if (chordsVol.mute == false) {
        muteChords.innerText = "Mute";
    }

    else if (chordsVol.mute == true) {
        muteChords.innerText = "Unmute";
    }   
});



/* REVERB */
/* CREO REVERB Y LA CONECTO AL VOLUMEN */
let revChords = 0;
let chordsRev = new Tone.Reverb(5).connect(chordsVol);
chordsRev.wet.value = 0;

const revChordsControl = document.querySelector('#revChords');
const revChordsValor = document.querySelector('#revChordsVal');

    /* VISUAL REVERB */
revChordsControl.addEventListener('input', function(e) {
    revChords = Number(e.target.value);
    revChordsValor.innerText = revChords;
}, false);



/* DELAY */
/* CREO DELAY Y LA CONECTO AL VOLUMEN */
let delayChords = 0;
let chordsDelay = new Tone.FeedbackDelay("8n", 0.5).connect(chordsVol);
chordsDelay.wet.value = 0;

const delayChordsControl = document.querySelector('#delayChords');
const delayChordsValor = document.querySelector('#delayChordsVal');

    /* VISUAL DELAY */
delayChordsControl.addEventListener('input', function(e) {
    delayChords = Number(e.target.value);
    delayChordsValor.innerText = delayChords;
}, false);




/*  CONECTO EL SINTE A DELAY Y REVERB */
acordes.forEach(acorde => acorde.chain(chordsDelay, chordsRev));



/* ESTABLECE PARAMETROS */
$("#enviarParChords").on("click", function (e) {
    e.preventDefault();

    /* VOLUMEN */
    volChords = document.querySelector("#volChords").value;
    chordsVol.volume.value = volChords;

    /* REVERB */
    revChords = document.querySelector("#revChords").value;
    chordsRev.wet.value = revChords;

    /* DELAY */
    delayChords = document.querySelector("#delayChords").value;
    chordsDelay.wet.value = delayChords;
});



/* BOTON CLEAR */
$("#botonClearChords").on('click', function () {
    document.querySelectorAll('.inputChords')
    .forEach(inputChordsCheck => inputChordsCheck.checked = false);
});



/* FUNCION DEL LOOP */
function repeatChords(time) {
let stepChords = indexChords % 32;
    for (let i = 0; i < $rowsChords.length; i++) {
        let acorde = acordes[i],
            noteChords = notesChords[i],
            $row = $rowsChords[i],
            $input = $row.querySelector(`input:nth-child(${stepChords + 1})`);
        if ($input.checked) acorde.triggerAttackRelease(noteChords, '4n', time);
    }
    indexChords++;
} 

