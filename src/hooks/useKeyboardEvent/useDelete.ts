import Editor from '@/Editor/Editor';
import { useSetAtom } from 'jotai';
import { objectsAtom } from '@/atoms/atom';
import { indexAtom } from '@/Authoring/Toolbox/atom';

export default function useDelete() {
    const setObjects = useSetAtom(objectsAtom);
    const setIndex = useSetAtom(indexAtom);

    const onDelete = (object: fabric.Object, editor: Editor) => {
        const objects = editor.remove(object);
        if (objects) setObjects(objects);
        setIndex(true);
    };

    return { onDelete };
}
