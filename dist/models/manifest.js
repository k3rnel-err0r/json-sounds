"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultSoundSettings = void 0;
exports.defaultSoundSettings = {
    type: 'sound',
    group: 'sounds',
    variants: {
        desktop: {
            samplerate: 44100
        },
        mobile: {
            samplerate: 44100,
            channels: 1
        }
    },
    formats: [
        'mp3',
        'm4a'
    ]
};
