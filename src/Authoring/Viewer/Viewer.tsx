import { useEffect, useRef } from 'react';
import useEditor from './useEditor';

export default function Viewer() {
    const canvas = useRef<HTMLCanvasElement>(null);
    const editor = useEditor(canvas);

    return (
        <div>
            Viewer
            <canvas ref={canvas}></canvas>
        </div>
    );
}
