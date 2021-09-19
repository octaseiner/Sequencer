/* METRONOME - BPM */
let tempo = 120;

const bpmControl = document.querySelector('#bpm');
const bpmValor = document.querySelector('#bpmval');

    /* VISUAL BPM */
bpmControl.addEventListener('input', function(e) {
    tempo = Number(e.target.value);
    bpmValor.innerText = tempo;
}, false);



/* GAIN */
/* CREATE GAIN AND CONNECT TO DESTINATION */
let ganancia;
let gain = new Tone.Gain(0.5).toDestination();

const gainControl = document.querySelector('#gain');
const gainValor = document.querySelector('#gainval');

    /* GAIN VISUAL */
gainControl.addEventListener('input', function(e) {
    ganancia = Number(e.target.value);
    gainValor.innerText = ganancia;
}, false);



/* APPLY PARAMETERS */
$("#enviarPar").on("click", cambioPar);
    
function cambioPar(e) {
    e.preventDefault();
    
    /* BPM */
    tempo = document.querySelector("#bpm").value;
    Tone.Transport.bpm.value = tempo;

    /* GAIN */
    ganancia = parseFloat(document.querySelector("#gain").value);
    gain.gain.rampTo(ganancia);
}






