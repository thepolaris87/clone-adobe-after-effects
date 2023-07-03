import { activeObjectAtom } from '@/atoms/style';
import { useAtomValue } from "jotai";
import { IconButtonV1 } from '@/components/Button';
import { BsChevronDoubleUp, BsChevronUp, BsChevronDown, BsChevronDoubleDown } from 'react-icons/bs';
import { editorAtom } from '@/atoms/atom';

export default function IndexItems() {
    const editor = useAtomValue(editorAtom);
    const canvas = editor?.canvas;
    const activeObject = useAtomValue(activeObjectAtom);
    const doubleUp = () => {
        (activeObject as any).bringToFront()
    } 
    const up = () => {
        // canvas?.moveTo(activeObject as any, activeObject.index - 1)
    } 
    const doubleDown = () => {
        (activeObject as any).sendToBack()
    } 
    const down = () => {
    } 

console.log(activeObject)
    return (
        <IconButtonV1>
        <div className='flex items-center gap-2'>
            <BsChevronUp className="w-[1rem]"/>
            <BsChevronDoubleUp onClick={doubleUp} className="w-[1rem] " />
            <BsChevronDown className="w-[1rem]" />
            <BsChevronDoubleDown onClick={doubleDown} className="w-[1rem]" />
        </div>
        </IconButtonV1>
    );
}
