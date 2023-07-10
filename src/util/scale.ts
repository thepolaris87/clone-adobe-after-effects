import { onPlayAnimation } from './util';

export const scale = ({ effect, object, editor, endTime, setIsPlaying }: PlayEffectProps) => {
    const { option: opt } = effect as EffectProps;
    const { scaleX, scaleY } = object;
    const option = { scaleX: opt?.scaleX || 0, scaleY: opt?.scaleY || 0 };

    const onComplete = () => {
        object.set({ scaleX: scaleX, scaleY: scaleY });
        if (setIsPlaying) setIsPlaying(false);
    };
    const cancel: any = onPlayAnimation({ object, editor, endTime, option, onComplete });
    const onCancel = () => {
        object.set({ scaleX: scaleX, scaleY: scaleY });
        for (let i = 0; i <= 1; i++) {
            cancel[i]?.();
        }
    };
    return onCancel;
};
