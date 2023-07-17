import { editorAtom, objectsAtom } from '@/atoms/atom';
import { activeObjectAtom } from '@/atoms/atom';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { indexAtom } from '../Toolbox/atom';

export default function LeftContent() {
    const editor = useAtomValue(editorAtom);
    const canvas = editor?.canvas;
    const objects = canvas?.getObjects();
    const [indexClick, setIndexClick] = useAtom(indexAtom);
    const setObjects = useSetAtom(objectsAtom);
    const setActiveObject = useSetAtom(activeObjectAtom);
    const activeObject: fabric.Object | null = useAtomValue(activeObjectAtom);
    const [activeSrc, setActiveSrc] = useState('');
    const [items, setItems] = useState<object[]>(objects ? objects : []);

    useEffect(() => {
        const handleObjectAdded = (e: fabric.IEvent) => {
            const addedObject = e.target;
            if (addedObject) {
                addedObject.hasControls = true;
                addedObject.hasBorders = true;
                setItems((prev) => [addedObject, ...prev]);
                canvas?.renderAll();
            }
        };

        if (canvas) {
            canvas.on('object:added', handleObjectAdded);
        }

        return () => {
            if (canvas) {
                canvas.off('object:added', handleObjectAdded);
            }
        };
    }, [canvas]);

    useEffect(() => {
        if (indexClick) {
            if (objects && objects.length > 0) {
                const updatedItems = objects ? [...objects].reverse() : [];
                setObjects(objects);
                setItems(updatedItems);
                setIndexClick(false);
            } else {
                setItems([]);
                setObjects([]);
                setIndexClick(false);
            }
        }
    }, [objects, indexClick, setIndexClick, setObjects]);

    useEffect(() => {
        if (!activeObject) {
            setActiveSrc('');
        } else {
            if (activeObject.data) {
                setActiveSrc((activeObject as any).toDataURL());
            } else {
                (activeObject as any)._objects && setActiveSrc((activeObject as any)._objects[0].toDataURL());
            }
        }
    }, [activeObject]);

    const selectObject = (el: fabric.Object) => {
        canvas?.setActiveObject(el);
        setActiveObject(el);
        el.hasControls = true;
        el.hasBorders = true;
        canvas?.renderAll();
    };

    const [enabled, setEnabled] = useState(false);

    const onDragEnd = ({ source, destination }: DropResult) => {
        if (!destination) return;

        const updatedItems = [...items];
        const movedItem = updatedItems[source.index];
        updatedItems.splice(source.index, 1);
        updatedItems.splice(destination.index, 0, movedItem);

        setItems(updatedItems);

        canvas?.moveTo(movedItem as any, updatedItems.length - destination.index - 1);
        canvas?.renderAll();
    };

    useEffect(() => {
        const animation = requestAnimationFrame(() => setEnabled(true));

        return () => {
            cancelAnimationFrame(animation);
            setEnabled(false);
        };
    }, []);

    if (!enabled) {
        return null;
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="p-3">
                <div className="w-full border h-[100px]">{!activeObject ? null : <img className="object-contain w-full h-full" src={activeSrc} />}</div>
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <div className="h-[350px] overflow-y-auto py-5" ref={provided.innerRef} {...provided.droppableProps}>
                            {[...items].map((el: any, i: number) => {
                                return (
                                    <Draggable key={String(i)} draggableId={String(i)} index={i}>
                                        {(provided) => (
                                            <div
                                                className={`flex bg-white w-full h-12 mt-2 rounded-md justify-center px-2 ${
                                                    el === activeObject || (activeObject as fabric.Group)?._objects?.some((i: fabric.Object) => i === el)
                                                        ? 'border-blue-300 border-4'
                                                        : ''
                                                }`}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                onMouseDown={() => selectObject(el)}
                                            >
                                                <img src={el.toDataURL()}></img>
                                            </div>
                                        )}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </DragDropContext>
    );
}
