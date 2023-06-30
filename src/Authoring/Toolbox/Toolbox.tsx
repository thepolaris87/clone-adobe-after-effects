import { fabric } from 'fabric';
import { editorAtom } from '@/atoms/atom';
import { useAtomValue } from 'jotai';

export default function Toolbox() {
    const editor = useAtomValue(editorAtom);

    console.log(editor);

    return <div><button onClick={()=> {
        const rect = new fabric.Rect({top:0, left:0, width:200, height:200});
        editor?.canvas.add(rect);

    }}>dfsaf</button></div>;
}
