import { useState } from 'react';
import { BiBadge, BiTrash } from 'react-icons/bi';
import { Slider } from '../components/Slider';

export const FadeIn = ({ object, id, onDeleteEffect }: AnimationProps) => {
    const [timeMinValue, setTimeMinValue] = useState(0);
    const [timeMaxValue, setTimeMaxValue] = useState(100);

    const onCheckRange = () => {
        if (timeMaxValue - timeMinValue > 1) return;
        setTimeMaxValue(timeMaxValue + 1);
        setTimeMinValue(timeMinValue - 1);
    };

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
            />
            <BiTrash className="cursor-pointer" onClick={() => onDeleteEffect(id)} />
        </div>
    );
};
