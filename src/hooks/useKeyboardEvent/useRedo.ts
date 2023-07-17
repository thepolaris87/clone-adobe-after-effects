import Editor from '@/Editor/Editor';
import { useAtomValue, useSetAtom } from 'jotai';
import { newStackAtom, stackAtom } from '@/atoms/atom';
import { indexAtom } from '@/Authoring/Toolbox/atom';

export const useRedo = () => {
    const newStack = useAtomValue(newStackAtom);
    const stack = useAtomValue(stackAtom);
    const setIndex = useSetAtom(indexAtom);

    const onRedo = async (editor: Editor) => {
        if (newStack.length >= 1) {
            const obj = newStack.shift();
            if (obj) stack.push(obj);
            await editor.asyncLoad(stack.length === 0 ? [] : stack[stack.length - 1]);
            setIndex(true);
        }
    };
    return { onRedo };
};
