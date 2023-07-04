import React, { useEffect, useState, useMemo } from 'react';
import { getSound } from '@/apis/sol';
import useApi from '@/hooks/useApi';
import { useAtomValue } from 'jotai';
import { objectsAtom } from '@/atoms/atom';
import { Move, Scale, Rotate, FadeIn, FadeOut, Opacity, Sound } from './Animation';
import { MdChevronRight, MdKeyboardArrowDown } from 'react-icons/md';

type openProps = {
    id: number;
    open: boolean;
};
export const Transform = () => {
    const [open, setOpen] = useState<openProps[]>([]);
    const objects = useAtomValue(objectsAtom);
    const { data } = useApi(getSound);
    const sounds = useMemo(() => data?.filter((sound) => sound.extension === 'mp3'), [data]);

    const onOpen = (id: number) => {
        setOpen((prev: openProps[]) => {
            const newData = [...prev];
            const updateData = newData.map((element) => {
                if (id === element.id) return { ...element, open: !element.open };
                else return element;
            });
            return updateData;
        });
    };

    useEffect(() => {
        const array: openProps[] = [];
        objects.map((obj) => {
            array.push({ id: obj.data.id, open: false });
        });
        setOpen(array);
    }, [objects]);

    return (
        <React.Fragment>
            <div className="flex">
                <div className="w-full">
                    <div className="font-[700] mb-2">Animation</div>
                    <div className="px-[10px]">
                        {objects.map((object, index) => {
                            return (
                                <div key={index} className="bg-[#ecebeb] rounded-[8px] mb-2 p-[4px_10px] shadow-[1px_1px_#cdd8dd]">
                                    <div>{object.data.type}</div>
                                    <button className="flex cursor-pointer px-[10px]" onClick={() => onOpen(object.data.id)}>
                                        {open[index] && open[index].open ? <MdKeyboardArrowDown /> : <MdChevronRight />}
                                        Transform
                                    </button>
                                    {open[index] && open[index].open ? (
                                        <div className="p-[3px_20px]">
                                            <FadeIn object={object} />
                                            <FadeOut object={object} />
                                            <Move object={object} />
                                            <Scale object={object} />
                                            <Rotate object={object} />
                                            <Opacity object={object} />
                                            <Sound sounds={sounds} object={object} />
                                        </div>
                                    ) : null}
                                </div>
                            );
                        })}
                    </div>
                </div>
                {/* <div className="w-[55%] font-[700]">TimeLine</div> */}
            </div>
        </React.Fragment>
    );
};
