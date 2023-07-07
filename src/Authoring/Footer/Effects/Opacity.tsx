import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { BiBadge, BiTrash } from 'react-icons/bi';
import { Slider } from '../components/Slider';
import { MdPlayCircleOutline, MdOutlineStopCircle } from 'react-icons/md';
import { editorAtom } from '@/atoms/atom';
import { useAtomValue } from 'jotai';
import { wait, onSetTimeLine, onPlayAnimation } from '@/util/util';

export const Opacity = ({ object, id, onDeleteEffect }: AnimationProps) => {
    const editor = useAtomValue(editorAtom);
    const [cancel, setCancel] = useState<any>();
    const [isPlaying, setIsPlaying] = useState(false);
    const [timeMinValue, setTimeMinValue] = useState(0);
    const [timeMaxValue, setTimeMaxValue] = useState(100);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const effects = object.data.effects.map((effect: EffectProps, index: number) => {
            if (index === id) return { ...effect, option: { ...effect.option, interval: e.target.value } };
            return effect;
        });
        object.set('data', { ...object.get('data'), effects });
    };
    const onCheckRange = () => {
        if (timeMaxValue - timeMinValue > 1) return;
        setTimeMaxValue(timeMaxValue + 1);
        setTimeMinValue(timeMinValue - 1);
    };
    const onClick = async () => {
        setIsPlaying(true);
        const { option: opt, timeLine } = object.data.effects[id];
        const [startTime, endTime] = timeLine;
        await wait(startTime * 1000);
        if (opt.interval === 0) {
            setIsPlaying(false);
            return;
        }
        for (let index = 0; index < Math.floor(timeLine[1] / opt.interval); index++) {
            object.set('opacity', 0);
            const duration = opt.interval * 1000;
            await new Promise<void>((resolve) => {
                const option = { opacity: 1 };
                const onComplete = () => {
                    resolve();
                    object.set('opacity', 1);
                };
                onPlayAnimation({ object, editor, setCancel, endTime, option, onComplete, duration });
            });
            await new Promise<void>((resolve) => {
                const option = { opacity: 0 };
                const onComplete = () => {
                    resolve();
                    object.set('opacity', 1);
                    if (index === Math.floor(timeLine[1] / opt.interval) - 1) setIsPlaying(false);
                };
                onPlayAnimation({ object, editor, setCancel, endTime, option, onComplete, duration });
            });
        }
    };
    const onStopAnimation = () => {
        setIsPlaying(false);
        for (let i = 0; i <= 1; i++) {
            cancel[i]?.();
        }
        object.set('opacity', 1);
    };

    useEffect(() => {
        onSetTimeLine({ object, id, timeMinValue, timeMaxValue });
    }, [timeMinValue, timeMaxValue, id, object]);

    return (
        <div className="flex flex-wrap justify-between mb-2">
            <div className="flex w-[40%] justify-between">
                <span className="flex ">
                    <BiBadge className="mr-1" />
                    <h5>Opacity</h5>
                </span>
                <span className="hidden sm:flex">
                    <label className="mr-2">Interval</label>
                    <input name="interval" className="rounded-sm px-2 w-[80%] shadow-[0_1px_#cdd8dd]" onChange={(e) => onChange(e)} />
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
            <span className="flex">
                {!isPlaying ? (
                    <MdPlayCircleOutline className="hidden sm:block cursor-pointer mr-1" onClick={() => onClick()} />
                ) : (
                    <MdOutlineStopCircle className="hidden sm:block cursor-pointer mr-1" onClick={() => onStopAnimation()} />
                )}
                <BiTrash
                    className={classNames(isPlaying ? 'cursor-not-allowed' : 'cursor-pointer', 'hidden sm:block')}
                    onClick={() => !isPlaying && onDeleteEffect(id)}
                />
            </span>
        </div>
    );
};
