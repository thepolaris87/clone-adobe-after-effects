import { activeObjectAtom, editorAtom } from '@/atoms/atom';
import { IconButtonV1 } from '@/components/Button';
import { useAtomValue } from 'jotai';
import { BsFillTrashFill } from 'react-icons/bs';

export default function RemoveObject() {
    const editor = useAtomValue(editorAtom);
    const canvas = editor?.canvas;
    const activeObject: any = useAtomValue(activeObjectAtom);

    const onRemoveClick = () => {
        canvas?.remove(activeObject);
    };
    return (
        <IconButtonV1 onClick={onRemoveClick}>
            <BsFillTrashFill />
        </IconButtonV1>
    );
}
