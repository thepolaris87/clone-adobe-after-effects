import { useCallback, useEffect, useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { editorAtom } from '@/atoms/atom';
import Editor from '@/Editor/Editor';
import { useAlign, useCopy, useCut, useDelete, useMove, usePaste, useRedo, useUndo, useSave, useScale } from './useKeyboardEvent/index';

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
    const { onRedo } = useRedo();
    const arrows = useMemo(() => ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'], []);
    const scales = useMemo(() => ['Minus', 'Equal'], []);

    const keyEventHandler = useCallback(
        (e: KeyboardEvent) => {
            const { ctrlKey, metaKey, shiftKey, code } = e;
            if (code === 'Delete') onDelete(editor as Editor);
            else if ((metaKey || ctrlKey) && code === 'KeyC') onCopy(editor as Editor);
            else if ((metaKey || ctrlKey) && code === 'KeyV') onPaste(editor as Editor);
            else if ((metaKey || ctrlKey) && arrows.includes(code)) onMove(code, editor as Editor);
            else if (scales.includes(code)) onScale(code, editor as Editor);
            else if ((metaKey || ctrlKey) && code === 'KeyS') {
                e.preventDefault();
                onSave(editor as Editor);
            } else if ((metaKey || ctrlKey) && code === 'KeyX') onCut(editor as Editor);
            else if ((metaKey || ctrlKey) && shiftKey && code === 'Backslash') onAlign(editor as Editor);
            else if ((metaKey || ctrlKey) && shiftKey && code === 'KeyZ') onRedo(editor as Editor);
            else if ((metaKey || ctrlKey) && code === 'KeyZ') onUndo(editor as Editor);
        },
        [onDelete, onCopy, onMove, onScale, onSave, onPaste, onCut, onAlign, onUndo, onRedo, arrows, scales, editor]
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
