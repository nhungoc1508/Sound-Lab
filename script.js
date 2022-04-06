const synth = new Tone.Synth().toDestination();

const keys = [];

for (let i=0; i<4; i++) {
    let key = document.getElementById(`key${i}`);
    keys.push(key);
}

keys.push(document.getElementById("drum0"));
keys.push(document.getElementById("drum1"));

const drumPlayer0 = new Tone.Player("https://tonejs.github.io/audio/drum-samples/loops/blueyellow.mp3").toDestination();
drumPlayer0.loop = true;
const drumPlayer1 = new Tone.Player("https://tonejs.github.io/audio/drum-samples/loops/break12.mp3").toDestination();
drumPlayer1.loop = true;

const keys2notes = {
    0: "C4",
    1: "E4",
    2: "G4",
    3: "B4"
}

for (let i=0; i<4; i++) {
    keys[i].addEventListener('mousedown', function() {
        keys[i].style.opacity = "0.85";
        synth.triggerAttackRelease(keys2notes[i], "8n");
    })

    keys[i].addEventListener('mouseup', function() {
        keys[i].style.opacity = "1";
    })
}

let drum0_playing = false;
let drum1_playing = false;

keys[4].addEventListener('mousedown', function() {
    drum0_playing = !drum0_playing;
    keys[4].style.opacity = "0.85";
    if (drum0_playing) {
        drum1_playing = false;
        drumPlayer1.stop()
        Tone.loaded().then(() => {
            drumPlayer0.start();
        });
    } else {
        drumPlayer0.stop();
    }
})

keys[4].addEventListener('mouseup', function() {
    keys[4].style.opacity = "1";
})

keys[5].addEventListener('mousedown', function() {
    drum1_playing = !drum1_playing;
    keys[5].style.opacity = "0.85";
    if (drum1_playing) {
        drum0_playing = false;
        drumPlayer0.stop()
        Tone.loaded().then(() => {
            drumPlayer1.start();
        });
    } else {
        drumPlayer1.stop();
    }
})

keys[5].addEventListener('mouseup', function() {
    keys[5].style.opacity = "1";
})