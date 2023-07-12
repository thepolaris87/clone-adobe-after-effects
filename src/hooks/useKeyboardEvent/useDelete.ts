import Editor from '@/Editor/Editor';
import { useSetAtom } from 'jotai';
import { activeObjectAtom, objectsAtom } from '@/atoms/atom';
import { indexAtom } from '@/Authoring/Toolbox/atom';

export default function useDelete() {
    const setObjects = useSetAtom(objectsAtom);
    const setIndex = useSetAtom(indexAtom);
    const setActiveObject = useSetAtom(activeObjectAtom);

    const onDelete = (editor: Editor) => {
        const objects = editor?.canvas.getActiveObjects();
        objects.forEach((object) => {
            const objects = editor.remove(object);
            if (objects) setObjects(objects);
            setIndex(true);
        });
        setActiveObject(null);
    };

    return { onDelete };
}
