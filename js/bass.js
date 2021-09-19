/* BASS */

/* PARAMETERS */
$("#bassParameters").prepend(`                                                    
    <div>
        <label for="volBass">Vol.</label>
        <input name="volBass" class="slider sliderBass" id="volBass" type="range" min="-40" max="6" value="-6" step="1">
        <span id="volBassVal">-6</span>
    </div>
    <div>
        <label for="revBass">Reverb</label>
        <input name="revBass"class="slider sliderBass" id="revBass" type="range" min="0" max="1" value="0" step="0.1">
        <span id="revBassVal">0</span>
    </div>
    <div>
        <label for="delayBass">Delay</label>
        <input name="delayBass"class="slider sliderBass" id="delayBass" type="range" min="0" max="1" value="0" step="0.1">
        <span id="delayBassVal">0</span>
    </div>
    <div class="parInstButtons">
        <label class="check"> <input id="muteBass" type="checkbox"><span id="spanMuteBass" class="font buttonAnim soloMuteBass">Mute</span> </label> 
        <label class="check"> <input id="soloBass" type="checkbox"><span id="spanSoloBass" class="font buttonAnim soloMuteBass">Solo</span> </label> 
        <button id="botonClearBass" class="botonBass buttonAnim" data-playing="false">Clear</button>
    </div>
`);


/* SHOW PARAMETERS */

const toogleBass = document.querySelector('#toogleBass');
let boolToogleBass = false;


$("#toogleBass").on("click", function () {
    $("#bassParameters").toggle("fast");
    boolToogleBass = !boolToogleBass;

    if (boolToogleBass == true) {
        toogleBass.innerText = "▲";
    }

    else if (boolToogleBass == false) {
        toogleBass.innerText = "▼";
    }   
})



/* INPUT BASS CHECK */
const checkBass = document.querySelector('#checkBass');
let boolCheckBass = true;

$("#checkBass").on("click", () => {
    boolCheckBass = !boolCheckBass;

    if (boolCheckBass == false) {
        $("#checkBass").attr("checked","checked");
        $("#bass").hide("fast");
    }

    else if (boolCheckBass == true) {
        $("#checkBass").removeAttr("checked");
        $("#bass").show("fast");
    }   
});





/* CREATE BASS ARRAY WITH 8 NOTES */
const bajos = [
    new Tone.MonoSynth(),
    new Tone.MonoSynth(),
    new Tone.MonoSynth(),
    new Tone.MonoSynth(),
    new Tone.MonoSynth(),
    new Tone.MonoSynth(),
    new Tone.MonoSynth(),
    new Tone.MonoSynth()
];

/* ASSIGN NOTE SOUND */
bajos[0].oscillator.type = 'sine';
bajos[1].oscillator.type = 'sine';
bajos[2].oscillator.type = 'sine';
bajos[3].oscillator.type = 'sine';
bajos[4].oscillator.type = 'sine';
bajos[5].oscillator.type = 'sine';
bajos[6].oscillator.type = 'sine';
bajos[7].oscillator.type = 'sine';

/*  CALL LOOP FUCTION - NOTE DURATION */
Tone.Transport.scheduleRepeat(repeatBass,'16n');

/* GET ALL BASS INPUTS - ASSIGN INPUTS NOTES */
const $rowsBass = document.body.querySelectorAll('section#bass > div > div > div');




/* VOLUME */
/* CREATE VOLUME AND CONNECT TO GAIN */
let volBass = -6;
let bassVol = new Tone.Volume(-6).connect(gain);

const volBassControl = document.querySelector('#volBass');
const gainBassValor = document.querySelector('#volBassVal');

    /* VOLUME VISUAL */
volBassControl.addEventListener('input', function(e) {
    volBass = Number(e.target.value);
    gainBassValor.innerText = volBass;
}, false);

/* BUTTON MUTE */
$("#muteBass").on("click", function() {

    bassVol.mute = !(bassVol.mute);

    if (bassVol.mute == false) {
        /* ABLE ALL SOLO BUTTONS */
        $("#soloBass").prop("disabled", false);
        $("#soloDrums").prop("disabled", false);
        $("#soloSynth").prop("disabled", false);
        $("#soloChords").prop("disabled", false);

        /* ADD CLASS TO ALL SOLO BUTTONS */
        $("#spanSoloSynth").addClass("buttonAnim");
        $("#spanSoloBass").addClass("buttonAnim");
        $("#spanSoloChords").addClass("buttonAnim");
        $("#spanSoloDrums").addClass("buttonAnim");
    }

    else if (bassVol.mute == true) {
        /* DISABLE ALL SOLO BUTTONS */
        $("#soloBass").prop("disabled", true);
        $("#soloDrums").prop("disabled", true);
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
let boolSoloBass = false;

$("#soloBass").on("click", function() {

    boolSoloBass = !boolSoloBass;


    if (boolSoloBass == false) {
        /* DISABLE DRUMS, SYNTH AND CHORD SOLO BUTTONS */
        $("#soloDrums").prop("disabled", false);
        $("#soloSynth").prop("disabled", false);
        $("#soloChords").prop("disabled", false);

        /* DISABLE ALL MUTE BOTONS */
        $("#muteDrums").prop("disabled", false);
        $("#muteBass").prop("disabled", false);
        $("#muteChords").prop("disabled", false);
        $("#muteSynth").prop("disabled", false);

        /* UNCHECK DRUMS, SYNTH AND CHORDS BUTTONS */
        $("#muteDrums").prop("checked", false);
        $("#muteSynth").prop("checked", false);
        $("#muteChords").prop("checked", false);

        /* ADD CLASS TO ALL SOLO BOTONS */
        $("#spanSoloSynth").addClass("buttonAnim");
        $("#spanSoloBass").addClass("buttonAnim");
        $("#spanSoloChords").addClass("buttonAnim");
        $("#spanSoloDrums").addClass("buttonAnim");

        /* ADD CLASS TO BASS MUTE BUTTON */
        $("#spanMuteBass").addClass("buttonAnim");

        /* CHANGE DRUMS, SYNTH AND CHORDS MUTE BUTTON VALUE */
        drumsVol.mute = !(drumsVol.mute);
        synthVol.mute = !(synthVol.mute);
        chordsVol.mute = !(chordsVol.mute);
    }

    else if (boolSoloBass == true) {
        /* ABLE DRUMS, SYNTH AND CHORD SOLO BUTTONS */
        $("#soloDrums").prop("disabled", true);
        $("#soloSynth").prop("disabled", true);
        $("#soloChords").prop("disabled", true);

        /* ABLE ALL MUTE BOTONS */
        $("#muteDrums").prop("disabled", true);
        $("#muteBass").prop("disabled", true);
        $("#muteChords").prop("disabled", true);
        $("#muteSynth").prop("disabled", true);

        /* CHECK DRUMS, SYNTH AND CHORDS BUTTONS */
        $("#muteDrums").prop("checked", true);
        $("#muteSynth").prop("checked", true);
        $("#muteChords").prop("checked", true);

        /* REMOVE CLASS TO ALL SOLO BOTONS */
        $("#spanSoloSynth").removeClass("buttonAnim");
        $("#spanSoloBass").removeClass("buttonAnim");
        $("#spanSoloChords").removeClass("buttonAnim");
        $("#spanSoloDrums").removeClass("buttonAnim");

        /* REMOVE CLASS TO BASS MUTE BUTTON */
        $("#spanMuteBass").removeClass("buttonAnim");
        
        /* CHANGE DRUMS, SYNTH AND CHORDS MUTE BUTTON VALUE */
        drumsVol.mute = !(drumsVol.mute);
        synthVol.mute = !(synthVol.mute);
        chordsVol.mute = !(chordsVol.mute);
    }   
});





/* REVERB */
/* CREATE REVERB AND CONNECT TO VOLUME */
let revBass = 0;
let bassRev = new Tone.Reverb(5).connect(bassVol);
bassRev.wet.value = 0;

const revBassControl = document.querySelector('#revBass');
const revBassValor = document.querySelector('#revBassVal');

    /* REVERB VISUAL */
revBassControl.addEventListener('input', function(e) {
    revBass = Number(e.target.value);
    revBassValor.innerText = revBass;
}, false);



/* DELAY */
/* CREATE DELAY AND CONNECT TO VOLUME */
let delayBass = 0;
let bassDelay = new Tone.FeedbackDelay("8n", 0.5).connect(bassVol);
bassDelay.wet.value = 0;

const delayBassControl = document.querySelector('#delayBass');
const delayBassValor = document.querySelector('#delayBassVal');

    /* DELAY VISUAL  */
delayBassControl.addEventListener('input', function(e) {
    delayBass = Number(e.target.value);
    delayBassValor.innerText = delayBass;
}, false);



/*  CONNECT BASS TO DELAY AND REVERB */
bajos.forEach(bajo => bajo.chain(bassDelay, bassRev));



/* APPLY PARAMETROS */
$("#enviarParBass").on("click", function (e) {
    e.preventDefault();

    /* VOLUME */
    volBass = document.querySelector("#volBass").value;
    bassVol.volume.value = volBass;

    /* REVERB */
    revBass = document.querySelector("#revBass").value;
    bassRev.wet.value = revBass;

    /* DELAY */
    delayBass = document.querySelector("#delayBass").value;
    bassDelay.wet.value = delayBass;
});   



/* BUTTON CLEAR */
$("#botonClearBass").on('click', function () {
    document.querySelectorAll('.inputBass')
    .forEach(inputBassCheck => inputBassCheck.checked = false);
});



/* LOOP FUNCTION */
let indexBass = 0;

function repeatBass(time) {
let stepBass = indexBass % 32;
    for (let i = 0; i < $rowsBass.length; i++) {
        let bajo = bajos[i],
            noteBass = notesBass[i],
            $row = $rowsBass[i],
            $input = $row.querySelector(`input:nth-child(${stepBass + 1})`);
        if ($input.checked) bajo.triggerAttackRelease(noteBass, '16n', time);
    }
    indexBass++;
} 


