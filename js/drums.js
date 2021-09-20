/* DRUMS */

/* PARAMETERS */
$("#drumsParameters").prepend(`                            
<div>
    <label for="volDrums">Vol.</label>
    <input name="volDrums" class="slider sliderDrums" id="volDrums" type="range" min="-40" max="6" value="-6" step="1">
    <span id="volDrumsVal">-6</span>
</div>
<div>
    <label for="revDrums">Reverb</label>
    <input name="revDrums"class="slider sliderDrums" id="revDrums" type="range" min="0" max="1" value="0" step="0.1">
    <span id="revDrumsVal">0</span>
</div>
<div>
    <label for="delayDrums">Delay</label>
    <input name="delayDrums"class="slider sliderDrums" id="delayDrums" type="range" min="0" max="1" value="0" step="0.1">
    <span id="delayDrumsVal">0</span>
</div>
<div class="parInstButtons">
    <label class="check"> <input id="muteDrums" type="checkbox"><span id="spanMuteDrums" class="font buttonAnim soloMuteDrums">Mute</span> </label> 
    <label class="check"> <input id="soloDrums" type="checkbox"><span id="spanSoloDrums" class="font buttonAnim soloMuteDrums">Solo</span> </label> 
    <button id="botonClearDrums" class="botonDrums buttonAnim" data-playing="false">Clear</button>
</div>
`);


/* SHOW PARAMETERS */
const toogleDrums = document.querySelector('#toogleDrums');
let boolToogleDrums = false;


$("#toogleDrums").on("click", function () {
    $("#drumsParameters").toggle("fast");
    boolToogleDrums = !boolToogleDrums;

    if (boolToogleDrums == true) {
        toogleDrums.innerText = "▲";
    }

    else if (boolToogleDrums == false) {
        toogleDrums.innerText = "▼";
    }   
})




/* INPUT DRUM CHECK */
const checkDrums = document.querySelector('#checkDrums');
let boolCheckDrums = true;

$("#checkDrums").on("click", () => {
    boolCheckDrums = !boolCheckDrums;

    if (boolCheckDrums == false) {
        $("#checkDrums").attr("checked","checked");
        $("#drums").hide("fast");
    }

    else if (boolCheckDrums == true) {
        $("#checkDrums").removeAttr("checked");
        $("#drums").show("fast");
    }   
});





/* CREATE DRUMS ARRAY AND ASSIGN SOUNDS */
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




/*  CALL LOOP FUCTION - NOTE DURATION */
Tone.Transport.scheduleRepeat(repeatDrums,'16n');

/* GET ALL DRUMS INPUTS */
const $rowsDrums = document.body.querySelectorAll('section#drums > div > div > div');




/* VOLUME */
/* CREATE VOLUME AND CONNECT TO GAIN */
let volDrums = -6;
let drumsVol = new Tone.Volume(-6).connect(gain);

const volDrumsControl = document.querySelector('#volDrums');
const gainDrumsValor = document.querySelector('#volDrumsVal');

    /* VOLUME VISUAL */
volDrumsControl.addEventListener('input', function(e) {
    volDrums = Number(e.target.value);
    gainDrumsValor.innerText = volDrums;
}, false);



/* BUTTON MUTE */
$("#muteDrums").on("click", function() {
    drumsVol.mute = !(drumsVol.mute);

    if (drumsVol.mute == false) {
        /* ABLE ALL SOLO BUTTONS */
        $("#soloDrums").prop("disabled", false);
        $("#soloBass").prop("disabled", false);
        $("#soloSynth").prop("disabled", false);
        $("#soloChords").prop("disabled", false);

        /* ADD CLASS TO ALL SOLO BUTTONS */
        $("#spanSoloSynth").addClass("buttonAnim");
        $("#spanSoloBass").addClass("buttonAnim");
        $("#spanSoloChords").addClass("buttonAnim");
        $("#spanSoloDrums").addClass("buttonAnim");
    }

    else if (drumsVol.mute == true) {
        /* DISABLE ALL SOLO BUTTONS */
        $("#soloDrums").prop("disabled", true);
        $("#soloBass").prop("disabled", true);
        $("#soloSynth").prop("disabled", true);
        $("#soloChords").prop("disabled", true);

        /* REMOVE CLASS TO ALL SOLO BUTTONS */
        $("#spanSoloSynth").removeClass("buttonAnim");
        $("#spanSoloBass").removeClass("buttonAnim");
        $("#spanSoloChords").removeClass("buttonAnim");
        $("#spanSoloDrums").removeClass("buttonAnim");
    }   
});



/* BUTTON SOLO */
let boolSoloDrums = false;

$("#soloDrums").on("click", function() {

    boolSoloDrums = !boolSoloDrums;


    if (boolSoloDrums == false) {
        /* DISABLE BASS, SYNTH AND CHORD SOLO BUTTONS */
        $("#soloBass").prop("disabled", false);
        $("#soloSynth").prop("disabled", false);
        $("#soloChords").prop("disabled", false);

        /* DISABLE ALL MUTE BOTONS */
        $("#muteDrums").prop("disabled", false);
        $("#muteBass").prop("disabled", false);
        $("#muteChords").prop("disabled", false);
        $("#muteSynth").prop("disabled", false);

        /* UNCHECK BASS, SYNTH AND CHORDS BUTTONS */
        $("#muteBass").prop("checked", false);
        $("#muteSynth").prop("checked", false);
        $("#muteChords").prop("checked", false);

        /* ADD CLASS TO ALL SOLO BOTONS */
        $("#spanSoloSynth").addClass("buttonAnim");
        $("#spanSoloBass").addClass("buttonAnim");
        $("#spanSoloChords").addClass("buttonAnim");
        $("#spanSoloDrums").addClass("buttonAnim");
    
        /* ADD CLASS TO DRUMS MUTE BUTTON */
        $("#spanMuteDrums").addClass("buttonAnim");

        /* CHANGE BASS, SYNTH AND CHORDS MUTE BUTTON VALUE */
        bassVol.mute = !(bassVol.mute);
        synthVol.mute = !(synthVol.mute);
        chordsVol.mute = !(chordsVol.mute);
    }

    else if (boolSoloDrums == true) {
        /* ABLE BASS, SYNTH AND CHORD SOLO BUTTONS */
        $("#soloBass").prop("disabled", true);
        $("#soloSynth").prop("disabled", true);
        $("#soloChords").prop("disabled", true);

        /* ABLE ALL MUTE BOTONS */
        $("#muteDrums").prop("disabled", true);
        $("#muteBass").prop("disabled", true);
        $("#muteChords").prop("disabled", true);
        $("#muteSynth").prop("disabled", true);

        /* CHECK BASS, SYNTH AND CHORDS BUTTONS */
        $("#muteBass").prop("checked", true);
        $("#muteSynth").prop("checked", true);
        $("#muteChords").prop("checked", true);

        /* REMOVE CLASS TO ALL SOLO BOTONS */
        $("#spanSoloSynth").removeClass("buttonAnim");
        $("#spanSoloBass").removeClass("buttonAnim");
        $("#spanSoloChords").removeClass("buttonAnim");
        $("#spanSoloDrums").removeClass("buttonAnim");

        /* REMOVE CLASS TO DRUMS MUTE BUTTON */
        $("#spanMuteDrums").removeClass("buttonAnim");

        /* CHANGE DRUMS, SYNTH AND CHORDS MUTE BUTTON VALUE */
        bassVol.mute = !(bassVol.mute);
        synthVol.mute = !(synthVol.mute);
        chordsVol.mute = !(chordsVol.mute);
    }   
});






/* REVERB */
/* CREATE REVERB AND CONNECT TO VOLUME */
let revDrums = 0;
let drumsRev = new Tone.Reverb(5).connect(drumsVol);
drumsRev.wet.value = 0;

const revDrumsControl = document.querySelector('#revDrums');
const revDrumsValor = document.querySelector('#revDrumsVal');

    /* REVERB VISUAL */
revDrumsControl.addEventListener('input', function(e) {
    revDrums = Number(e.target.value);
    revDrumsValor.innerText = revDrums;
}, false);



/* DELAY */
/* CREATE DELAY AND CONNECT TO VOLUME */
let delayDrums = 0;
let drumsDelay = new Tone.FeedbackDelay("8n", 0.5).connect(drumsVol);
drumsDelay.wet.value = 0;

const delayDrumsControl = document.querySelector('#delayDrums');
const delayDrumsValor = document.querySelector('#delayDrumsVal');

    /* DELAY VISUAL */
delayDrumsControl.addEventListener('input', function(e) {
    delayDrums = Number(e.target.value);
    delayDrumsValor.innerText = delayDrums;
}, false);



/*  CONNECT DRUMS TO DELAY AND REVERB */
drums.forEach(drums => drums.chain(drumsDelay, drumsRev));




/* APPLY PARAMETROS */
$("#enviarParDrums").on("click", function (e) {
    e.preventDefault();

    /* VOLUME */
    volDrums = document.querySelector("#volDrums").value;
    drumsVol.volume.value = volDrums;

    /* REVERB */
    revDrums = document.querySelector("#revDrums").value;
    drumsRev.wet.value = revDrums;

    /* DELAY */
    delayDrums = document.querySelector("#delayDrums").value;
    drumsDelay.wet.value = delayDrums;
});



/* BUTTON CLEAR */
$("#botonClearDrums").on('click', function () {
    document.querySelectorAll('.inputDrums')
    .forEach(inputDrumsCheck => inputDrumsCheck.checked = false);
});





/* LOOP FUNCTION */
let indexDrums = 0;

function repeatDrums(time) {
let stepDrums = indexDrums % 32;
    for (let i = 0; i < $rowsDrums.length; i++) {
        let drum = drums[i],
            $row = $rowsDrums[i],
            $input = $row.querySelector(`input:nth-child(${stepDrums + 1})`);
        if ($input.checked) drum.start(time) 
    }
    indexDrums++;
} 





