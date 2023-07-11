import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { BiBadge, BiTrash } from 'react-icons/bi';
import { Slider } from '../components/Slider';
import { MdPlayCircleOutline, MdOutlineStopCircle } from 'react-icons/md';
import { editorAtom } from '@/atoms/atom';
import { useAtomValue } from 'jotai';
import { onSetTimeLine } from '@/util/util';
import { fadeOut } from '@/util';

export const FadeOut = ({ data }: AnimationProps) => {
    const { object, id, onDeleteEffect, isPlay, setEndTime, onSetPlay } = data;
    const editor = useAtomValue(editorAtom);
    const [cancel, setCancel] = useState<any>();
    const [isPlaying, setIsPlaying] = useState(false);
    const [timeMinValue, setTimeMinValue] = useState(0);
    const [timeMaxValue, setTimeMaxValue] = useState(100);
    const timeRef = useRef(0);

    const onCheckRange = () => {
        setEndTime();
        if (timeMaxValue - timeMinValue > 1) return;
        setTimeMaxValue(timeMaxValue + 1);
        setTimeMinValue(timeMinValue - 1);
    };
    const onPlayAnimation = async () => {
        setIsPlaying(true);
        onSetPlay(true);
        const [startTime, endTime] = object.data.effects[id].timeLine;
        timeRef.current = setTimeout(() => {
            const _cancel = fadeOut({ object, editor, endTime, setIsPlaying });
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

    return (
        <div className="flex flex-wrap justify-between mb-2">
            <span className="flex w-[40%]">
                <BiBadge className="mr-1" />
                <h5>Fade Out</h5>
            </span>
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
