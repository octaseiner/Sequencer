/* METRONOMO */
let tempo = 120;

const bpmControl = document.querySelector('#bpm');
const bpmValor = document.querySelector('#bpmval');

    /* VISUAL DEL BPM */
bpmControl.addEventListener('input', function(e) {
    tempo = Number(e.target.value);
    bpmValor.innerText = tempo;
}, false);



/* GANANCIA */
/* CREO GANANCIA Y LA CONECTO A DESTINATION  */
let ganancia;
let gain = new Tone.Gain(1).toDestination();

const gainControl = document.querySelector('#gain');
const gainValor = document.querySelector('#gainval');

    /* VISUAL GANANCIA */
gainControl.addEventListener('input', function(e) {
    ganancia = Number(e.target.value);
    gainValor.innerText = ganancia;
}, false);



    /* ESTABLECE PARAMETROS */
let botonPar = document.querySelector("#enviarPar");
botonPar.addEventListener("click", cambioPar);
    
function cambioPar(e) {
    e.preventDefault();
    
    /* TEMPO */
    tempo = document.querySelector("#bpm").value;
    Tone.Transport.bpm.value = tempo;

    /* GANANCIA */
    ganancia = parseFloat(document.querySelector("#gain").value);
    gain.gain.rampTo(ganancia);
}