import { useState } from 'react';
import { BiBadge } from 'react-icons/bi';
import { fabric } from 'fabric';
import { Slider } from '../components/Slider';

export const Opacity = ({ object }: { object: fabric.Object }) => {
    const [timeMinValue, setTimeMinValue] = useState(0);
    const [timeMaxValue, setTimeMaxValue] = useState(100);
    const [timeMinPersent, setTimeMinPersent] = useState(0);
    const [timeMaxPersent, setTimeMaxPersent] = useState(0);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const effects = object.data.effects.map((effect: EffectProps) => {
            if (effect.type === 'Opacity') return { ...effect, option: { ...effect.option, [e.target.name]: e.target.value } };
            return effect;
        });
        object.set('data', { ...object.get('data'), effects });
    };
    const onCheckRange = () => {
        if (timeMaxValue - timeMinValue < 3) {
            setTimeMaxValue(timeMaxValue + 1);
            setTimeMinValue(timeMinValue - 1);
        } else {
            setTimeMinPersent((timeMinValue / 100) * 100 + 1);
            setTimeMaxPersent(101 - (timeMaxValue / 100) * 100 + 1);
        }
    };
    return (
        <div className="flex flex-wrap justify-between mb-2">
            <div className="flex w-[40%] justify-between">
                <span className="flex ">
                    <BiBadge className="mr-1" />
                    <h5>Opacity</h5>
                </span>
                <span className="flex">
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
                timeMinPersent={timeMinPersent}
                timeMaxPersent={timeMaxPersent}
            />
        </div>
    );
};
