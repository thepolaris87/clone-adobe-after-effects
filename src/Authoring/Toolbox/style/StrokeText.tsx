import { editorAtom } from '@/atoms/atom';
import { IconButtonV1 } from '@/components/Button';
import { useAtomValue } from 'jotai';
import { MdBorderColor } from 'react-icons/md';
import { useState } from 'react';
// import { ChromePicker } from 'react-color'

export default function StrokeText() {
    const editor = useAtomValue(editorAtom);
    const canvas = editor?.canvas;
    const text = canvas?.getActiveObject();
    const [color, setColor] = useState("");
    const [isOpen, setIsOpen] = useState(false)
    const onStrokeButtonClick = () => {
        setIsOpen(!isOpen);
    };
    const handleChangeComplete = (color: any) => {
        setColor(color);
        if (text) {
            text?.set('stroke', color.hex);
            editor?.add(text);
        }
    };

    return (
        <div className='relative'>
        <IconButtonV1 onClick={onStrokeButtonClick}>
            <MdBorderColor />
        </IconButtonV1>
        { isOpen && 
        <>
        {/* <ChromePicker color={color} onChangeComplete={handleChangeComplete}/>  */}
        </>}
        </div>
    );
}
