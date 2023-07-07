import { useEffect, useRef, useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';

const list = ['fontFamily1', 'fontFamily2', 'fontFamily3', 'fontFamily4'];
export default function FontFamily() {
    const [isOpen, setIsOpen] = useState(false);
    const [font, setFont] = useState('fontFamily1');
    const outsideRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (outsideRef.current && !outsideRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [outsideRef]);
    return (
        <div className="relative flex items-center">
            <div ref={outsideRef}>
                <button className="flex w-32 h-6 bg-white rounded justify-between px-[0.5rem]" onClick={() => setIsOpen(!isOpen)}>
                    <div className="w-24 truncate">{font}</div>
                    <FaCaretDown className="w-[0.6rem]" />
                </button>
            </div>
            {isOpen && (
                <div className="absolute top-8 min-w-[8rem] bg-white z-10 p-2 rounded-md">
                    {list.map((el, i) => {
                        return (
                            <div key={i} onClick={() => setFont(el)}>
                                {el}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
