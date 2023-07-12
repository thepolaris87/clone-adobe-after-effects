import { useState } from 'react';
import { Input } from './Input';
import { useAtomValue } from 'jotai';
import { activeObjectAtom } from '@/atoms/atom';

export const Slider = ({ timeMinValue, timeMaxValue, setTimeMaxValue, setTimeMinValue, onCheckRange, objectId, isPlaying }: SliderProps) => {
    const activeObj = useAtomValue(activeObjectAtom);
    const [flag, setFlag] = useState(false);
    const [position, setPosition] = useState(0);

    const onMouseMove = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!flag) return;
        const num = e.screenX >= 1300 ? 10 : 5;
        if (position >= e.clientX + num) {
            if (timeMinValue === 0) return;
            setPosition(e.clientX);
            setTimeMaxValue(timeMaxValue - 1);
            setTimeMinValue(timeMinValue - 1);
        } else if (position <= e.clientX - num) {
            if (timeMaxValue === 100) return;
            setPosition(e.clientX);
            setTimeMaxValue(timeMaxValue + 1);
            setTimeMinValue(timeMinValue + 1);
        }
    };

    return (
        <div
            className={'hidden sm:flex w-[55%] items-center relative'}
            style={{ backgroundColor: activeObj && objectId === activeObj.data.id ? '#dddbdb' : '#ecebeb' }}
            onMouseMove={(e) => onMouseMove(e)}
            onMouseLeave={() => setFlag(false)}
        >
            <Input value={timeMinValue} onCheck={onCheckRange} setValue={setTimeMinValue} isPlaying={isPlaying} flag={flag} />
            <Input value={timeMaxValue} onCheck={onCheckRange} setValue={setTimeMaxValue} isPlaying={isPlaying} flag={flag} />
            <div
                className="relative h-[7px] w-full rounded-[4px]"
                style={{ backgroundColor: activeObj && objectId === activeObj.data.id ? '#ecebeb' : '#dddddd' }}
            >
                <div
                    className="group absolute rounded-[10px] h-[7px] bg-[#b0b0b0]"
                    style={{ left: timeMinValue + '%', right: 100 - timeMaxValue + '%' }}
                    onMouseMove={(e) => onMouseMove(e)}
                    onMouseDown={(e) => {
                        setFlag(true);
                        setPosition(e.clientX);
                    }}
                    onMouseUp={() => setFlag(false)}
                />
            </div>
        </div>
    );
};
