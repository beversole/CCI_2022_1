const synthSettings = {
    volume: -10,
    frequency: 'C4',
    detune: 200,
    oscillator: {
        type: 'triangle', //sine, sawtooth, triangle
    },
    filter: {
        Q: 2,
        type: 'lowpass',
        rolloff: -24,
    },
    envelope: {
        attack: 0.25,
        decay: 1.2,
        sustain: 0.5,
        release: 1,
    },
    filterEnvelope: {
        attack: 0.1,
        decay: 1,
        sustain: 1.5,
        release: 1,
        baseFrequency: 30000,
        octaves: 7,
        exponent: 3,
    },
};

const noiseSettings = {
    type: 'pink',
    volume: -70,
};

const delaySettings = {
    delayTime: 0.5,
    maxDelay: 1,
    wet: 0.8,
    feedback: 0.7,
};

function getDistance(v0, v1) {
    const xd = v0[0] - v1[0];
    const yd = v0[1] - v1[1];
    const zd = v0[2] - v1[2];
    const result = Math.sqrt(xd * xd + yd * yd + zd * zd);
    console.log(xd);
    return result;
}

function getSynthVolume() {
    if (IS_SAFARI) {
        return 10;
    } else {
        return -30;
    }
}

function getFactor() {
    if (IS_SAFARI) {
        return 0.1;
    } else {
        return 1;
    }
}

class SynthPlayer {
    constructor() {
        this._osc = new Tone.MonoSynth(synthSettings);// new Tone.FatOscillator(synthSettings);
        this._volume = new Tone.Volume(getSynthVolume());
        this._delay = new Tone.FeedbackDelay(delaySettings);
        this._osc.chain(this._volume, this._delay, Tone.Master);
        this._noise = new Tone.Noise(noiseSettings).start();
        this._autoFilter = new Tone.AutoFilter({
            frequency: '8n',
            baseFrequency: 200,
            octaves: 8,
        });
        this._noise.chain(this._autoFilter, Tone.Master);
        this._distance = 0;
        this._time = 0;
    }

    update(dt, position) {
        if (this._position) {
            this._lastPosition = this._position;
            this._distance += getDistance(this._lastPosition, position);
        }
        const f = getFactor();
        if (this._distance * 10 + this._time > f *(Math.random() * 15.5 + 10.5)) {
            this.playNote(this._distance % 1);
            this._distance = 0;
            this._time = 0;
        }
        this._time += dt / 400;
        this._position = position;
    }

    playNote(value) {
        const bandSize = 7;
        const scale = getScaleRange('C', 'major', Math.floor(Math.random() * 5) + 1);
        const key = Math.floor(value * bandSize);
        const note = scale[key];
        console.log(key);
        this._osc.triggerAttack(note);
        this._osc.triggerRelease();
    }
}