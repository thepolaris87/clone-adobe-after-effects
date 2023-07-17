import Editor from '@/Editor/Editor';

export const useAlign = () => {
    const onAlign = (editor: Editor) => {
        const objects = editor.canvas.getActiveObject();
        if (!objects) return;

        (objects as fabric.Group)._objects.forEach((object) => {
            const bounding = object.getBoundingRect();
            object.set('left', 0 - bounding.width / 2);
            object.set('top', 0 - bounding.height / 2);
            editor.canvas.renderAll();
        });
    };
    return { onAlign };
};
