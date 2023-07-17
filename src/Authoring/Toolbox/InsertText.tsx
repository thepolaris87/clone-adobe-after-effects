import fabric from '@fabric';
import { editorAtom, objectsAtom, stackAtom } from '@/atoms/atom';
import { IconButtonV1 } from '@/components/Button';
import { useAtomValue, useSetAtom, useAtom } from 'jotai';
import { nanoid } from 'nanoid';
import { MdTextFields } from 'react-icons/md';

export default function InsertText() {
    const editor = useAtomValue(editorAtom);
    const setObjects = useSetAtom(objectsAtom);
    const [stack, setStack] = useAtom(stackAtom);

    const onInsertButtonClick = () => {
        const text = new fabric.Textbox('TEXT');
        text.set('data', { type: 'textbox', id: nanoid(), effects: [] });
        if (!editor) return;
        const objects = editor.add(text);
        if (objects) setObjects(objects);
        const data = editor.canvas.toObject(['data']);
        setStack([...stack, JSON.stringify(data)]);
    };

    return (
        <IconButtonV1 onClick={onInsertButtonClick}>
            <MdTextFields />
        </IconButtonV1>
    );
}
