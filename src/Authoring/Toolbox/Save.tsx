import { editorAtom } from '@/atoms/atom';
import { useAtomValue } from 'jotai';
import { IconButtonV1 } from '@/components/Button';
import { MdSave } from 'react-icons/md';

export default function Save() {
    const editor = useAtomValue(editorAtom);
    const onSaveClick = () => {
        const data = editor?.save();
        window.localStorage.setItem('fabric', JSON.stringify(data));
    };

    return (
        <IconButtonV1 onClick={onSaveClick}>
            <MdSave />
        </IconButtonV1>
    );
}
