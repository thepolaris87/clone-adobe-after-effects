import { activeObjectAtom } from '@/atoms/style';
import { useAtomValue } from "jotai";
import { IconButtonV1 } from '@/components/Button';
import { BsChevronDoubleUp, BsChevronUp, BsChevronDown, BsChevronDoubleDown } from 'react-icons/bs';
import { editorAtom } from '@/atoms/atom';

export default function IndexItems() {
    const editor = useAtomValue(editorAtom);
    const canvas = editor?.canvas;
    const activeObject = useAtomValue(activeObjectAtom) as fabric.Object;
    const doubleUp = () => {
        activeObject.bringToFront();
    } 
    const up = () => {
        activeObject.bringForward();
    } 
    const doubleDown = () => {
        activeObject.sendToBack()
    } 
    const down = () => {
        activeObject.sendBackwards();
    } 

    return (
        <IconButtonV1>
        <div className='flex items-center gap-2'>
            <BsChevronUp onClick={up} className="w-[1rem]"/>
            <BsChevronDoubleUp onClick={doubleUp} className="w-[1rem] " />
            <BsChevronDown onClick={down} className="w-[1rem]" />
            <BsChevronDoubleDown onClick={doubleDown} className="w-[1rem]" />
        </div>
        </IconButtonV1>
    );
}
