import fabric from '@fabric';
import { activeObjectAtom, editorAtom, objectsAtom } from '@/atoms/atom';
import { IconButtonV1 } from '@/components/Button';
import { useAtomValue, useSetAtom } from 'jotai';
import { LiaObjectGroup, LiaObjectUngroup } from 'react-icons/lia';
import { nanoid } from 'nanoid';
import { indexAtom } from './atom';

export default function Group() {
    const editor = useAtomValue(editorAtom);
    const canvas = editor?.canvas;
    const activeObject = useAtomValue(activeObjectAtom);
    const setObjects = useSetAtom(objectsAtom);
    const setIndexClick = useSetAtom(indexAtom);

    const onGroupBtnClick = () => {
        if (!(activeObject as fabric.Object)?.data && (activeObject as any)?._objects?.length > 1) {
            const group = new fabric.Group((activeObject as any)?._objects, { left: activeObject?.left, top: activeObject?.top });
            setIndexClick(true);
            //그룹화
            group.set('data', { type: 'group', id: nanoid(), effects: [] });
            const objects = editor?.add(group);
            if (objects) setObjects(objects);

            //기존 개체 삭제
            (activeObject as any)._objects.forEach((obj: fabric.Object) => {
                canvas?.remove(obj);
            });

            canvas?.renderAll();
        } else if ((activeObject as fabric.Object)?.data?.type === 'group') {
            if (!activeObject) return;
            setIndexClick(true);

            //그룹해제
            (activeObject as any).toActiveSelection();
            canvas?.renderAll();
        }
    };

    return (
        <div>
            <IconButtonV1 onClick={onGroupBtnClick}>{activeObject?.data?.type === 'group' ? <LiaObjectUngroup /> : <LiaObjectGroup />}</IconButtonV1>
        </div>
    );
}
