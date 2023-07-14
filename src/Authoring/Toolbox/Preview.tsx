import { editorAtom } from '@/atoms/atom';
import { IconButtonV1 } from '@/components/Button';
import { useAtomValue } from 'jotai';
import { useState } from 'react';
import { MdPreview } from 'react-icons/md';

export default function Preview() {
    const editor = useAtomValue(editorAtom);
    const canvas = editor?.canvas;
    const [src, setSrc] = useState<string | undefined>(undefined);
    const [isOpen, setIsOpen] = useState(false);

    const onPreviewClick = () => {
        setSrc(canvas?.toDataURL());
        setIsOpen(!isOpen);
    };
    return (
        <div className="relative">
            <IconButtonV1 onClick={onPreviewClick}>
                <MdPreview />
            </IconButtonV1>
            {isOpen && (
                <div className="absolute w-[600px] h-auto z-10 bg-white p-3">
                    <img src={src} className="border border-gray-300" />
                </div>
            )}
        </div>
    );
}
