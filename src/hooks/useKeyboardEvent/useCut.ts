import Editor from '@/Editor/Editor';
import { cloneAtom } from '@/atoms/atom';
import { useSetAtom } from 'jotai';
import { indexAtom } from '@/Authoring/Toolbox/atom';

export function useCut() {
    const setClone = useSetAtom(cloneAtom);
    const setIndex = useSetAtom(indexAtom);

    const onCut = (editor: Editor) => {
        const objects = editor.canvas.getActiveObjects();
        setClone(objects);
        setIndex(true);

        objects.map((object) => {
            editor.canvas.remove(object);
        });
    };

    return { onCut };
}
