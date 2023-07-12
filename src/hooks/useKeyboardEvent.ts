import { useCallback, useEffect } from 'react';
import useDelete from './useKeyboardEvent/useDelete';
import { activeObjectAtom, editorAtom } from '@/atoms/atom';
import { useAtomValue } from 'jotai';
import Editor from '@/Editor/Editor';

export default function useKeyboardEvent() {
    const editor = useAtomValue(editorAtom);
    const activeObject = useAtomValue(activeObjectAtom);
    const { onDelete } = useDelete();

    const keyEventHandler = useCallback(
        (e: KeyboardEvent) => {
            console.log('몇 번');
            const { ctrlKey, metaKey, code, shiftKey } = e;
            if (code === 'Delete') onDelete(activeObject as fabric.Object, editor as Editor);
        },
        [onDelete, activeObject, editor]
    );

    useEffect(() => {
        window.addEventListener('keydown', keyEventHandler);
        const canvas = document.querySelector('canvas');
        if (canvas) canvas.setAttribute('tabIndex', '0');
        return () => {
            window.removeEventListener('keydown', keyEventHandler);
        };
    }, [keyEventHandler]);
}
