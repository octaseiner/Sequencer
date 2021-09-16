//* INPUTS TYPE RANGE */
$("input[type=range]").on("mouseup", () => {
    /* GENERAL */
        /* BPM */
        tempo = document.querySelector("#bpm").value;
        Tone.Transport.bpm.value = tempo;
    
        /* GAIN */
        ganancia = parseFloat(document.querySelector("#gain").value);
        gain.gain.rampTo(ganancia);
    
    /* SYNTH */
            /* VOLUME */
            volSynth = document.querySelector("#volSynth").value;
            synthVol.volume.value = volSynth;
        
            /* REVERB */
            revSynth = document.querySelector("#revSynth").value;
            synthRev.wet.value = revSynth;
        
            /* DELAY */
            delaySynth = document.querySelector("#delaySynth").value;
            synthDelay.wet.value = delaySynth;
    
    /* DRUMS */
        /* VOLUME */
        volDrums = document.querySelector("#volDrums").value;
        drumsVol.volume.value = volDrums;
    
        /* REVERB */
        revDrums = document.querySelector("#revDrums").value;
        drumsRev.wet.value = revDrums;
    
        /* DELAY */
        delayDrums = document.querySelector("#delayDrums").value;
        drumsDelay.wet.value = delayDrums;
    
    /* BASS */
        /* VOLUME */
        volBass = document.querySelector("#volBass").value;
        bassVol.volume.value = volBass;
    
        /* REVERB */
        revBass = document.querySelector("#revBass").value;
        bassRev.wet.value = revBass;
    
        /* DELAY */
        delayBass = document.querySelector("#delayBass").value;
        bassDelay.wet.value = delayBass;
    
    /* CHORDS */
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
    