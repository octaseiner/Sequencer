/* SCALES BUTTONS */

let notesBass = ['C3', 'B2', 'A2', 'G2', 'F2', 'E2', 'D2', 'C2'];
let notesSynth = ['C5', 'B4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C4'];
let notesChords = [['C5','E5','G5'], ['B4','D5','F5'], ['A4','C5','E5'], ['G4','B4','D5'], ['F4','A4','C5'], ['E4','G4','B4'], ['D4','F4','A4'], ['C4','E4','G4']];


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
});  