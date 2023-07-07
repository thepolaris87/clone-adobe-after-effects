import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { BiBadge, BiTrash } from 'react-icons/bi';
import { Slider } from '../components/Slider';
import { MdPlayCircleOutline, MdOutlineStopCircle } from 'react-icons/md';
import { editorAtom } from '@/atoms/atom';
import { useAtomValue } from 'jotai';
import { wait, onSetTimeLine } from '@/util/util';

export const Scale = ({ object, id, onDeleteEffect }: AnimationProps) => {
    const editor = useAtomValue(editorAtom);
    const [isPlaying, setIsPlaying] = useState(false);
    const [cancel, setCancel] = useState<any>();
    const [scale, setScale] = useState({ scaleX: 0, scaleY: 0 });
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
        const { scaleX, scaleY } = object;
        setScale({ scaleX: scaleX || 0, scaleY: scaleY || 0 });

        const _cancel = object.animate(
            { scaleX: option.scaleX, scaleY: option.scaleY },
            {
                duration: timeLine[1] * 1000,
                onChange: () => {
                    editor?.canvas.requestRenderAll();
                },
                onComplete: () => {
                    object.set({ scaleX: scaleX, scaleY: scaleY });
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
        object.set({ scaleX: scale.scaleX, scaleY: scale.scaleY });
    };

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
                    <input name="scaleX" className="rounded-sm px-2 w-[80%] shadow-[0_1px_#cdd8dd] mr-3" onChange={(e) => onChange(e)} />
                    <label className="mr-2">y</label>
                    <input name="scaleY" className="rounded-sm px-2 w-[80%] shadow-[0_1px_#cdd8dd]" onChange={(e) => onChange(e)} />
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
