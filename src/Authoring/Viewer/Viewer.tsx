import { useEffect, useRef } from 'react';
import useEditor from './useEditor';
import { useSetAtom } from 'jotai';
import { activeObjectAtom } from '@/atoms/atom';
import useKeyboardEvent from '@/hooks/useKeyboardEvent';

const [w, h] = [4, 3];
const scale = 150;

export default function Viewer() {
    const canvas = useRef<HTMLCanvasElement>(null);
    const editor = useEditor(canvas);
    const setActiveObject = useSetAtom(activeObjectAtom);
    useKeyboardEvent();

    useEffect(() => {
        const data = window.localStorage.getItem('fabric');
        if (data) {
            editor?.asyncLoad(data).then(() => {
                editor?.canvas.on('mouse:up', () => {
                    const active = editor?.canvas?.getActiveObject() as fabric.Object;
                    if (!active) return;
                    setActiveObject(active);
                });
                editor?.canvas.on('object:modified', () => {});
            });
        }
    }, [editor, setActiveObject]);

    return (
        <div className="p-2">
            <canvas className="border" ref={canvas} width={w * scale} height={h * scale}></canvas>
        </div>
    );
}
