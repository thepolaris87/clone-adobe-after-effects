import { useEffect, useRef } from 'react';
import useEditor from './useEditor';

const [w, h] = [4, 3];
const scale = 150;

export default function Viewer() {
    const canvas = useRef<HTMLCanvasElement>(null);
    const editor = useEditor(canvas);

    useEffect(() => {
        const data = window.localStorage.getItem('fabric');
        if (data) {
            editor?.asyncLoad(data).then(() => {
                editor?.canvas.on('mouse:up', () => {});
                editor?.canvas.on('object:modified', () => {});
            });
        }
    }, [editor]);

    return (
        <div className="p-2">
            <canvas className="border" ref={canvas} width={w * scale} height={h * scale}></canvas>
        </div>
    );
}
