type EffectProps = {
    type: string;
    timeLine: number[];
    option?: {
        src?: string; // sound
        angle?: number; // rotate
        scaleX?: number; // scale
        scaleY?: number; // scale
        top?: number; // move
        left?: number; // move
        interval?: number; // opacity
        from?: number; // fade in, out
        to?: number; // fade in, out
    };
};
