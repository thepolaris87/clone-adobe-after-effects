import { useState, useRef, useEffect } from 'react';
import { Move, Scale, Rotate, FadeIn, FadeOut, Opacity, Sound } from '../Effects';
import { MdChevronRight, MdKeyboardArrowDown } from 'react-icons/md';
import { BiCaretDownSquare } from 'react-icons/bi';

export const AnimationList = ({ object, sounds }: { object: fabric.Object; sounds: TGetSound[] }) => {
    const [dropDown, setDropDown] = useState(false);
    const [transform, setTransForm] = useState(false);
    const divRef1 = useRef<HTMLInputElement | null>(null);
    const menus = ['FADE IN', 'FADE OUT', 'OPACITY', 'ROTATE', 'SCALE', 'MOVE', 'SOUND'];

    useEffect(() => {
        document.addEventListener('click', (e) => {
            if (divRef1.current && !divRef1.current.contains(e.target as Node)) setDropDown(false);
        });
    }, [divRef1]);

    return (
        <div className="bg-[#ecebeb] rounded-[8px] mb-2 p-[4px_10px] shadow-[1px_1px_#cdd8dd]">
            <div className="flex justify-between p-2">
                <div className="text-[20px]">{object.data.type}</div>
                <div className="hidden sm:flex items-center">
                    <BiCaretDownSquare />
                    <span className="relative">
                        <input
                            type="button"
                            className="w-[500px] rounded-sm shadow-[1px_3px_5px_1px_#cdd8dd] bg-[white] cursor-pointer ml-2 p-[3px] hover:shadow-[0px_1px_5px_1px_#50bcdf]"
                            onClick={() => setDropDown(true)}
                            value={'Select animation'}
                            ref={divRef1}
                        ></input>
                        {dropDown && (
                            <ul className="bg-[white] w-[500px] shadow-[1px_1px_3px_1px_#cdd8dd] overflow-scroll text-center cursor-pointer absolute top-1 ml-2 z-20">
                                {menus?.map((menu, index) => {
                                    return (
                                        <li key={index} className="hover:bg-[#d9edf4]" onClick={() => setDropDown(false)}>
                                            {menu}
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </span>
                </div>
            </div>
            <button className="flex cursor-pointer" onClick={() => setTransForm(!transform)}>
                {transform ? <MdKeyboardArrowDown /> : <MdChevronRight />}
                Transform
            </button>
            {transform ? (
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
};
