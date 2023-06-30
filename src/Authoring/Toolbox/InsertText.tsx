import fabric from '@fabric';
import { editorAtom } from '@/atoms/atom';
import { IconButtonV1 } from '@/components/Button';
import { useAtomValue } from 'jotai';
import { nanoid } from 'nanoid';
import { MdTextFields } from 'react-icons/md';

export default function InsertText() {
    const editor = useAtomValue(editorAtom);
    const onInsertButtonClick = () => {
        const text = new fabric.Textbox('TEXT');
        text.set('data', { type: 'textbox', id: nanoid() });
        editor?.add(text);
    };

    return (
        <IconButtonV1 onClick={onInsertButtonClick}>
            <MdTextFields />
        </IconButtonV1>
    );
}
