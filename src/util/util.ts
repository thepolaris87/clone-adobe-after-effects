export const wait = (delay: number) =>
    new Promise((resolve: (value?: unknown) => void) =>
        setTimeout(() => {
            resolve();
        }, delay)
    );

export const sound = (src: string) => {
    const audio = new Audio();
    audio.src = src;

    const play = () => {
        audio.play();
    };
    const stop = () => {
        audio.pause();
        audio.currentTime = 0;
    };

    return { audio, play, stop };
};

export const onSetTimeLine = ({ object, id, timeMinValue, timeMaxValue }: TimeLineProps) => {
    const effects = object.data.effects.map((effect: EffectProps, index: number) => {
        if (index === id) return { ...effect, timeLine: [timeMinValue, timeMaxValue] };
        return effect;
    });
    object.set('data', { ...object.get('data'), effects });
};

export const onPlayAnimation = ({ object, editor, endTime, option, onComplete, duration }: PlayAnimationProps) => {
    const _cancel = object.animate(option, {
        duration: duration ? duration : endTime * 1000,
        onChange: () => {
            editor?.canvas.requestRenderAll();
        },
        onComplete: () => {
            onComplete();
        }
    });
    return _cancel;
};
