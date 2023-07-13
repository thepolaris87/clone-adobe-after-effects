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
    data: {
        sounds?: TGetSound[];
        object: fabric.Object;
        id: number;
        onDeleteEffect: (value: number) => void;
        isPlay: boolean;
        setEndTime: () => void;
        onSetPlay: (value: boolean) => void;
        onCreateTimeLine: () => void;
    };
};

type AnimationListProps = {
    object: fabric.Object;
    sounds?: TGetSound[];
    onSetTime: (value: boolean) => void;
    onSetNum: () => void;
    totalCancel: (value: () => void, endTime?: number, object?: fabric.Object) => void;
};

type TimeLineDataProps = {
    key: string;
    t1: number;
    t2: number;
    from?: number;
    to?: number;
    play?: () => void;
    stop?: () => void;
    isPlayed?: boolean;
};

type TimeLineBarProps = {
    e: React.ChangeEvent<HTMLInputElement>;
    setValue: (value: number) => void;
    timeLineData: TimeLineDataProps[];
    object: fabric.Object;
    editor: Editor | null;
    isPlay: boolean;
    isPlaying: boolean;
};

type PlayEffectProps = {
    effect?: EffectProps;
    object: fabric.Object;
    editor: Editor | null;
    endTime: number;
    setIsPlaying?: (value: boolean) => void;
    onSetCancel?: any;
};

type SliderProps = {
    timeMinValue: number;
    timeMaxValue: number;
    setTimeMaxValue: (value: number) => void;
    setTimeMinValue: (value: number) => void;
    onCheckRange: () => void;
    objectId: string;
    isPlaying: boolean;
};

type PlayAnimationProps = {
    object: fabric.Object;
    editor: Editor | null;
    endTime: number;
    option: { [key: string]: number | string };
    onComplete: () => void;
    duration?: number;
};

type InputProps = { value: number; onCheck: () => void; setValue: (value: number) => void; isPlaying: boolean; flag: boolean };

type TimeLineProps = { object: fabric.Object; id: number; timeMinValue: number; timeMaxValue: number };
