import { activeObjectAtom, editorAtom } from '@/atoms/atom';
import { IconButtonV1 } from '@/components/Button';
import { useAtomValue, useSetAtom } from 'jotai';
import { BsFillTrashFill } from 'react-icons/bs';
import { indexAtom } from './atom';

export default function RemoveObject() {
    const editor = useAtomValue(editorAtom);
    const canvas = editor?.canvas;
    const activeObject: fabric.Object | null = useAtomValue(activeObjectAtom);
    const setIndex = useSetAtom(indexAtom);

    const onRemoveClick = () => {
        canvas?.remove(activeObject as fabric.Object);
        setIndex(true);
    };
    return (
        <IconButtonV1 onClick={onRemoveClick}>
            <BsFillTrashFill />
        </IconButtonV1>
    );
}
