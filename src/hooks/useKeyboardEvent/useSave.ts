import Editor from '@/Editor/Editor';

export default function useSave() {
    const onSave = (editor: Editor) => {
        const data = editor?.save();
        window.localStorage.setItem('fabric', JSON.stringify(data));
    };

    return { onSave };
}
