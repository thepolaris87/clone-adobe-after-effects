import { onPlayAnimation } from './util';

export const move = ({ effect, object, editor, endTime, setIsPlaying }: PlayEffectProps) => {
    const { option: opt } = effect as EffectProps; // 이동하려는 위치
    const { top: topValue, left: leftValue } = object; // 원래 위치
    const option = { top: opt?.top || 0, left: opt?.left || 0 };

    const onComplete = () => {
        object.set({ top: topValue, left: leftValue });
        if (setIsPlaying) setIsPlaying(false);
    };
    const cancel: any = onPlayAnimation({ object, editor, endTime, option, onComplete });
    const onCancel = () => {
        object.set({ top: topValue, left: leftValue });
        for (let i = 0; i <= 1; i++) {
            cancel[i]?.();
        }
    };
    return onCancel;
};
