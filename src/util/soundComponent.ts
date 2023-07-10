import { sound } from './util';

export const soundComponent = ({ soundIdRef, _sound }: { soundIdRef: any; _sound: ReturnType<typeof sound> }) => {
    if (!soundIdRef) return;
    soundIdRef.current = setInterval(() => {
        _sound?.play();
    }, _sound.audio.duration * 1000);

    return soundIdRef.current;
};
