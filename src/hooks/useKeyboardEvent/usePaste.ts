import Editor from '@/Editor/Editor';
import { cloneAtom, objectsAtom } from '@/atoms/atom';
import { useAtomValue, useSetAtom } from 'jotai';
import { nanoid } from 'nanoid';

export const usePaste = () => {
    const clones = useAtomValue(cloneAtom);
    const setObjects = useSetAtom(objectsAtom);

    const onUpdate = (clone: fabric.Object, obj: fabric.Object, editor: Editor) => {
        const data = obj.get('data');
        clone.data = { ...data, id: nanoid() };
        clone.left = (obj.left as number) + 15;
        clone.top = (obj.top as number) + 15;
        editor.canvas.add(clone);
        editor.canvas.setActiveObject(clone);
        const objects = editor.canvas.getObjects();
        setObjects(objects);
    };

    const onPaste = (editor: Editor) => {
        clones?.forEach((obj) => {
            obj.clone((clone: fabric.Object) => onUpdate(clone, obj, editor));
        });
    };

    return { onPaste };
};
