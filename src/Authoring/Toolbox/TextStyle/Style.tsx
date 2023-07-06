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
        canvas?.on('selection:updated', function () {
            const active = canvas.getActiveObject() as fabric.Object;
            if (!active) return;
            setActiveObject(active);
        });

        canvas?.on('object:modified', function () {
            const active = canvas.getActiveObject() as fabric.Object;
            if (!active) return;
            setActiveObject(active);
        });

        canvas?.on('selection:created', function () {
            const active = canvas.getActiveObject() as fabric.Object;
            if (!active) return;
            setActiveObject(active);
        });

        canvas?.on('selection:cleared', function () {
            setActiveObject({});
        });

        return () => {
            canvas?.off();
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
