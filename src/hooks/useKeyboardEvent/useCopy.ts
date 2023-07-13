import Editor from '@/Editor/Editor';
import { useSetAtom } from 'jotai';
import { objectsAtom } from '@/atoms/atom';
import { indexAtom } from '@/Authoring/Toolbox/atom';
import { nanoid } from 'nanoid';
import { fabric } from 'fabric';

export default function useCopy() {
    const setObjects = useSetAtom(objectsAtom);
    const setIndex = useSetAtom(indexAtom);

    const onCopy = (object: fabric.Object, editor: Editor) => {
        const objects = editor.canvas.getActiveObjects();
        // const clone = { ...objects };
        // const clone = { ...object };
        // clone.data = { ...object.data, id: nanoid() };
        // const obj = new fabric.Object(clone);
        // const objects = editor.add(obj);
        // console.log(objects);
        // if (objects) setObjects(objects);
        // setIndex(true);
    };

    return { onCopy };
}
