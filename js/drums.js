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
    <button id="muteDrums" class="botonDrums buttonAnim" data-playing="false">Mute</button>
    <button id="soloDrums" class="botonDrums buttonAnim" data-playing="false">Solo</button>
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
let indexDrums = 0;



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

/* BUTTON SOLO */
const soloDrums = document.querySelector('#soloDrums');
let boolSoloDrums = false;

$("#soloDrums").on("click", function() {

    boolSoloDrums = !boolSoloDrums;


    if (boolSoloDrums == false) {
        soloDrums.innerText = "Solo";
        muteBass.innerText = "Mute";
        muteSynth.innerText = "Mute";
        muteChords.innerText = "Mute";
        bassVol.mute = !(bassVol.mute);
        synthVol.mute = !(synthVol.mute);
        chordsVol.mute = !(chordsVol.mute);
    }

    else if (boolSoloDrums == true) {
        soloDrums.innerText = "All"
        muteBass.innerText = "Unmute";
        muteSynth.innerText = "Unmute";
        muteChords.innerText = "Unmute";
        bassVol.mute = !(bassVol.mute);
        synthVol.mute = !(synthVol.mute);
        chordsVol.mute = !(chordsVol.mute);
    }   

    if (drumsVol.mute == true) {
        drumsVol.mute = !(drumsVol.mute)
        muteDrums.innerText = "Mute";
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





let now = Tone.now();

/* LOOP FUNCTION */
function repeatDrums(time) {
let stepDrums = indexDrums % 32;
    for (let i = 0; i < $rowsDrums.length; i++) {
        let drum = drums[i],
            $row = $rowsDrums[i],
            $input = $row.querySelector(`input:nth-child(${stepDrums + 1})`);
        if ($input.checked) {
            $(stepDrums + 1).css({"border":"2px snow solid"})
            drum.start(time) 
            // $(".inputDrums").toggleClass('changed');
        }
    }

    indexDrums++;
    drums.autostart = true;
} 





