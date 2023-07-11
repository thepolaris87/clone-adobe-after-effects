import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { BiBadge, BiTrash } from 'react-icons/bi';
import { Slider } from '../components/Slider';
import { MdPlayCircleOutline, MdOutlineStopCircle } from 'react-icons/md';
import { editorAtom } from '@/atoms/atom';
import { useAtomValue } from 'jotai';
import { onSetTimeLine } from '@/util/util';
import { move } from '@/util';

export const Move = ({ data }: AnimationProps) => {
    const { object, id, onDeleteEffect, isPlay, setEndTime, onSetPlay, onCreateTimeLine } = data;
    const editor = useAtomValue(editorAtom);
    const [cancel, setCancel] = useState<any>();
    const [isPlaying, setIsPlaying] = useState(false);
    const [moveValue, setMoveValue] = useState({ top: object.top, left: object.left });
    const [originValue, setOriginValue] = useState({ top: 0, left: 0 });
    const [timeMinValue, setTimeMinValue] = useState(0);
    const [timeMaxValue, setTimeMaxValue] = useState(100);
    const timeRef = useRef(0);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onCreateTimeLine();
        setMoveValue({ ...moveValue, [e.target.name]: Number(e.target.value) });
        const effects = object.data.effects.map((effect: EffectProps, index: number) => {
            if (index === id) return { ...effect, option: { ...effect.option, [e.target.name]: e.target.value } };
            return effect;
        });
        object.set('data', { ...object.get('data'), effects });
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
        setOriginValue({ top: object.top || 0, left: object.left || 0 });
        timeRef.current = setTimeout(() => {
            const _cancel = move({ effect, object, editor, endTime, setIsPlaying });
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
        object.set({ top: originValue.top, left: originValue.left });
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
                    <h5>Move</h5>
                </span>
                <span className="hidden sm:flex">
                    <label className="mr-2">x</label>
                    <input name="top" className="rounded-sm px-2 w-[80%] shadow-[0_1px_#cdd8dd] mr-3" value={moveValue.top} onChange={(e) => onChange(e)} />
                    <label className="mr-2">y</label>
                    <input name="left" className="rounded-sm px-2 w-[80%] shadow-[0_1px_#cdd8dd]" value={moveValue.left} onChange={(e) => onChange(e)} />
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
