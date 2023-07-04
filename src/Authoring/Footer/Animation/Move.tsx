import { BiBadge } from 'react-icons/bi';

export const Move = () => {
    return (
        <div className="flex flex-wrap justify-between mb-2">
            <div className="flex">
                <BiBadge className="mr-1" />
                <div>Move</div>
            </div>
            <div className="flex">
                <div className="flex justify-end">
                    <label className="mr-2">x</label>
                    <input className="rounded-sm px-2 w-[80%] shadow-[0_1px_#cdd8dd]" />
                </div>
                <div className="flex justify-end">
                    <label className="mr-2">y</label>
                    <input className="rounded-sm px-2 w-[80%] shadow-[0_1px_#cdd8dd]" />
                </div>
            </div>
        </div>
    );
};
