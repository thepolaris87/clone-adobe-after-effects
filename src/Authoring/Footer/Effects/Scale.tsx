import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { BiBadge, BiTrash } from 'react-icons/bi';
import { Slider } from '../components/Slider';
import { MdPlayCircleOutline, MdOutlineStopCircle } from 'react-icons/md';
import { editorAtom } from '@/atoms/atom';
import { useAtomValue } from 'jotai';
import { onSetTimeLine } from '@/util/util';
import { scale } from '@/util';

export const Scale = ({ data }: AnimationProps) => {
    const { object, id, onDeleteEffect, isPlay, setEndTime, onSetPlay, onCreateTimeLine } = data;
    const editor = useAtomValue(editorAtom);
    const effect = object.data.effects[id];
    const [isPlaying, setIsPlaying] = useState(false);
    const [cancel, setCancel] = useState<any>();
    const [scaleValue, setScaleValue] = useState({ scaleX: effect.option.scaleX, scaleY: effect.option.scaleY });
    const [originValue, setOriginValue] = useState({ scaleX: 0, scaleY: 0 });
    const [timeMinValue, setTimeMinValue] = useState(effect.timeLine[0]);
    const [timeMaxValue, setTimeMaxValue] = useState(effect.timeLine[1]);
    const timeRef = useRef(0);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setScaleValue({ ...scaleValue, [e.target.name]: Number(e.target.value) });
        const effects = object.data.effects.map((effect: EffectProps, index: number) => {
            if (index === id) return { ...effect, option: { ...effect.option, [e.target.name]: e.target.value } };
            return effect;
        });
        object.set('data', { ...object.get('data'), effects });
        onCreateTimeLine();
    };
    const onCheckRange = () => {
        setEndTime();
        if (timeMaxValue - timeMinValue > 1) return;
        setTimeMaxValue(timeMaxValue + 1);
        setTimeMinValue(timeMinValue - 1);
    };
    const onPlayAnimation = async () => {
        setIsPlaying(true);
        onSetPlay(true);
        const effect = object.data.effects[id];
        const [startTime, endTime] = effect.timeLine;
        setOriginValue({ scaleX: object.scaleX || 0, scaleY: object.scaleY || 0 });
        timeRef.current = setTimeout(() => {
            const _cancel = scale({ effect, object, editor, endTime, setIsPlaying });
            setCancel(() => {
                return _cancel;
            });
        }, startTime * 1000);
    };
    const onStopAnimation = () => {
        setIsPlaying(false);
        onSetPlay(false);
        clearTimeout(timeRef.current);
        cancel?.();
        object.set({ scaleX: originValue.scaleX, scaleY: originValue.scaleY });
    };

    useEffect(() => {
        if (isPlay) setIsPlaying(true);
        else setIsPlaying(false);
    }, [isPlay]);

    useEffect(() => {
        if (isPlaying) onSetPlay(true);
        else onSetPlay(false);
    }, [isPlaying, onSetPlay]);

    useEffect(() => {
        onSetTimeLine({ object, id, timeMinValue, timeMaxValue });
    }, [timeMinValue, timeMaxValue, id, object]);

    return (
        <div className="flex flex-wrap justify-between mb-2">
            <div className="flex w-[40%] justify-between">
                <span className="flex">
                    <BiBadge className="mr-1" />
                    <h5>Scale</h5>
                </span>
                <span className="hidden sm:flex">
                    <label className="mr-2">x</label>
                    <input
                        name="scaleX"
                        className="rounded-sm px-2 w-[80%] shadow-[0_1px_#cdd8dd] mr-3"
                        value={scaleValue.scaleX}
                        onChange={(e) => onChange(e)}
                    />
                    <label className="mr-2">y</label>
                    <input name="scaleY" className="rounded-sm px-2 w-[80%] shadow-[0_1px_#cdd8dd]" value={scaleValue.scaleY} onChange={(e) => onChange(e)} />
                </span>
            </div>
            <Slider
                timeMinValue={timeMinValue}
                timeMaxValue={timeMaxValue}
                setTimeMaxValue={setTimeMaxValue}
                setTimeMinValue={setTimeMinValue}
                onCheckRange={onCheckRange}
                objectId={object.data.id}
                isPlaying={isPlaying}
            />
            <span className="flex w-[60px]">
                {!isPlay &&
                    (!isPlaying ? (
                        <MdPlayCircleOutline className="hidden sm:block cursor-pointer mr-1" onClick={() => onPlayAnimation()} />
                    ) : (
                        <MdOutlineStopCircle className="cursor-pointer hidden sm:block mr-1" onClick={() => onStopAnimation()} />
                    ))}
                {!isPlay && (
                    <BiTrash
                        className={classNames(isPlaying ? 'cursor-not-allowed' : 'cursor-pointer', 'hidden sm:block')}
                        onClick={() => !isPlaying && onDeleteEffect(id)}
                    />
                )}
            </span>
        </div>
    );
};
