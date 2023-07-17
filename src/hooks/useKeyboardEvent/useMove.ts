import Editor from '@/Editor/Editor';

export const useMove = () => {
    const onMove = (code: string, editor: Editor) => {
        const object = editor.canvas.getActiveObject();
        if (!object) return;
        if (code === 'ArrowLeft') object.set('left', (object.left as number) - 10);
        if (code === 'ArrowRight') object.set('left', (object.left as number) + 10);
        if (code === 'ArrowUp') object.set('top', (object.top as number) - 10);
        if (code === 'ArrowDown') object.set('top', (object.top as number) + 10);
        editor.canvas.renderAll();
    };

    return { onMove };
};
