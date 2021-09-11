/* BASS */

/* CREO ARRAY DEL BAJO CON 8 NOTAS */
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

/* ASIGNO QUE TIPO DE SONIDO QUIERO QUE TENGA CADA NOTA */
bajos[0].oscillator.type = 'sine';
bajos[1].oscillator.type = 'sine';
bajos[2].oscillator.type = 'sine';
bajos[3].oscillator.type = 'sine';
bajos[4].oscillator.type = 'sine';
bajos[5].oscillator.type = 'sine';
bajos[6].oscillator.type = 'sine';
bajos[7].oscillator.type = 'sine';

/*  CUANTO QUIERO QUE DURE CADA NOTA */
Tone.Transport.scheduleRepeat(repeatBass,'8n');

/* ASIGNO NOTAS A LOS INPUTS = ARRAY */
const $rowsBass = document.body.querySelectorAll('section#bass > div > div > div'),
    notesBass = ['C2', 'D2', 'E2','F2', 'G2', 'A2','B2', 'C3'];
let indexBass = 0;




/* VOLUMEN */
/* CREO VOLUMEN Y LO CONECTO AL GAIN */
let volBass = 1;
let bassVol = new Tone.Volume(1).connect(gain);

const volBassControl = document.querySelector('#volBass');
const gainBassValor = document.querySelector('#volBassVal');

    /* VISUAL VOLUMEN */
volBassControl.addEventListener('input', function(e) {
    volBass = Number(e.target.value);
    gainBassValor.innerText = volBass;
}, false);

/* BOTON MUTE */
const muteBass = document.querySelector('#muteBass')
$("#muteBass").on("click", function() {
    bassVol.mute = !(bassVol.mute);

    if (bassVol.mute == false) {
        muteBass.innerText = "Mute";
    }

    else if (bassVol.mute == true) {
        muteBass.innerText = "Unmute";
    }   
});


/* REVERB */
/* CREO REVERB Y LA CONECTO AL VOLUMEN */
let revBass = 0;
let bassRev = new Tone.Reverb(5).connect(bassVol);
bassRev.wet.value = 0;

const revBassControl = document.querySelector('#revBass');
const revBassValor = document.querySelector('#revBassVal');

    /* VISUAL REVERB */
revBassControl.addEventListener('input', function(e) {
    revBass = Number(e.target.value);
    revBassValor.innerText = revBass;
}, false);



/* DELAY */
/* CREO DELAY Y LA CONECTO AL VOLUMEN */
let delayBass = 0;
let bassDelay = new Tone.FeedbackDelay("8n", 0.5).connect(bassVol);
bassDelay.wet.value = 0;

const delayBassControl = document.querySelector('#delayBass');
const delayBassValor = document.querySelector('#delayBassVal');

    /* VISUAL DELAY */
delayBassControl.addEventListener('input', function(e) {
    delayBass = Number(e.target.value);
    delayBassValor.innerText = delayBass;
}, false);



/*  CONECTO EL SINTE A DELAY Y REVERB */
bajos.forEach(bajo => bajo.chain(bassDelay, bassRev));



/* ESTABLECE PARAMETROS */
$("#enviarParBass").on("click", function (e) {
    e.preventDefault();

    /* VOLUMEN */
    volBass = document.querySelector("#volBass").value;
    bassVol.volume.value = volBass;

    /* REVERB */
    revBass = document.querySelector("#revBass").value;
    bassRev.wet.value = revBass;

    /* DELAY */
    delayBass = document.querySelector("#delayBass").value;
    bassDelay.wet.value = delayBass;
});   



/* BOTON CLEAR */
$("#botonClearBass").on('click', function () {
    document.querySelectorAll('.inputBass')
    .forEach(inputBassCheck => inputBassCheck.checked = false);
});



/* FUNCION DEL LOOP */
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


