import { editorAtom } from '@/atoms/atom';
import { activeObjectAtom } from '@/atoms/style';
import { IconButtonV1 } from '@/components/Button';
import { useAtomValue } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { RxBorderWidth } from 'react-icons/rx';

const width = [1, 2, 3, 4, 8, 12, 16, 24];
export default function StrokeWidth() {
    const editor = useAtomValue(editorAtom);
    const canvas = editor?.canvas;
    const activeObject: any = useAtomValue(activeObjectAtom);
    const [isOpen, setIsOpen] = useState(false);
    const [currWidth, setCurrWidth] = useState<number>();
    const outsideRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: any) => {
            if (outsideRef.current && !outsideRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [outsideRef]);

    const onClick = (el: number) => {
        activeObject.set('strokeWidth', el);
        setCurrWidth(el);
    };

    useEffect(() => {
        canvas?.renderAll();
    }, [currWidth]);

    return (
        <div ref={outsideRef} className="relative">
            <IconButtonV1 onClick={() => setIsOpen(!isOpen)}>
                <RxBorderWidth />
            </IconButtonV1>
            {isOpen && (
                <>
                    <div className="absolute w-[5rem] h-auto bg-white rounded-xl shadow-lg items-center py-3 px-3 z-10">
                        {width.map((el) => {
                            return (
                                <div className={el !== width[width.length - 1] ? `py-1 border-b-2` : `py-1`} key={el} onClick={() => onClick(el)}>
                                    {el}px
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
}
