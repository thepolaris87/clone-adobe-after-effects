import { editorAtom } from '@/atoms/atom';
import { activeObjectAtom } from '@/atoms/atom';
import { useAtomValue } from 'jotai';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

export default function LeftContent() {
    const editor = useAtomValue(editorAtom);
    const canvas = editor?.canvas;
    const activeObject: any = useAtomValue(activeObjectAtom);
    const [activeSrc, setActiveSrc] = useState('');
    const objects = canvas?.getObjects();
    const [items, setItems] = useState<Object[]>(objects ? objects : []);

    useEffect(() => {
        canvas?.on('object:added', function (e) {
            const addedObject = e.target;
            if (addedObject) {
                addedObject.hasControls = true;
                addedObject.hasBorders = true;

                setItems((prev) => [addedObject, ...prev]);

                canvas.renderAll();
            }
        });
        return () => {
            canvas?.off();
        };
    }, [canvas]);

    useEffect(() => {
        if (objects === items) return;
        if (objects && objects.length > 0) {
            // setItems(objects);
        }
    }, [objects, items]);

    useEffect(() => {
        if (Object.keys(activeObject).length === 0) {
            setActiveSrc('');
        } else {
            setActiveSrc(activeObject.data?.type === 'image' ? activeObject.getSrc() : activeObject.toDataURL());
        }
    }, [activeObject]);

    const selectObject = (el: fabric.Object) => {
        canvas?.setActiveObject(el);
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
            <Droppable droppableId="droppable">
                {(provided) => (
                    <div className="p-3" ref={provided.innerRef} {...provided.droppableProps}>
                        <div className="w-full border h-[100px]">
                            {Object.keys(activeObject).length === 0 ? null : <img className="object-contain w-full h-full" src={activeSrc} />}
                        </div>
                        <div>
                            {[...items].map((el: any, i: number) => {
                                return (
                                    <Draggable key={el.data.id} draggableId={el.data.id} index={i}>
                                        {(provided) => (
                                            <div
                                                key={el.data.id}
                                                className="flex bg-white w-full h-12 mt-2 rounded-md justify-between px-2"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                onMouseDown={() => selectObject(el)}
                                            >
                                                <img
                                                    src={
                                                        el.data.type === 'image'
                                                            ? el.getSrc()
                                                            : el.toDataURL({
                                                                  format: 'png',
                                                                  quality: 1
                                                              })
                                                    }
                                                ></img>
                                                <div className="truncate">{el.data.type}</div>
                                            </div>
                                        )}
                                    </Draggable>
                                );
                            })}
                        </div>
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}
