import { Input } from './Input';
import '../css/Slider.css';

export const Slider = ({ timeMinValue, timeMaxValue, setTimeMaxValue, setTimeMinValue, onCheckRange, timeMinPersent, timeMaxPersent }: SliderProps) => {
    return (
        <div className="hidden sm:flex w-[55%] items-center relative bg-[#ecebeb]">
            <Input value={timeMinValue} onCheck={onCheckRange} setValue={setTimeMinValue} />
            <Input value={timeMaxValue} onCheck={onCheckRange} setValue={setTimeMaxValue} />
            <div className="relative h-[7px] w-full rounded-[4px] bg-[#dddddd]">
                <div className="absolute rounded-[10px] h-[7px] bg-[#b0b0b0]" style={{ left: timeMinPersent + '%', right: timeMaxPersent + '%' }} />
            </div>
        </div>
    );
};
