import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { BiBadge, BiTrash } from 'react-icons/bi';
import { Slider } from '../components/Slider';
import { MdPlayCircleOutline, MdOutlineStopCircle } from 'react-icons/md';
import { editorAtom } from '@/atoms/atom';
import { useAtomValue } from 'jotai';
import { onSetTimeLine } from '@/util/util';
import { opacity } from '@/util';
import { useTimeCheck } from '@/hooks/useTimeCheck';

export const Opacity = ({ data }: AnimationProps) => {
    const { object, id, onDeleteEffect, isPlay, setEndTime, onSetPlay, onCreateTimeLine } = data;
    const editor = useAtomValue(editorAtom);
    const [cancel, setCancel] = useState<any>();
    const [isPlaying, setIsPlaying] = useState(false);
    const [interval, setInterval] = useState(1);
    const [timeMinValue, setTimeMinValue] = useState(0);
    const [timeMaxValue, setTimeMaxValue] = useState(100);
    const timeRef = useRef(0);
    const { start, stop, time } = useTimeCheck();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInterval(Number(e.target.value));
        const effects = object.data.effects.map((effect: EffectProps, index: number) => {
            if (index === id) return { ...effect, option: { ...effect.option, interval: Number(e.target.value) } };
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
    const onSetCancel = (_cancel: () => void, endTime: number) => {
        setCancel(() => {
            return [_cancel, endTime];
        });
    };
    const onPlayAnimation = async () => {
        setIsPlaying(true);
        onSetPlay(true);
        start();
        const effect = object.data.effects[id];
        const [startTime, endTime] = effect.timeLine;
        timeRef.current = setTimeout(() => {
            opacity({ effect, object, editor, endTime, setIsPlaying, onSetCancel });
        }, startTime * 1000);
    };
    const onStopAnimation = () => {
        setIsPlaying(false);
        onSetPlay(false);
        stop();
        clearTimeout(timeRef.current);
        cancel[0]?.();
        object.set('opacity', 1);
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

    useEffect(() => {
        if (!cancel) return;
        if (time * 1000 === cancel[1]) {
            setIsPlaying(false);
            cancel[0]?.();
            object.set('opacity', 1);
            stop();
        }
    }, [time, cancel, object, stop]);

    useEffect(() => {
        const effects = object.data.effects.map((effect: EffectProps, index: number) => {
            if (index === id) return { ...effect, option: { ...effect.option, interval: 1 } };
            return effect;
        });
        object.set('data', { ...object.get('data'), effects });
    }, [object, id]);

    return (
        <div className="flex flex-wrap justify-between mb-2">
            <div className="flex w-[40%] justify-between">
                <span className="flex ">
                    <BiBadge className="mr-1" />
                    <h5>Opacity</h5>
                </span>
                <span className="hidden sm:flex">
                    <label className="mr-2">Interval</label>
                    <input name="interval" className="rounded-sm px-2 w-[80%] shadow-[0_1px_#cdd8dd]" value={interval} onChange={(e) => onChange(e)} />
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
