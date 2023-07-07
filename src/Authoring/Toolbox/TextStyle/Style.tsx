import { editorAtom } from '@/atoms/atom';
import StrokeText from './StrokeText';
import StrokeWidth from './StrokeWidth';
import { useAtom, useAtomValue } from 'jotai';
import { activeObjectAtom } from '@/atoms/atom';
import FontSize from './FontSize';
import FontColor from './FontColor';
import FontFamily from './FontFamily';
import FontStyle from './FontStyle';
import { useEffect } from 'react';

export default function Style() {
    const editor = useAtomValue(editorAtom);
    const canvas = editor?.canvas;
    const [activeObject, setActiveObject] = useAtom(activeObjectAtom);

    useEffect(() => {
        const handleObjectUpdate = () => {
            const active = canvas?.getActiveObject() as fabric.Object;
            if (!active) return;
            setActiveObject(active);
        };

        const handleObjectModified = () => {
            const active = canvas?.getActiveObject() as fabric.Object;
            if (!active) return;
            setActiveObject(active);
        };

        const handleSelectionCreated = () => {
            const active = canvas?.getActiveObject() as fabric.Object;
            if (!active) return;
            setActiveObject(active);
        };

        const handleSelectionCleared = () => {
            setActiveObject({});
        };

        if (canvas) {
            canvas.on('object:added', handleObjectUpdate);
            canvas.on('object:modified', handleObjectModified);
            canvas.on('selection:created', handleSelectionCreated);
            canvas.on('selection:cleared', handleSelectionCleared);
        }

        return () => {
            if (canvas) {
                canvas.off('object:added', handleObjectUpdate);
                canvas.off('object:modified', handleObjectModified);
                canvas.off('selection:created', handleSelectionCreated);
                canvas.off('selection:cleared', handleSelectionCleared);
            }
        };
    }, [canvas]);

    return (
        <>
            {activeObject && (activeObject as any).type === 'textbox' ? (
                <>
                    <div className="w-0 h-7 mx-2 border self-center" />
                    <FontColor />
                    <StrokeText />
                    <StrokeWidth />
                    <FontStyle />
                    <FontSize />
                    <FontFamily />
                </>
            ) : null}
        </>
    );
}
