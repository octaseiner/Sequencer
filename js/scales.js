/* SCALES BUTTONS */

let notesBass = ['C3', 'B2', 'A2', 'G2', 'F2', 'E2', 'D2', 'C2'];
let notesSynth = ['C5', 'B4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C4'];
let notesChords = [['C5','E5','G5'], ['B4','D5','F5'], ['A4','C5','E5'], ['G4','B4','D5'], ['F4','A4','C5'], ['E4','G4','B4'], ['D4','F4','A4'], ['C4','E4','G4']];

const eighthBass = document.querySelector("#eighthBass")
const seventhBass = document.querySelector("#seventhBass")
const sixthBass = document.querySelector("#sixthBass")
const fifthBass = document.querySelector("#fifthBass")
const fourthBass = document.querySelector("#fourthBass")
const thirdBass = document.querySelector("#thirdBass")
const secondBass = document.querySelector("#secondBass")
const firstBass = document.querySelector("#firstBass")

/* SYNTH */
const eighthSynth = document.querySelector("#eighthSynth") 
const seventhSynth = document.querySelector("#seventhSynth") 
const sixthSynth = document.querySelector("#sixthSynth") 
const fifthSynth = document.querySelector("#fifthSynth") 
const fourthSynth = document.querySelector("#fourthSynth") 
const thirdSynth = document.querySelector("#thirdSynth") 
const secondSynth = document.querySelector("#secondSynth") 
const firstSynth = document.querySelector("#firstSynth") 

/* CHORDS */
const eighthChords = document.querySelector("#eighthChords") 
const seventhChords = document.querySelector("#seventhChords") 
const sixthChords = document.querySelector("#sixthChords") 
const fifthChords = document.querySelector("#fifthChords") 
const fourthChord = document.querySelector("#fourthChord") 
const thirdChord = document.querySelector("#thirdChord") 
const secondChords = document.querySelector("#secondChords") 
const firstChords = document.querySelector("#firstChords") 

const URLJSON = "data/datos.json";




/* MAJOR */
$("#major").on("click", () => {  
    /* CURRENT SCALE BUTTON */
    $("#major").prop("disabled", true);
    $("#major").prop("checked", true);

    /* CONTRARY SCALE BUTTON */
    $("#minor").prop("checked", false);
    $("#minor").prop("disabled", false);

    /* NOTES */
    notesBass = ['C3', 'B2', 'A2', 'G2', 'F2', 'E2', 'D2', 'C2'];
    notesSynth = ['C5', 'B4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C4'];
    notesChords = [['C5','E5','G5'], ['B4','D5','F5'], ['A4','C5','E5'], ['G4','B4','D5'], ['F4','A4','C5'], ['E4','G4','B4'], ['D4','F4','A4'], ['C4','E4','G4']];

    /* NOTES TEXT */
    $.getJSON(URLJSON, function(data){

        /* BASS */
        eighthBass.innerText = data.eighthNoteMaj
        seventhBass.innerText = data.seventhNoteMaj
        sixthBass.innerText = data.sixthNoteMaj
        fifthBass.innerText = data.fifthNoteMaj
        fourthBass.innerText = data.fourthNoteMaj
        thirdBass.innerText = data.thirdNoteMaj
        secondBass.innerText = data.secondNoteMaj
        firstBass.innerText = data.firstNoteMaj

        /* SYNTH */
        eighthSynth.innerText = data.eighthNoteMaj
        seventhSynth.innerText = data.seventhNoteMaj
        sixthSynth.innerText = data.sixthNoteMaj
        fifthSynth.innerText = data.fifthNoteMaj
        fourthSynth.innerText = data.fourthNoteMaj
        thirdSynth.innerText = data.thirdNoteMaj
        secondSynth.innerText = data.secondNoteMaj
        firstSynth.innerText = data.firstNoteMaj

        /* CHORDS */
        eighthChords.innerText = data.eighthChordMaj
        seventhChords.innerText = data.seventhChordMaj
        sixthChords.innerText = data.sixthChordMaj
        fifthChords.innerText = data.fifthChordMaj
        fourthChord.innerText = data.fourthChordMaj
        thirdChord.innerText = data.thirdChordMaj
        secondChords.innerText = data.secondChordMaj
        firstChords.innerText = data.firstChordMaj
    })
});  



/* MINOR */
$("#minor").on("click", () => { 
    /* CURRENT SCALE BUTTON */
    $("#minor").prop("disabled", true);
    $("#minor").prop("checked", true);

    /* CONTRARY SCALE BUTTON */
    $("#major").prop("checked", false);
    $("#major").prop("disabled", false);

    /* NOTES */
    notesBass = ['C3', 'A#2', 'G#2', 'G2', 'F2', 'D#2', 'D2', 'C2'];
    notesSynth = ['C5', 'A#4', 'G#4', 'G4', 'F4', 'D#4', 'D4', 'C4'];
    notesChords = [['C5','D#5','G5'], ['B4','D#5','F#5'], ['A4','C5','E5'], ['G4','B4','D5'], ['F4','A4','C5'], ['E4','G#4','B4'], ['D4','F4','G#4'], ['C4','D#4','G4']];


    /* NOTES TEXT */
    $.getJSON(URLJSON, function(data){

        /* BASS */
        eighthBass.innerText = data.eighthNoteMin
        seventhBass.innerText = data.seventhNoteMin
        sixthBass.innerText = data.sixthNoteMin
        fifthBass.innerText = data.fifthNoteMin
        fourthBass.innerText = data.fourthNoteMin
        thirdBass.innerText = data.thirdNoteMin
        secondBass.innerText = data.secondNoteMin
        firstBass.innerText = data.firstNoteMin

        /* SYNTH */
        eighthSynth.innerText = data.eighthNoteMin
        seventhSynth.innerText = data.seventhNoteMin
        sixthSynth.innerText = data.sixthNoteMin
        fifthSynth.innerText = data.fifthNoteMin
        fourthSynth.innerText = data.fourthNoteMin
        thirdSynth.innerText = data.thirdNoteMin
        secondSynth.innerText = data.secondNoteMin
        firstSynth.innerText = data.firstNoteMin

        /* CHORDS */
        eighthChords.innerText = data.eighthChordMin
        seventhChords.innerText = data.seventhChordMin
        sixthChords.innerText = data.sixthChordMin
        fifthChords.innerText = data.fifthChordMin
        fourthChord.innerText = data.fourthChordMin
        thirdChord.innerText = data.thirdChordMin
        secondChords.innerText = data.secondChordMin
        firstChords.innerText = data.firstChordMin
    })

});  