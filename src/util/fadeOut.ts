import { onPlayAnimation } from './util';

export const fadeOut = ({ object, editor, endTime, setIsPlaying }: PlayEffectProps) => {
    object.set('opacity', 1);
    const option = { opacity: 0 };

    const onComplete = () => {
        object.set('opacity', 1);
        if (setIsPlaying) setIsPlaying(false);
    };
    const cancel: any = onPlayAnimation({ object, editor, endTime, option, onComplete });
    const onCancel = () => {
        object.set('opacity', 1);
        for (let i = 0; i <= 1; i++) {
            cancel[i]?.();
        }
    };
    return onCancel;
};
