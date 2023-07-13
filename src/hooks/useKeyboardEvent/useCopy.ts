import Editor from '@/Editor/Editor';
import { cloneAtom } from '@/atoms/atom';
import { useSetAtom } from 'jotai';

export default function useCopy() {
    const setClone = useSetAtom(cloneAtom);

    const onCopy = (editor: Editor) => {
        const object = editor.canvas.getActiveObjects();
        setClone(object);
    };

    return { onCopy };
}
