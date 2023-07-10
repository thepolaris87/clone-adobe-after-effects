import { onPlayAnimation } from './util';

export const rotate = ({ effect, object, editor, endTime, setIsPlaying }: PlayEffectProps) => {
    const { option: opt } = effect as EffectProps;
    const option = { angle: opt?.angle || 0 };
    const angle = object.angle;

    const onComplete = () => {
        object.set('angle', angle);
        if (setIsPlaying) setIsPlaying(false);
    };
    const cancel: any = onPlayAnimation({ object, editor, endTime, option, onComplete });
    const onCancel = () => {
        object.set('angle', angle);
        for (let i = 0; i <= 1; i++) {
            cancel[i]?.();
        }
    };
    return onCancel;
};
