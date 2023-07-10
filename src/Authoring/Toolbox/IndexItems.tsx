import { activeObjectAtom } from '@/atoms/atom';
import { useAtomValue, useSetAtom } from 'jotai';
import { IconButtonV1 } from '@/components/Button';
import { BsChevronDoubleUp, BsChevronUp, BsChevronDown, BsChevronDoubleDown } from 'react-icons/bs';
import { indexAtom } from './atom';

export default function IndexItems() {
    const activeObject = useAtomValue(activeObjectAtom) as fabric.Object;
    const setIndexClick = useSetAtom(indexAtom);

    const doubleUp = () => {
        activeObject.bringToFront();
        setIndexClick(true);
    };
    const up = () => {
        activeObject.bringForward();
        setIndexClick(true);
    };
    const doubleDown = () => {
        activeObject.sendToBack();
        setIndexClick(true);
    };
    const down = () => {
        activeObject.sendBackwards();
        setIndexClick(true);
    };

    return (
        <IconButtonV1>
            <div className="flex items-center gap-2">
                <BsChevronUp onClick={up} className="w-[1rem]" />
                <BsChevronDoubleUp onClick={doubleUp} className="w-[1rem] " />
                <BsChevronDown onClick={down} className="w-[1rem]" />
                <BsChevronDoubleDown onClick={doubleDown} className="w-[1rem]" />
            </div>
        </IconButtonV1>
    );
}
