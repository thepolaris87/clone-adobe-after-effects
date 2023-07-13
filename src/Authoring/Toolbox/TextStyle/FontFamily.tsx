import { activeObjectAtom, editorAtom } from '@/atoms/atom';
import { useAtomValue } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';

const list = ['NotoSansKRRegular', 'NanumSquereRoundR', 'NanumSquereRoundB', 'ONEMobilePOP'];
export default function FontFamily() {
    const editor = useAtomValue(editorAtom);
    const canvas = editor?.canvas;
    const [isOpen, setIsOpen] = useState(false);
    const outsideRef = useRef<HTMLDivElement | null>(null);
    const activeObject = useAtomValue(activeObjectAtom);
    const [font, setFont] = useState('');
    useEffect(() => {
        if (!activeObject) return;
        setFont((activeObject as any).fontFamily);
    }, [activeObject, canvas]);

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

    useEffect(() => {
        (activeObject as any).set('fontFamily', font);
        canvas?.renderAll();
    }, [font]);

    return (
        <div className="relative flex items-center">
            <div ref={outsideRef}>
                <button className="flex w-32 h-6 bg-white rounded justify-between px-[0.5rem]" onClick={() => setIsOpen(!isOpen)}>
                    <div className="w-24 truncate" style={{ fontFamily: font }}>
                        {font}
                    </div>
                    <FaCaretDown className="w-[0.6rem]" />
                </button>
            </div>
            {isOpen && (
                <div className="absolute top-8 min-w-[8rem] bg-white z-10 p-2 rounded-md">
                    {list.map((el, i) => {
                        return (
                            <div key={i} onClick={() => setFont(el)} style={{ fontFamily: el }}>
                                {el}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
