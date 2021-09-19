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
        <label class="check"> <input id="muteSynth" type="checkbox"><span id="spanMuteSynth" class="font buttonAnim soloMuteSynth">Mute</span> </label> 
        <label class="check"> <input id="soloSynth" type="checkbox"><span id="spanSoloSynth" class="font buttonAnim soloMuteSynth">Solo</span> </label> 
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
const $rowsSynth = document.body.querySelectorAll("section#synth > div > div > div");                




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
$("#muteSynth").on("click", function() {
    synthVol.mute = !(synthVol.mute);

    if (synthVol.mute == false) {
        /* ABLE ALL SOLO BUTTONS */
        $("#soloSynth").prop("disabled", false);
        $("#soloDrums").prop("disabled", false);
        $("#soloBass").prop("disabled", false);
        $("#soloChords").prop("disabled", false);

        /* ADD CLASS TO ALL SOLO BUTTONS */
        $("#spanSoloSynth").addClass("buttonAnim");
        $("#spanSoloBass").addClass("buttonAnim");
        $("#spanSoloChords").addClass("buttonAnim");
        $("#spanSoloDrums").addClass("buttonAnim");
    }

    else if (synthVol.mute == true) {
        /* DISABLE ALL SOLO BUTTONS */
        $("#soloSynth").prop("disabled", true);
        $("#soloDrums").prop("disabled", true);
        $("#soloBass").prop("disabled", true);
        $("#soloChords").prop("disabled", true);

        /* REMOVE CLASS TO ALL SOLO BUTTONS */
        $("#spanSoloSynth").removeClass("buttonAnim");
        $("#spanSoloBass").removeClass("buttonAnim");
        $("#spanSoloChords").removeClass("buttonAnim");
        $("#spanSoloDrums").removeClass("buttonAnim");
    }   
});


/* BUTTON SOLO */
let boolSoloSynth = false;

$("#soloSynth").on("click", function() {

    boolSoloSynth = !boolSoloSynth;


    if (boolSoloSynth == false) {
        /* DISABLE DRUMS, BASS AND CHORD SOLO BUTTONS */
        $("#soloDrums").prop("disabled", false);
        $("#soloBass").prop("disabled", false);
        $("#soloChords").prop("disabled", false);

        /* DISABLE ALL MUTE BOTONS */
        $("#muteDrums").prop("disabled", false);
        $("#muteBass").prop("disabled", false);
        $("#muteChords").prop("disabled", false);
        $("#muteSynth").prop("disabled", false);

        /* UNCHECK DRUMS, BASS AND CHORDS BUTTONS */
        $("#muteDrums").prop("checked", false);
        $("#muteBass").prop("checked", false);
        $("#muteChords").prop("checked", false);

        /* ADD CLASS TO ALL SOLO BOTONS */
        $("#spanSoloSynth").addClass("buttonAnim");
        $("#spanSoloBass").addClass("buttonAnim");
        $("#spanSoloChords").addClass("buttonAnim");
        $("#spanSoloDrums").addClass("buttonAnim");

        /* ADD CLASS TO SYNTH MUTE BUTTON */
        $("#spanMuteSynth").addClass("buttonAnim");

        /* CHANGE DRUMS, BASS AND CHORDS MUTE BUTTON VALUE */
        bassVol.mute = !(bassVol.mute);
        drumsVol.mute = !(drumsVol.mute);
        chordsVol.mute = !(chordsVol.mute);
    }

    else if (boolSoloSynth == true) {
        /* ABLE DRUMS, BASS AND CHORD SOLO BUTTONS */
        $("#soloDrums").prop("disabled", true);
        $("#soloBass").prop("disabled", true);
        $("#soloChords").prop("disabled", true);

        /* ABLE ALL MUTE BOTONS */
        $("#muteDrums").prop("disabled", true);
        $("#muteBass").prop("disabled", true);
        $("#muteChords").prop("disabled", true);
        $("#muteSynth").prop("disabled", true);

        /* CHECK DRUMS, BASS AND CHORDS BUTTONS */
        $("#muteDrums").prop("checked", true);
        $("#muteBass").prop("checked", true);
        $("#muteChords").prop("checked", true);

        /* REMOVE CLASS TO ALL SOLO BOTONS */
        $("#spanSoloSynth").removeClass("buttonAnim");
        $("#spanSoloBass").removeClass("buttonAnim");
        $("#spanSoloChords").removeClass("buttonAnim");
        $("#spanSoloDrums").removeClass("buttonAnim");
        
        /* REMOVE CLASS TO SYNTH MUTE BUTTON */
        $("#spanMuteSynth").removeClass("buttonAnim");

        /* CHANGE DRUMS, BASS AND CHORDS MUTE BUTTON VALUE */
        bassVol.mute = !(bassVol.mute);
        drumsVol.mute = !(drumsVol.mute);
        chordsVol.mute = !(chordsVol.mute);
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



/* LOOP FUNCTION - ALL INSTRUMENTS CURRENT INPUT MARKED*/
let indexSynth = 0;

function repeatSynth(time) {
    let stepSynth = indexSynth % 32;
    for (let i = 0; i < $rowsSynth.length; i++) {
        let synth = synths[i],
            noteSynth = notesSynth[i],
            $row = $rowsSynth[i],
            $input = $row.querySelector(`input:nth-child(${stepSynth + 1})`);
            $(`input[type=checkbox]:nth-child(${stepSynth + 1})`).addClass("snow");
            $(`input[type=checkbox]:nth-child(${stepSynth})`).removeClass("snow");
            $(`input[type=checkbox]:nth-child(${stepSynth + 32})`).removeClass("snow");
        if ($input.checked) synth.triggerAttackRelease(noteSynth, '8n', time);
    }
    indexSynth++;
}
