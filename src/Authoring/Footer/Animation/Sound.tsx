import { useState, useRef, useEffect } from 'react';
import { BiBadge } from 'react-icons/bi';

export const Sound = ({ sounds }: { sounds?: TGetSound[] }) => {
    const [open, setOpen] = useState(false);
    const divRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        document.addEventListener('click', (e) => {
            if (e.target === inputRef.current) setOpen(true);
            else if (divRef.current && !divRef.current.contains(e.target as Node)) setOpen(false);
            else setOpen(false);
        });
    }, [divRef]);

    return (
        <div className="flex flex-wrap justify-between mb-2">
            <div className="flex">
                <BiBadge className="mr-1" />
                <div>Sound</div>
            </div>
            <div className="relative">
                <input
                    type="button"
                    className="w-[192px] rounded-sm px-2 shadow-[0_1px_#cdd8dd] bg-[white] cursor-pointer"
                    value="Sound"
                    onClick={() => setOpen(true)}
                    ref={inputRef}
                ></input>
                <div ref={divRef}>
                    {open && (
                        <ul className="bg-[white] w-full h-[300px] shadow-[1px_1px_3px_1px_#cdd8dd] overflow-scroll text-center cursor-pointer absolute top-[-150px] z-10">
                            {sounds?.map((sound, index) => {
                                return (
                                    <li key={index} className="hover:bg-[#d9edf4]">
                                        {sound.soundId}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};
