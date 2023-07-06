import React, { useState, useRef, useEffect } from 'react';
import { Move, Scale, Rotate, FadeIn, FadeOut, Opacity, Sound } from '../Effects';
import { MdChevronRight, MdKeyboardArrowDown } from 'react-icons/md';
import { BiCaretDownSquare } from 'react-icons/bi';
import { effects } from '../Effects/Effect';

export const AnimationList = ({ object, sounds }: { object: fabric.Object; sounds: TGetSound[] }) => {
    const [dropDown, setDropDown] = useState(false);
    const [transform, setTransForm] = useState(true);
    const [effect, setEffect] = useState<string>();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [update, setUpdate] = useState(true);

    const onAddEffect = (title: TEffect) => {
        const option = effects[title].option;
        const obj = object.get('data');
        if (!obj.effects) object.set('data', { ...obj, effects: [{ effects: { type: title, timeLine: [0, 1], option: option } }] });
        else object.set('data', { ...obj, effects: [...obj.effects, { type: title, timeLine: [0, 1], option: option }] });
        setDropDown(true);
        setEffect(title);
    };

    const onDeleteEffect = (id: number) => {
        const obj = object.get('data');
        const effects = obj.effects.filter((_effect: EffectProps, index: number) => id !== index);
        object.set('data', { ...obj, effects: effects });
        setUpdate(!update);
    };

    useEffect(() => {
        document.addEventListener('click', (e) => {
            if (inputRef.current && !inputRef.current.contains(e.target as Node)) setDropDown(false);
        });
    }, [inputRef]);

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
                            value={effect ? effect : 'Select animation'}
                            ref={inputRef}
                        ></input>
                        {dropDown && (
                            <ul className="bg-[white] w-[500px] shadow-[1px_1px_3px_1px_#cdd8dd] overflow-scroll text-center cursor-pointer absolute top-1 ml-2 z-20">
                                {Object.keys(effects)?.map((effect, index) => {
                                    return (
                                        <li key={index} className="hover:bg-[#d9edf4]" onClick={() => onAddEffect(effect as TEffect)}>
                                            {effect}
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
                    {object.data.effects.map((effects: EffectProps, index: number) => {
                        return (
                            <React.Fragment key={index}>
                                {effects.type === 'FADEIN' && <FadeIn object={object} id={index} onDeleteEffect={onDeleteEffect} />}
                                {effects.type === 'FADEOUT' && <FadeOut object={object} id={index} onDeleteEffect={onDeleteEffect} />}
                                {effects.type === 'MOVE' && <Move object={object} id={index} onDeleteEffect={onDeleteEffect} />}
                                {effects.type === 'SCALE' && <Scale object={object} id={index} onDeleteEffect={onDeleteEffect} />}
                                {effects.type === 'ROTATE' && <Rotate object={object} id={index} onDeleteEffect={onDeleteEffect} />}
                                {effects.type === 'OPACITY' && <Opacity object={object} id={index} onDeleteEffect={onDeleteEffect} />}
                                {effects.type === 'SOUND' && <Sound sounds={sounds} object={object} id={index} onDeleteEffect={onDeleteEffect} />}
                            </React.Fragment>
                        );
                    })}
                </div>
            ) : null}
        </div>
    );
};
