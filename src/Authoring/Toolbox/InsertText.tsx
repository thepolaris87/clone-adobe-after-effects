import fabric from '@fabric';
import { editorAtom, objectsAtom } from '@/atoms/atom';
import { IconButtonV1 } from '@/components/Button';
import { useAtomValue, useSetAtom } from 'jotai';
import { nanoid } from 'nanoid';
import { MdTextFields } from 'react-icons/md';

export default function InsertText() {
    const editor = useAtomValue(editorAtom);
    const setObjects = useSetAtom(objectsAtom);

    const onInsertButtonClick = () => {
        const text = new fabric.Textbox('TEXT');
        text.set('data', { type: 'textbox', id: nanoid(), effects: [] });
        const objects = editor?.add(text);
        if (objects) setObjects(objects);
    };

    return (
        <IconButtonV1 onClick={onInsertButtonClick}>
            <MdTextFields />
        </IconButtonV1>
    );
}
