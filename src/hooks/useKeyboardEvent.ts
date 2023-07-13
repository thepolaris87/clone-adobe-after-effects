import { useCallback, useEffect, useMemo } from 'react';
import useDelete from './useKeyboardEvent/useDelete';
import useCopy from './useKeyboardEvent/useCopy';
import useMove from './useKeyboardEvent/useMove';
import useScale from './useKeyboardEvent/useScale';
import useSave from './useKeyboardEvent/useSave';
import { activeObjectAtom, editorAtom } from '@/atoms/atom';
import { useAtomValue } from 'jotai';
import Editor from '@/Editor/Editor';

export default function useKeyboardEvent() {
    const editor = useAtomValue(editorAtom);
    const activeObject = useAtomValue(activeObjectAtom);
    const { onDelete } = useDelete();
    const { onCopy } = useCopy();
    const { onMove } = useMove();
    const { onScale } = useScale();
    const { onSave } = useSave();
    const arrows = useMemo(() => ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'], []);
    const scales = useMemo(() => ['Minus', 'Equal'], []);

    const keyEventHandler = useCallback(
        (e: KeyboardEvent) => {
            const { ctrlKey, metaKey, code, shiftKey } = e;
            if (code === 'Delete') onDelete(editor as Editor);
            if (metaKey && code === 'KeyC') onCopy(activeObject as fabric.Object, editor as Editor);
            if (arrows.includes(code)) onMove(code, editor as Editor);
            if (scales.includes(code)) onScale(code, editor as Editor);
            if (metaKey || code === 'keyS') {
                console.log(e);
                e.preventDefault();
                onSave(editor as Editor);
            }
        },
        [onDelete, onCopy, onMove, onScale, onSave, arrows, scales, activeObject, editor]
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
