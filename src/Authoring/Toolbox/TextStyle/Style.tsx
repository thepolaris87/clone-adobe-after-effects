import { editorAtom } from '@/atoms/atom';
import StrokeText from './StrokeText';
import StrokeWidth from './StrokeWidth';
import { useAtom, useAtomValue } from 'jotai';
import { activeObjectAtom, stackAtom } from '@/atoms/atom';
import FontSize from './FontSize';
import FontColor from './FontColor';
import FontFamily from './FontFamily';
import FontStyle from './FontStyle';
import { useEffect } from 'react';

export default function Style() {
    const editor = useAtomValue(editorAtom);
    const canvas = editor?.canvas;
    const [activeObject, setActiveObject] = useAtom(activeObjectAtom);
    const [stack, setStack] = useAtom(stackAtom);

    useEffect(() => {
        const handleObjectUpdate = () => {
            const active = canvas?.getActiveObject() as fabric.Object;
            if (!active) return;
            setActiveObject(active);
        };
        const handleObjectModified = () => {
            const active = canvas?.getActiveObject() as fabric.Object;
            if (!active) return;
            const data = canvas?.toObject(['data']);
            setStack([...stack, JSON.stringify(data)]);
            setActiveObject(active);
        };
        const handleSelectionCreated = () => {
            const active = canvas?.getActiveObject() as fabric.Object;
            if (!active) return;
            setActiveObject(active);
        };
        const handleSelectionUpdated = (e: fabric.IEvent) => {
            if (!e.selected) return;
            setActiveObject(e.selected[0]);
        };
        const handleSelectionCleared = () => {
            setActiveObject(null);
        };

        if (canvas) {
            canvas.on('object:added', handleObjectUpdate);
            canvas.on('object:modified', handleObjectModified);
            canvas.on('selection:created', handleSelectionCreated);
            canvas.on('selection:updated', handleSelectionUpdated);
            canvas.on('selection:cleared', handleSelectionCleared);
        }

        return () => {
            if (canvas) {
                canvas.off('object:added', handleObjectUpdate);
                canvas.off('object:modified', handleObjectModified);
                canvas.off('selection:created', handleSelectionCreated);
                canvas.off('selection:updated', handleSelectionUpdated);
                canvas.off('selection:cleared', handleSelectionCleared);
            }
        };
    }, [canvas, stack, setActiveObject, setStack]);

    return (
        <>
            {activeObject && (activeObject as fabric.Object).type === 'textbox' ? (
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
