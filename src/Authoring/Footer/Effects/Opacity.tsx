import { useState, useEffect } from 'react';
import { BiBadge, BiTrash } from 'react-icons/bi';
import { Slider } from '../components/Slider';

export const Opacity = ({ object, id, onDeleteEffect }: AnimationProps) => {
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

    useEffect(() => {
        const effects = object.data.effects.map((effect: EffectProps, index: number) => {
            if (index === id) return { ...effect, timeLine: [timeMinValue, timeMaxValue] };
            return effect;
        });
        object.set('data', { ...object.get('data'), effects });
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
            />
            <BiTrash className="cursor-pointer" onClick={() => onDeleteEffect(id)} />
        </div>
    );
};
