import { editorAtom } from '@/atoms/atom';
import { activeObjectAtom } from '@/atoms/style';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { IoIosAdd, IoIosRemove } from 'react-icons/io';

export default function FontSize() {
    const editor = useAtomValue(editorAtom);
    const canvas = editor?.canvas;
    const activeObject: any = useAtomValue(activeObjectAtom);
    const [size, setSize] = useState(activeObject.__dimensionAffectingProps.fontSize);

    const increasedBtn = () => {
        setSize((prev: number) => Number(prev) + 1);
    };

    const decreasedBtn = () => {
        setSize((prev: number) => Number(prev) - 1);
    };

    useEffect(() => {
        activeObject.set('fontSize', size);
        canvas?.renderAll();
    }, [size]);

    useEffect(() => {
        setSize(activeObject.__dimensionAffectingProps.fontSize);
    }, [activeObject]);

    const onChange = (e: any) => {
        setSize(e.target.value);
    };

    return (
        <div className="flex items-center">
            <IoIosRemove className="cursor-pointer" onClick={decreasedBtn} />
            <input className="w-[2.5rem] text-center rounded" type="text" value={size} onChange={onChange} />
            <IoIosAdd className="cursor-pointer" onClick={increasedBtn} />
        </div>
    );
}
