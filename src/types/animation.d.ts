type TEffect = 'MOVE' | 'FADEIN' | 'FADEOUT' | 'ROTATE' | 'SCALE' | 'SOUND' | 'OPACITY';

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

type AnimationProps = {
    sounds?: TGetSound[];
    object: fabric.Object;
    id: number;
    onDeleteEffect: (value: number) => void;
};

type SliderProps = {
    timeMinValue: number;
    timeMaxValue: number;
    setTimeMaxValue: (value: number) => void;
    setTimeMinValue: (value: number) => void;
    onCheckRange: () => void;
    objectId: string;
};

type InputProps = { value: number; onCheck: () => void; setValue: (value: number) => void };
