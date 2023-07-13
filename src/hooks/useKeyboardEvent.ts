import { useCallback, useEffect, useMemo } from 'react';
import useDelete from './useKeyboardEvent/useDelete';
import useMove from './useKeyboardEvent/useMove';
import useScale from './useKeyboardEvent/useScale';
import useSave from './useKeyboardEvent/useSave';
import useCopy from './useKeyboardEvent/useCopy';
import usePaste from './useKeyboardEvent/usePaste';
import { editorAtom } from '@/atoms/atom';
import { useAtomValue } from 'jotai';
import Editor from '@/Editor/Editor';

export default function useKeyboardEvent() {
    const editor = useAtomValue(editorAtom);
    // const activeObject = useAtomValue(activeObjectAtom);
    const { onDelete } = useDelete();
    const { onMove } = useMove();
    const { onScale } = useScale();
    const { onSave } = useSave();
    const { onCopy } = useCopy();
    const { onPaste } = usePaste();
    const arrows = useMemo(() => ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'], []);
    const scales = useMemo(() => ['Minus', 'Equal'], []);

    const keyEventHandler = useCallback(
        (e: KeyboardEvent) => {
            const { ctrlKey, metaKey, code } = e;
            if (code === 'Delete') onDelete(editor as Editor);
            if ((metaKey || ctrlKey) && code === 'KeyC') onCopy(editor as Editor);
            if ((metaKey || ctrlKey) && code === 'KeyV') onPaste(editor as Editor);
            if (arrows.includes(code)) onMove(code, editor as Editor);
            if (scales.includes(code)) onScale(code, editor as Editor);
            if ((metaKey || ctrlKey) && code === 'KeyS') {
                e.preventDefault();
                onSave(editor as Editor);
            }
        },
        [onDelete, onCopy, onMove, onScale, onSave, onPaste, arrows, scales, editor]
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
