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
        <label class="check"> <input id="muteChords" type="checkbox"><span id="spanMuteChords" class="font buttonAnim soloMuteChords">Mute</span> </label> 
        <label class="check"> <input id="soloChords" type="checkbox"><span id="spanSoloChords" class="font buttonAnim soloMuteChords">Solo</span> </label> 
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
const $rowsChords = document.body.querySelectorAll('section#chords > div > div > div');





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
$("#muteChords").on("click", function() {
    chordsVol.mute = !(chordsVol.mute);

    if (chordsVol.mute == false) {
        /* ABLE ALL SOLO BUTTONS */
        $("#soloChords").prop("disabled", false);
        $("#soloDrums").prop("disabled", false);
        $("#soloSynth").prop("disabled", false);
        $("#soloBass").prop("disabled", false);

        /* ADD CLASS TO ALL SOLO BUTTONS */
        $("#spanSoloSynth").addClass("buttonAnim");
        $("#spanSoloBass").addClass("buttonAnim");
        $("#spanSoloChords").addClass("buttonAnim");
        $("#spanSoloDrums").addClass("buttonAnim");
    }

    else if (chordsVol.mute == true) {
        /* DISABLE ALL SOLO BUTTONS */
        $("#soloChords").prop("disabled", true);
        $("#soloDrums").prop("disabled", true);
        $("#soloSynth").prop("disabled", true);
        $("#soloBass").prop("disabled", true);

        /* REMOVE CLASS TO ALL SOLO BUTTONS */
        $("#spanSoloSynth").removeClass("buttonAnim");
        $("#spanSoloBass").removeClass("buttonAnim");
        $("#spanSoloChords").removeClass("buttonAnim");
        $("#spanSoloDrums").removeClass("buttonAnim");    
    }   
});


/* BUTTON SOLO */
let boolSoloChords = false;

$("#soloChords").on("click", function() {

    boolSoloChords = !boolSoloChords;


    if (boolSoloChords == false) {
        /* DISABLE DRUMS, SYNTH AND BASS SOLO BUTTONS */
        $("#soloDrums").prop("disabled", false);
        $("#soloSynth").prop("disabled", false);
        $("#soloBass").prop("disabled", false);

        /* DISABLE ALL MUTE BOTONS */
        $("#muteDrums").prop("disabled", false);
        $("#muteBass").prop("disabled", false);
        $("#muteChords").prop("disabled", false);
        $("#muteSynth").prop("disabled", false);
        
        /* UNCHECK DRUMS, SYNTH AND BASS BUTTONS */
        $("#muteDrums").prop("checked", false);
        $("#muteSynth").prop("checked", false);
        $("#muteBass").prop("checked", false);

        /* ADD CLASS TO ALL SOLO BOTONS */
        $("#spanSoloSynth").addClass("buttonAnim");
        $("#spanSoloBass").addClass("buttonAnim");
        $("#spanSoloChords").addClass("buttonAnim");
        $("#spanSoloDrums").addClass("buttonAnim");
        
        /* ADD CLASS TO CHORD MUTE BUTTON */
        $("#spanMuteChords").addClass("buttonAnim");

        /* CHANGE DRUMS, SYNTH AND BASS MUTE BUTTON VALUE */
        bassVol.mute = !(bassVol.mute);
        drumsVol.mute = !(drumsVol.mute);
        synthVol.mute = !(synthVol.mute);
    }

    else if (boolSoloChords == true) {
        /* ABLE DRUMS, SYNTH AND BASS SOLO BUTTONS */
        $("#soloDrums").prop("disabled", true);
        $("#soloSynth").prop("disabled", true);
        $("#soloBass").prop("disabled", true);

        /* ABLE ALL MUTE BOTONS */
        $("#muteDrums").prop("disabled", true);
        $("#muteBass").prop("disabled", true);
        $("#muteChords").prop("disabled", true);
        $("#muteSynth").prop("disabled", true);

        /* CHECK DRUMS, SYNTH AND BASS BUTTONS */
        $("#muteDrums").prop("checked", true);
        $("#muteSynth").prop("checked", true);
        $("#muteBass").prop("checked", true);

        /* REMOVE CLASS TO ALL SOLO BOTONS */
        $("#spanSoloSynth").removeClass("buttonAnim");
        $("#spanSoloBass").removeClass("buttonAnim");
        $("#spanSoloChords").removeClass("buttonAnim");
        $("#spanSoloDrums").removeClass("buttonAnim");

        /* REMOVE CLASS TO CHORD MUTE BUTTON */
        $("#spanMuteChords").removeClass("buttonAnim");

        /* CHANGE DRUMS, SYNTH AND BASS MUTE BUTTON VALUE */
        bassVol.mute = !(bassVol.mute);
        drumsVol.mute = !(drumsVol.mute);
        synthVol.mute = !(synthVol.mute);
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
let indexChords = 0;

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

