import { sound } from './util';

export const soundCheck = ({
    soundIdRef,
    _sound,
    endTime,
    onStopAnimation,
    setIsPlaying
}: {
    soundIdRef: any;
    _sound: ReturnType<typeof sound>;
    endTime: number;
    onStopAnimation?: () => void;
    setIsPlaying?: (value: boolean) => void;
}) => {
    if (!soundIdRef) return;
    let time = 0;

    soundIdRef.current = setInterval(() => {
        time += 1;
        if (time >= endTime) {
            clearInterval(soundIdRef.current);
            _sound.stop();
            if (onStopAnimation) onStopAnimation();
            if (setIsPlaying) setIsPlaying(false);
        } else _sound.play();
    }, 1000);

    return soundIdRef.current;
};
