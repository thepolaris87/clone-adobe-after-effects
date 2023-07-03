import { IconButtonV1 } from '@/components/Button';
import { useState } from 'react';
// import { ChromePicker } from 'react-color';
import { AiOutlineFontColors } from 'react-icons/ai';

export default function FontColor() {
    const [color, setColor] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const onButtonClick = () => {
        setIsOpen(!isOpen);
    };
    
    return (
        <div>
            <IconButtonV1>
                <AiOutlineFontColors onClick={onButtonClick} />
                {/* <ChromePicker /> */}
            </IconButtonV1>
        </div>
    );
}
