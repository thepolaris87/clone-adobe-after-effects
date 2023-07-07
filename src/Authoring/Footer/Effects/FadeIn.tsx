import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { BiBadge, BiTrash } from 'react-icons/bi';
import { Slider } from '../components/Slider';
import { MdPlayCircleOutline, MdOutlineStopCircle } from 'react-icons/md';
import { editorAtom } from '@/atoms/atom';
import { useAtomValue } from 'jotai';
import { wait, onSetTimeLine, onPlayAnimation } from '@/util/util';

export const FadeIn = ({ object, id, onDeleteEffect }: AnimationProps) => {
    const editor = useAtomValue(editorAtom);
    const [cancel, setCancel] = useState<any>();
    const [isPlaying, setIsPlaying] = useState(false);
    const [timeMinValue, setTimeMinValue] = useState(0);
    const [timeMaxValue, setTimeMaxValue] = useState(100);

    const onCheckRange = () => {
        if (timeMaxValue - timeMinValue > 1) return;
        setTimeMaxValue(timeMaxValue + 1);
        setTimeMinValue(timeMinValue - 1);
    };
    const onClick = async () => {
        setIsPlaying(true);
        const [startTime, endTime] = object.data.effects[id].timeLine;
        await wait(startTime * 1000);
        object.set('opacity', 0);
        const option = { opacity: 1 };
        const onComplete = () => {
            object.set('opacity', 1);
            setIsPlaying(false);
        };
        onPlayAnimation({ object, editor, setCancel, endTime, option, onComplete });
    };

    const onStopAnimation = () => {
        setIsPlaying(false);
        if (cancel) cancel[0]?.();
        object.set('opacity', 1);
    };

    useEffect(() => {
        onSetTimeLine({ object, id, timeMinValue, timeMaxValue });
    }, [timeMinValue, timeMaxValue, id, object]);

    return (
        <div className="flex flex-wrap justify-between mb-2">
            <span className="flex w-[40%]">
                <BiBadge className="mr-1" />
                <h5>Fade In</h5>
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
            <span className="flex">
                {!isPlaying ? (
                    <MdPlayCircleOutline className="hidden sm:block cursor-pointer mr-1" onClick={() => onClick()} />
                ) : (
                    <MdOutlineStopCircle className="cursor-pointer hidden sm:block mr-1" onClick={() => onStopAnimation()} />
                )}
                <BiTrash
                    className={classNames(isPlaying ? 'cursor-not-allowed' : 'cursor-pointer', 'hidden sm:block')}
                    onClick={() => !isPlaying && onDeleteEffect(id)}
                />
            </span>
        </div>
    );
};
