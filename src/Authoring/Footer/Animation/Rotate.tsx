import { BiBadge } from 'react-icons/bi';

export const Rotate = () => {
    return (
        <div className="flex flex-wrap justify-between mb-2">
            <div className="flex">
                <BiBadge className="mr-1" />
                <div>Rotate</div>
            </div>
            <div className="flex justify-end">
                <label className="mr-2">Angle</label>
                <input className="rounded-sm px-2 w-[80%] shadow-[0_1px_#cdd8dd]" />
            </div>
        </div>
    );
};
