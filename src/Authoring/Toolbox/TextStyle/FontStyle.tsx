import { editorAtom } from '@/atoms/atom';
import { IconButtonV1 } from '@/components/Button';
import { useAtomValue } from 'jotai';
import { BiBold, BiItalic } from 'react-icons/bi';

export default function FontStyle() {
    const editor = useAtomValue(editorAtom);
    const canvas = editor?.canvas;
    const activeObject: any = canvas?.getActiveObject();

    const boldBtnClick = () => {
        if (activeObject.fontWeight === 'bold') {
            activeObject?.set('fontWeight', '');
        } else {
            activeObject?.set('fontWeight', 'bold');
        }
        canvas?.renderAll();
    };

    const italicBtnClick = () => {
        if (activeObject.fontStyle === 'italic') {
            activeObject.set('fontStyle', '');
        } else {
            activeObject.set('fontStyle', 'italic');
        }
        canvas?.renderAll();
    };
    return (
        <div className="flex gap-1">
            <IconButtonV1 onClick={boldBtnClick}>
                <BiBold />
            </IconButtonV1>
            <IconButtonV1 onClick={italicBtnClick}>
                <BiItalic />
            </IconButtonV1>
        </div>
    );
}
