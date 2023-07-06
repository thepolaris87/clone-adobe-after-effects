import { Input } from './Input';
import { useAtomValue } from 'jotai';
import { activeObjectAtom } from '@/atoms/atom';

export const Slider = ({ timeMinValue, timeMaxValue, setTimeMaxValue, setTimeMinValue, onCheckRange, objectId }: SliderProps) => {
    const activeObj = useAtomValue(activeObjectAtom);

    return (
        <div className={'hidden sm:flex w-[55%] items-center relative'} style={{ backgroundColor: objectId === activeObj.data.id ? '#dddbdb' : '#ecebeb' }}>
            <Input value={timeMinValue} onCheck={onCheckRange} setValue={setTimeMinValue} />
            <Input value={timeMaxValue} onCheck={onCheckRange} setValue={setTimeMaxValue} />
            <div className="relative h-[7px] w-full rounded-[4px]" style={{ backgroundColor: objectId === activeObj.data.id ? '#ecebeb' : '#dddddd' }}>
                <div className="absolute rounded-[10px] h-[7px] bg-[#b0b0b0]" style={{ left: timeMinValue + '%', right: 100 - timeMaxValue + '%' }} />
            </div>
        </div>
    );
};
