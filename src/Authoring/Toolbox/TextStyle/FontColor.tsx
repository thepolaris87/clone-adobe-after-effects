import { editorAtom } from '@/atoms/atom';
import { IconButtonV1 } from '@/components/Button';
import { useAtomValue } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { ChromePicker } from 'react-color';
import { AiOutlineFontColors } from 'react-icons/ai';

export default function FontColor() {
    const editor = useAtomValue(editorAtom);
    const canvas = editor?.canvas;
    const text = canvas?.getActiveObject();
    const [color, setColor] = useState('');
    const [isOpen, setIsOpen] = useState(false);
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

    const onButtonClick = () => {
        setIsOpen(!isOpen);
    };
    const handleChangeComplete = (color: any) => {
        setColor(color);
        if (text) {
            text?.set('fill', color.hex);
            editor?.add(text);
        }
    };

    return (
        <div ref={outsideRef}>
            <IconButtonV1>
                <AiOutlineFontColors onClick={onButtonClick} />
            </IconButtonV1>
            {isOpen && (
                <>
                    <ChromePicker className="absolute z-10" color={color} onChangeComplete={handleChangeComplete} />
                </>
            )}
        </div>
    );
}