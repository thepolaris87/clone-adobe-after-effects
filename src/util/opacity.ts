import { onPlayAnimation } from './util';

export const opacity = async ({ effect, object, editor, endTime, onSetCancel }: PlayEffectProps) => {
    const { option: opt } = effect as EffectProps;
    object.set('opacity', 0);
    const interval = opt?.interval || 1;

    for (let index = 0; index < Math.ceil(endTime / (interval * 2)); index++) {
        const duration = interval * 1000;
        await new Promise<void>((resolve) => {
            const option = { opacity: 1 };
            const onComplete = () => {
                resolve();
            };
            const cancel: any = onPlayAnimation({ object, editor, endTime, option, onComplete, duration });
            onSetCancel(cancel[0], endTime * 1000, object);
        });

        await new Promise<void>((resolve) => {
            const option = { opacity: 0 };
            const onComplete = () => {
                resolve();
            };
            const cancel: any = onPlayAnimation({ object, editor, endTime, option, onComplete, duration });
            onSetCancel(cancel[0], endTime * 1000, object);
        });
    }
};
