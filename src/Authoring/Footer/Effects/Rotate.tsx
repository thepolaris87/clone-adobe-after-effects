import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { BiBadge, BiTrash } from 'react-icons/bi';
import { Slider } from '../components/Slider';
import { MdPlayCircleOutline, MdOutlineStopCircle } from 'react-icons/md';
import { editorAtom } from '@/atoms/atom';
import { useAtomValue } from 'jotai';
import { onSetTimeLine } from '@/util/util';
import { rotate } from '@/util';

export const Rotate = ({ data }: AnimationProps) => {
    const { object, id, onDeleteEffect, isPlay, setEndTime, onSetPlay, createTimeLine } = data;
    const editor = useAtomValue(editorAtom);
    const [cancel, setCancel] = useState<any>();
    const [isPlaying, setIsPlaying] = useState(false);
    const [angle, setAngle] = useState(object.angle);
    const [originValue, setOriginValue] = useState(0);
    const [timeMinValue, setTimeMinValue] = useState(0);
    const [timeMaxValue, setTimeMaxValue] = useState(100);
    const timeRef = useRef(0);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAngle(Number(e.target.value));
        const effects = object.data.effects.map((effect: EffectProps, index: number) => {
            if (index === id) return { ...effect, option: { ...effect.option, [e.target.name]: e.target.value } };
            return effect;
        });
        object.set('data', { ...object.get('data'), effects });
        createTimeLine();
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
        setOriginValue(object.angle as number);
        timeRef.current = setTimeout(() => {
            const _cancel = rotate({ effect, object, editor, endTime, setIsPlaying });
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
        object.set('angle', originValue);
    };

    useEffect(() => {
        if (isPlay) setIsPlaying(true);
        else setIsPlaying(false);
    }, [isPlay]);

    useEffect(() => {
        onSetTimeLine({ object, id, timeMinValue, timeMaxValue });
    }, [timeMinValue, timeMaxValue, id, object]);

    return (
        <div className="flex flex-wrap justify-between mb-2">
            <div className="flex w-[40%] justify-between">
                <span className="flex">
                    <BiBadge className="mr-1" />
                    <h5>Rotate</h5>
                </span>
                <span className="hidden sm:flex justify-end">
                    <label className="mr-2">Angle</label>
                    <input name="angle" className="rounded-sm px-2 w-[80%] shadow-[0_1px_#cdd8dd]" value={angle} onChange={(e) => onChange(e)} />
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
