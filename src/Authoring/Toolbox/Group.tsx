import fabric from '@fabric';
import { activeObjectAtom, editorAtom, objectsAtom } from '@/atoms/atom';
import { IconButtonV1 } from '@/components/Button';
import { useAtomValue, useSetAtom } from 'jotai';
import { LiaObjectGroup } from 'react-icons/lia';
import { nanoid } from 'nanoid';
import { indexAtom } from './atom';

export default function Group() {
    const editor = useAtomValue(editorAtom);
    const canvas = editor?.canvas;
    const activeObject = useAtomValue(activeObjectAtom);
    const setObjects = useSetAtom(objectsAtom);
    const setIndexClick = useSetAtom(indexAtom);

    const onGroupBtnClick = () => {
        if (!(activeObject as fabric.Object).data && (activeObject as any)?._objects?.length > 1) {
            setIndexClick(true);
            //그룹화
            const group = new fabric.Group((activeObject as any)._objects, { left: activeObject?.left, top: activeObject?.top });
            group.set('data', { type: 'group', id: nanoid(), effects: [] });
            const objects = editor?.add(group);
            if (objects) setObjects(objects);

            //기존 객체 삭제
            (activeObject as any)._objects.forEach(function (obj: fabric.Object) {
                canvas?.remove(obj);
            });
        }
    };

    return (
        <div>
            <IconButtonV1 onClick={onGroupBtnClick}>
                <LiaObjectGroup />
            </IconButtonV1>
        </div>
    );
}
