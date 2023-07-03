import { activeObjectAtom } from '@/atoms/style';
import { IconButtonV1 } from '@/components/Button';
import { useAtomValue } from 'jotai';
import { useState } from 'react';
import { RxBorderWidth } from 'react-icons/rx';

const width = [1, 2, 3, 4, 8, 12, 16, 24];
export default function StrokeWidth() {
    const activeObject = useAtomValue(activeObjectAtom);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <IconButtonV1 onClick={() => setIsOpen(!isOpen)}>
                <RxBorderWidth />
            </IconButtonV1>
            {isOpen && (
                <>
                    <div className="absolute w-[5rem] h-auto bg-white rounded-xl shadow-lg items-center py-3 px-3 z-10">
                        {width.map((el) => {
                            return (
                                <div className={(el !== width[width.length - 1]) ? `py-1 border-b-2` : `py-1`} key={el} onClick={() => (activeObject as any).set('strokeWidth',  el )}>
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
