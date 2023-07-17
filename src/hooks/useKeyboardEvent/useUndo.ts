import Editor from '@/Editor/Editor';
import { useAtomValue, useSetAtom, useAtom } from 'jotai';
import { stackAtom, newStackAtom } from '@/atoms/atom';
import { indexAtom } from '@/Authoring/Toolbox/atom';

export default function useUndo() {
    const stack = useAtomValue(stackAtom);
    const [newStack, setNewStack] = useAtom(newStackAtom);
    const setIndex = useSetAtom(indexAtom);

    const onUndo = async (editor: Editor) => {
        if (stack) {
            const obj = stack.pop();
            if (obj) setNewStack([...newStack, obj]);
        }
        await editor.asyncLoad(stack.length === 0 ? [] : stack[stack.length - 1]);
        setIndex(true);
    };
    return { onUndo };
}
