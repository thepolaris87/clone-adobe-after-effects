import Editor from '@/Editor/Editor';

export const useScale = () => {
    const onScale = (code: string, editor: Editor) => {
        const object = editor.canvas.getActiveObject();
        if (!object) return;
        if (code === 'Minus') {
            object.set('scaleX', (object.scaleX as number) - 0.1);
            object.set('scaleY', (object.scaleY as number) - 0.1);
        }
        if (code === 'Equal') {
            object.set('scaleX', (object.scaleX as number) + 0.1);
            object.set('scaleY', (object.scaleY as number) + 0.1);
        }
        editor.canvas.renderAll();
    };

    return { onScale };
};
