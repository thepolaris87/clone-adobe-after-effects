import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { BiBadge, BiTrash } from 'react-icons/bi';
import { Slider } from '../components/Slider';
import { MdPlayCircleOutline, MdOutlineStopCircle } from 'react-icons/md';
import { editorAtom } from '@/atoms/atom';
import { useAtomValue } from 'jotai';
import { wait, onSetTimeLine } from '@/util/util';

export const Move = ({ object, id, onDeleteEffect }: AnimationProps) => {
    const editor = useAtomValue(editorAtom);
    const [cancel, setCancel] = useState<any>();
    const [isPlaying, setIsPlaying] = useState(false);
    const [move, setMove] = useState({ top: 0, left: 0 });
    const [timeMinValue, setTimeMinValue] = useState(0);
    const [timeMaxValue, setTimeMaxValue] = useState(100);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const effects = object.data.effects.map((effect: EffectProps, index: number) => {
            if (index === id) return { ...effect, option: { ...effect.option, [e.target.name]: e.target.value } };
            return effect;
        });
        object.set('data', { ...object.get('data'), effects });
    };
    const onCheckRange = () => {
        if (timeMaxValue - timeMinValue > 1) return;
        setTimeMaxValue(timeMaxValue + 1);
        setTimeMinValue(timeMinValue - 1);
    };
    const onPlayAnimation = async () => {
        setIsPlaying(true);
        const { option, timeLine } = object.data.effects[id];
        await wait(timeLine[0] * 1000);
        const { top, left } = object;
        setMove({ top: top || 0, left: left || 0 });

        const _cancel = object.animate(
            { top: option.top, left: option.left },
            {
                duration: timeLine[1] * 1000,
                onChange: () => {
                    editor?.canvas.requestRenderAll();
                },
                onComplete: () => {
                    object.set({ top: move.top, left: move.left });
                    setIsPlaying(false);
                }
            }
        );
        setCancel(_cancel);
    };

    const onStopAnimation = () => {
        setIsPlaying(false);
        for (let i = 0; i <= 1; i++) {
            cancel[i]?.();
        }
        object.set({ top: move.top, left: move.left });
    };

    useEffect(() => {
        onSetTimeLine({ object, id, timeMinValue, timeMaxValue });
    }, [timeMinValue, timeMaxValue, id, object]);

    return (
        <div className="flex flex-wrap justify-between mb-2">
            <div className="flex w-[40%] justify-between">
                <span className="flex">
                    <BiBadge className="mr-1" />
                    <h5>Move</h5>
                </span>
                <span className="hidden sm:flex">
                    <label className="mr-2">x</label>
                    <input name="top" className="rounded-sm px-2 w-[80%] shadow-[0_1px_#cdd8dd] mr-3" onChange={(e) => onChange(e)} />
                    <label className="mr-2">y</label>
                    <input name="left" className="rounded-sm px-2 w-[80%] shadow-[0_1px_#cdd8dd]" onChange={(e) => onChange(e)} />
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
                    <MdPlayCircleOutline className="hidden sm:block cursor-pointer mr-1" onClick={() => onPlayAnimation()} />
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
