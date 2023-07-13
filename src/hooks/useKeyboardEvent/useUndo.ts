import Editor from '@/Editor/Editor';
import { useAtomValue, useSetAtom } from 'jotai';
import { stackAtom } from '@/atoms/atom';
import { indexAtom } from '@/Authoring/Toolbox/atom';

export default function useUndo() {
    const stack = useAtomValue(stackAtom);
    const setIndex = useSetAtom(indexAtom);

    const onUndo = (editor: Editor) => {
        if (stack) stack.pop();
        editor.asyncLoad(stack[stack.length - 1]);
        setIndex(true);
    };
    return { onUndo };
}
