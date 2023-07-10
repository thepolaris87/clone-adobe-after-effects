import { onPlayAnimation } from './util';

export const opacity = async ({ effect, object, editor, endTime, setIsPlaying, onSetCancel }: PlayEffectProps) => {
    const { option: opt } = effect as EffectProps;
    if (!opt?.interval) return;
    object.set('opacity', 0);

    for (let index = 0; index < Math.floor(endTime / Number(opt.interval)); index++) {
        const duration = opt?.interval * 1000;
        await new Promise<void>((resolve) => {
            const option = { opacity: 1 };
            const onComplete = () => {
                resolve();
            };
            const cancel: any = onPlayAnimation({ object, editor, endTime, option, onComplete, duration });
            onSetCancel(cancel[0]);
        });

        await new Promise<void>((resolve) => {
            const option = { opacity: 0 };
            const onComplete = () => {
                resolve();
                if (opt?.interval && index === Math.floor(endTime / opt?.interval) - 1) {
                    object.set('opacity', 1);
                    if (setIsPlaying) setIsPlaying(false);
                }
            };
            const cancel: any = onPlayAnimation({ object, editor, endTime, option, onComplete, duration });
            onSetCancel(cancel[0]);
        });
    }
};
