import { useState } from 'react';
import { BiBadge } from 'react-icons/bi';
import { fabric } from 'fabric';
import { Slider } from '../components/Slider';

export const FadeIn = ({ object }: { object: fabric.Object }) => {
    const [timeMinValue, setTimeMinValue] = useState(0);
    const [timeMaxValue, setTimeMaxValue] = useState(100);
    const [timeMinPersent, setTimeMinPersent] = useState(0);
    const [timeMaxPersent, setTimeMaxPersent] = useState(0);

    const onCheckRange = () => {
        if (timeMaxValue - timeMinValue < 1) {
            setTimeMaxValue(timeMaxValue + 1);
            setTimeMinValue(timeMinValue - 1);
        } else {
            setTimeMinPersent((timeMinValue / 100) * 100);
            setTimeMaxPersent(101 - (timeMaxValue / 100) * 100);
        }
    };
    console.log(timeMinPersent, timeMaxPersent, timeMinValue, timeMaxValue);
    return (
        <div className="flex flex-wrap justify-between mb-2">
            <span className="flex w-[45%]">
                <BiBadge className="mr-1" />
                <h5>Fade In</h5>
            </span>
            <Slider
                timeMinValue={timeMinValue}
                timeMaxValue={timeMaxValue}
                setTimeMaxValue={setTimeMaxValue}
                setTimeMinValue={setTimeMinValue}
                onCheckRange={onCheckRange}
                timeMinPersent={timeMinPersent}
                timeMaxPersent={timeMaxPersent}
            />
        </div>
    );
};
