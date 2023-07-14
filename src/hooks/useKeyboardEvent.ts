import { useCallback, useEffect, useMemo } from 'react';
import useDelete from './useKeyboardEvent/useDelete';
import useMove from './useKeyboardEvent/useMove';
import useScale from './useKeyboardEvent/useScale';
import useSave from './useKeyboardEvent/useSave';
import useCopy from './useKeyboardEvent/useCopy';
import usePaste from './useKeyboardEvent/usePaste';
import useCut from './useKeyboardEvent/useCut';
import useAlign from './useKeyboardEvent/useAlign';
import useUndo from './useKeyboardEvent/useUndo';
import { editorAtom } from '@/atoms/atom';
import { useAtomValue } from 'jotai';
import Editor from '@/Editor/Editor';

export default function useKeyboardEvent() {
    const editor = useAtomValue(editorAtom);
    const { onDelete } = useDelete();
    const { onMove } = useMove();
    const { onScale } = useScale();
    const { onSave } = useSave();
    const { onCopy } = useCopy();
    const { onPaste } = usePaste();
    const { onCut } = useCut();
    const { onAlign } = useAlign();
    const { onUndo } = useUndo();
    const arrows = useMemo(() => ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'], []);
    const scales = useMemo(() => ['Minus', 'Equal'], []);

    const keyEventHandler = useCallback(
        (e: KeyboardEvent) => {
            const { ctrlKey, metaKey, shiftKey, code } = e;
            if (code === 'Delete') onDelete(editor as Editor);
            if ((metaKey || ctrlKey) && code === 'KeyC') onCopy(editor as Editor);
            if ((metaKey || ctrlKey) && code === 'KeyV') onPaste(editor as Editor);
            if (arrows.includes(code)) onMove(code, editor as Editor);
            if (scales.includes(code)) onScale(code, editor as Editor);
            if ((metaKey || ctrlKey) && code === 'KeyS') {
                e.preventDefault();
                onSave(editor as Editor);
            }
            if ((metaKey || ctrlKey) && code === 'KeyX') onCut(editor as Editor);
            if ((metaKey || ctrlKey) && shiftKey && code === 'Backslash') onAlign(editor as Editor);
            if ((metaKey || ctrlKey) && code === 'KeyZ') onUndo(editor as Editor);
        },
        [onDelete, onCopy, onMove, onScale, onSave, onPaste, onCut, onAlign, onUndo, arrows, scales, editor]
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
