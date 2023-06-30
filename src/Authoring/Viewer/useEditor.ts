import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { editorAtom } from '@/atoms/atom';
import Editor from '@/Editor/Editor';

export default function useEditor(ref: React.RefObject<HTMLCanvasElement>) {
    const [editor, setEditor] = useAtom(editorAtom);

    useEffect(() => {
        if (ref.current) {
            const editor = new Editor(ref.current);
            setEditor(editor);
        }
    }, [ref, setEditor]);

    return editor;
}
