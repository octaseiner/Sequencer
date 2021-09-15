/* SYNTH */

/* PARAMETERS */
$("#synthParameters").prepend(`  
    <div>
        <label for="volSynth">Vol.</label>
        <input name="volSynth"class="slider sliderSynth" id="volSynth" type="range" min="-40" max="6" value="-6" step="1">
        <span id="volSynthVal">-6</span>
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
    <div class="parInstButtons">
        <input type="submit" class="botonSynth buttonAnim" name="envio" value="Apply" id="enviarParSynth">
        <button id="muteSynth" class="botonSynth buttonAnim" data-playing="false">Mute</button>
        <button id="soloSynth" class="botonSynth buttonAnim" data-playing="false">Solo</button>
        <button id="botonClearSynth" class="botonSynth buttonAnim" data-playing="false">Clear</button>
    </div>
`);


/* SHOW PARAMETERS */

const toogleSynth = document.querySelector('#toogleSynth');
let boolToogleSynth = false;


$("#toogleSynth").on("click", function () {
    $("#synthParameters").toggle("fast");
    boolToogleSynth = !boolToogleSynth;

    if (boolToogleSynth == true) {
        toogleSynth.innerText = "▲";
    }

    else if (boolToogleSynth == false) {
        toogleSynth.innerText = "▼";
    }   
})





/* INPUT SYNTH CHECK */
const checkSynth = document.querySelector('#checkSynth');
let boolCheckSynth = true;

$("#checkSynth").on("click", () => {
    boolCheckSynth = !boolCheckSynth;

    if (boolCheckSynth == false) {
        $("#checkSynth").attr("checked","checked");
        $("#synth").hide("fast");
    }

    else if (boolCheckSynth == true) {
        $("#checkSynth").removeAttr("checked");
        $("#synth").show("fast");
    }   
});





/* CREATE SYNTH ARRAY WITH 8 NOTES */
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

//* ASSIGN NOTE SOUND */
synths[0].oscillator.type = 'square';
synths[1].oscillator.type = 'square';
synths[2].oscillator.type = 'square';
synths[3].oscillator.type = 'square';
synths[4].oscillator.type = 'square';
synths[5].oscillator.type = 'square';
synths[6].oscillator.type = 'square';
synths[7].oscillator.type = 'square';


/*  CALL LOOP FUCTION - NOTE DURATION */
Tone.Transport.scheduleRepeat(repeatSynth,'16n');

/* GET ALL SYNTH INPUTS - ASSIGN INPUTS NOTES */
const $rowsSynth = document.body.querySelectorAll("section#synth > div > div > div"),
    notesSynth = ['C5', 'B4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C4'];
                
let indexSynth = 0;



/* VOLUME */
/* CREATE VOLUME AND CONNECT TO GAIN */
let volSynth = -6;
let synthVol = new Tone.Volume(-6).connect(gain);

const volSynthControl = document.querySelector('#volSynth');
const gainSynthValor = document.querySelector('#volSynthVal');

    /* VOLUME VISUAL */
volSynthControl.addEventListener('input', function(e) {
    volSynth = Number(e.target.value);
    gainSynthValor.innerText = volSynth;
}, false);

/* BUTTON MUTE */
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


/* BUTTON SOLO */
const soloSynth = document.querySelector('#soloSynth');
let boolSoloSynth = false;

$("#soloSynth").on("click", function() {

    boolSoloSynth = !boolSoloSynth;


    if (boolSoloSynth == false) {
        soloSynth.innerText = "Solo";
        muteBass.innerText = "Mute";
        muteDrums.innerText = "Mute";
        muteChords.innerText = "Mute";
        bassVol.mute = !(bassVol.mute);
        drumsVol.mute = !(drumsVol.mute);
        chordsVol.mute = !(chordsVol.mute);
    }

    else if (boolSoloSynth == true) {
        soloSynth.innerText = "All"
        muteBass.innerText = "Unmute";
        muteDrums.innerText = "Unmute";
        muteChords.innerText = "Unmute";
        bassVol.mute = !(bassVol.mute);
        drumsVol.mute = !(drumsVol.mute);
        chordsVol.mute = !(chordsVol.mute);
    }   

    if (synthVol.mute == true) {
        synthVol.mute = !(synthVol.mute)
        muteSynth.innerText = "Mute";
    }
});





/* REVERB */
/* CREATE REVERB AND CONNECT TO VOLUME */
let revSynth = 0;
let synthRev = new Tone.Reverb(5).connect(synthVol);
synthRev.wet.value = 0;

const revSynthControl = document.querySelector('#revSynth');
const revSynthValor = document.querySelector('#revSynthVal');

    /* REVERB VISUAL */
revSynthControl.addEventListener('input', function(e) {
    revSynth = Number(e.target.value);
    revSynthValor.innerText = revSynth;
}, false);



/* DELAY */
/* CREATE DELAY AND CONNECT TO VOLUME */
let delaySynth = 0;
let synthDelay = new Tone.FeedbackDelay("8n", 0.5).connect(synthVol);
synthDelay.wet.value = 0;

const delaySynthControl = document.querySelector('#delaySynth');
const delaySynthValor = document.querySelector('#delaySynthVal');

    /* DELAY VISUAL */
delaySynthControl.addEventListener('input', function(e) {
    delaySynth = Number(e.target.value);
    delaySynthValor.innerText = delaySynth;
}, false);




/*  CONNECT SYNTH TO DELAY AND REVERB */
synths.forEach(synth => synth.chain(synthDelay, synthRev));



/* APPLY PARAMETROS */
$("#enviarParSynth").on("click", function (e) {
    e.preventDefault();

    /* VOLUME */
    volSynth = document.querySelector("#volSynth").value;
    synthVol.volume.value = volSynth;

    /* REVERB */
    revSynth = document.querySelector("#revSynth").value;
    synthRev.wet.value = revSynth;

    /* DELAY */
    delaySynth = document.querySelector("#delaySynth").value;
    synthDelay.wet.value = delaySynth;
});



/* BUTTON CLEAR */
$("#botonClearSynth").on('click', function () {
    document.querySelectorAll('.inputSynth')
    .forEach(inputSynthCheck => inputSynthCheck.checked = false);
});



/* LOOP FUNCTION */
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
