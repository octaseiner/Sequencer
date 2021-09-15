/* CHORDS */


/* PARAMETERS */
$("#chordsParameters").prepend(`                               
    <div>
        <label for="volChords">Vol.</label>
        <input name="volChords" class="slider sliderChords" id="volChords" type="range" min="-40" max="6" value="-6" step="1">
        <span id="volChordsVal">-6</span>
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
    <div class="parInstButtons">
        <input type="submit" class="botonChords buttonAnim" name="envio" value="Apply" id="enviarParChords">
        <button id="muteChords" class="botonChords buttonAnim" data-playing="false">Mute</button>
        <button id="soloChords" class="botonChords buttonAnim" data-playing="false">Solo</button>
        <button id="botonClearChords" class="botonChords buttonAnim" data-playing="false">Clear</button>
    </div>                     
`);


/* SHOW PARAMETERS*/

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




/* INPUT CHORDS CHECK */
const checkChords = document.querySelector('#checkChords');
let boolCheckChords = true;

$("#checkChords").on("click", () => {
    boolCheckChords = !boolCheckChords;

    if (boolCheckChords == false) {
        $("#checkChords").attr("checked","checked");
        $("#chords").hide("fast");
    }

    else if (boolCheckChords == true) {
        $("#checkChords").removeAttr("checked");
        $("#chords").show("fast");
    }   
});




/* CREATE CHORDS ARRAY WITH 8 NOTES */
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

/* ASSIGN NOTE SOUND */

acordes[0].set({ detune: 0 });
acordes[1].set({ detune: 0 });
acordes[2].set({ detune: 0 });
acordes[3].set({ detune: 0 });
acordes[4].set({ detune: 0 });
acordes[5].set({ detune: 0 });
acordes[6].set({ detune: 0 });
acordes[7].set({ detune: 0 });

/*  CALL LOOP FUCTION - NOTE DURATION */
Tone.Transport.scheduleRepeat(repeatChords,'16n');

/* GET ALL CHORDS INPUTS - ASSIGN INPUTS NOTES */
const $rowsChords = document.body.querySelectorAll('section#chords > div > div > div'),
    notesChords = [['C5','E5','G5'], ['B4','D5','F5'], ['A4','C5','E5'], ['G4','B4','D5'], ['F4','A4','C5'], ['E4','G4','B4'], ['D4','F4','A4'], ['C4','E4','G4']];
    let indexChords = 0;




/* VOLUME */
/* CREATE VOLUME AND CONNECT TO GAIN */
let volChords = -6;
let chordsVol = new Tone.Volume(-6).connect(gain);

const volChordsControl = document.querySelector('#volChords');
const gainChordsValor = document.querySelector('#volChordsVal');

    /* VOLUME VISUAL */
volChordsControl.addEventListener('input', function(e) {
    volChords = Number(e.target.value);
    gainChordsValor.innerText = volChords;
}, false);

/* BUTTON MUTE */
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


/* BUTTON SOLO */
const soloChords = document.querySelector('#soloChords');
let boolSoloChords = false;

$("#soloChords").on("click", function() {

    boolSoloChords = !boolSoloChords;


    if (boolSoloChords == false) {
        soloChords.innerText = "Solo";
        muteDrums.innerText = "Mute";
        muteSynth.innerText = "Mute";
        muteBass.innerText = "Mute";
        drumsVol.mute = !(drumsVol.mute);
        synthVol.mute = !(synthVol.mute);
        bassVol.mute = !(bassVol.mute);
    }

    else if (boolSoloChords == true) {
        soloChords.innerText = "All"
        muteDrums.innerText = "Unmute";
        muteSynth.innerText = "Unmute";
        muteBass.innerText = "Unmute";
        drumsVol.mute = !(drumsVol.mute);
        synthVol.mute = !(synthVol.mute);
        bassVol.mute = !(bassVol.mute);
    }   

    if (chordsVol.mute == true) {
        chordsVol.mute = !(chordsVol.mute)
        muteChords.innerText = "Mute";
    }
});





/* REVERB */
/* CREATE REVERB AND CONNECT TO VOLUME */
let revChords = 0;
let chordsRev = new Tone.Reverb(5).connect(chordsVol);
chordsRev.wet.value = 0;

const revChordsControl = document.querySelector('#revChords');
const revChordsValor = document.querySelector('#revChordsVal');

    /* REVERB VISUAL */
revChordsControl.addEventListener('input', function(e) {
    revChords = Number(e.target.value);
    revChordsValor.innerText = revChords;
}, false);



/* DELAY */
/* CREATE DELAY AND CONNECT TO VOLUME */
let delayChords = 0;
let chordsDelay = new Tone.FeedbackDelay("8n", 0.5).connect(chordsVol);
chordsDelay.wet.value = 0;

const delayChordsControl = document.querySelector('#delayChords');
const delayChordsValor = document.querySelector('#delayChordsVal');

    /* DELAY VISUAL */
delayChordsControl.addEventListener('input', function(e) {
    delayChords = Number(e.target.value);
    delayChordsValor.innerText = delayChords;
}, false);




/*  CONNECT CHORDS TO DELAY AND REVERB */
acordes.forEach(acorde => acorde.chain(chordsDelay, chordsRev));



/* APPLY PARAMETROS */
$("#enviarParChords").on("click", function (e) {
    e.preventDefault();

    /* VOLUME */
    volChords = document.querySelector("#volChords").value;
    chordsVol.volume.value = volChords;

    /* REVERB */
    revChords = document.querySelector("#revChords").value;
    chordsRev.wet.value = revChords;

    /* DELAY */
    delayChords = document.querySelector("#delayChords").value;
    chordsDelay.wet.value = delayChords;
});



/* BUTTON CLEAR */
$("#botonClearChords").on('click', function () {
    document.querySelectorAll('.inputChords')
    .forEach(inputChordsCheck => inputChordsCheck.checked = false);
});



/* LOOP FUNCTION */
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

