import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Move, Scale, Rotate, FadeIn, FadeOut, Opacity, Sound } from '../Effects';
import { useAtomValue } from 'jotai';
import { activeObjectAtom, editorAtom } from '@/atoms/atom';
import { MdChevronRight, MdKeyboardArrowDown } from 'react-icons/md';
import { BiCaretDownSquare } from 'react-icons/bi';
import { effects } from '../Effects/Effect';
import { sound } from '@/util/util';
import { fadeIn, fadeOut, rotate, move, scale, opacity, soundCheck } from '@/util/index';

export const AnimationList = ({ object, sounds }: { object: fabric.Object; sounds?: TGetSound[] }) => {
    const editor = useAtomValue(editorAtom);
    const activeObject = useAtomValue(activeObjectAtom);
    const [dropDown, setDropDown] = useState(false);
    const [transform, setTransForm] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false); // 전체 실행
    const [isPlay, setIsPlay] = useState(false); // 개별 실행
    const [effect, setEffect] = useState<string>();
    const [update, setUpdate] = useState(true);
    const [_sound, setSound] = useState<ReturnType<typeof sound>>();
    const timesRef = useRef<number[]>([]);
    const [cancel, setCancel] = useState<any>([]);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const timeLineRef = useRef({ time: 0, index: 0 });
    const timeRef = useRef(0);
    const soundIdRef = useRef(0);

    const onAddEffect = (title: TEffect) => {
        const option = effects[title].option;
        const obj = object.get('data');
        if (!obj.effects) object.set('data', { ...obj, effects: [{ effects: { type: title, timeLine: [1, 100], option: option } }] });
        else object.set('data', { ...obj, effects: [...obj.effects, { type: title, timeLine: [1, 100], option: option }] });
        setDropDown(true);
        setEffect(title);
        setEndTime();
    };
    const onDeleteEffect = (id: number) => {
        const obj = object.get('data');
        const effects = obj.effects.filter((_effect: EffectProps, index: number) => id !== index);
        object.set('data', { ...obj, effects: effects });
        setUpdate(!update);
        setEndTime();
    };
    const onSetCancel = (_cancel: () => void) => {
        setCancel((prev: any) => {
            return [...prev, _cancel];
        });
    };
    const onPlay = () => {
        const arr: number[] = [];
        setCancel([]);
        setIsPlaying(true);
        const obj = object.get('data');
        obj.effects.map(async (effect: EffectProps, idx: number) => {
            const [startTime, endTime] = effect.timeLine;
            const flag = timeLineRef.current.index === idx;
            let _cancel: () => void;
            console.log(endTime);
            timeRef.current = setTimeout(() => {
                if (effect.type === 'FADEIN') _cancel = fadeIn({ effect, object, editor, endTime, ...(flag && { setIsPlaying: setIsPlaying }) });
                if (effect.type === 'FADEOUT') _cancel = fadeOut({ effect, object, editor, endTime, ...(flag && { setIsPlaying: setIsPlaying }) });
                if (effect.type === 'MOVE') _cancel = move({ effect, object, editor, endTime, ...(flag && { setIsPlaying: setIsPlaying }) });
                if (effect.type === 'SCALE') _cancel = scale({ effect, object, editor, endTime, ...(flag && { setIsPlaying: setIsPlaying }) });
                if (effect.type === 'ROTATE') _cancel = rotate({ effect, object, editor, endTime, ...(flag && { setIsPlaying: setIsPlaying }) });
                if (effect.type === 'OPACITY') opacity({ effect, object, editor, endTime, onSetCancel, ...(flag && { setIsPlaying: setIsPlaying }) });
                if (effect.type === 'SOUND') {
                    if (!effect?.option?.src && obj.effects.length - 1 === idx) {
                        setIsPlaying(false);
                        return;
                    }
                    const audio = sound(`https://sol-api.esls.io/sounds/D1/${effect?.option?.src}.mp3`);
                    setSound(audio);
                    if (!audio) return;
                    soundIdRef.current = soundCheck({ soundIdRef, _sound: audio, endTime, ...(flag && { setIsPlaying: setIsPlaying }) });
                }
                setCancel((prev: any) => {
                    return [...prev, _cancel];
                });
            }, startTime * 1000);
            arr.push(timeRef.current);
            timesRef.current = arr;
        });
    };
    const onStop = () => {
        setIsPlaying(false);
        timesRef.current.forEach((time) => {
            clearTimeout(time);
        }); // 아직 실행되지 않은 애니메이션 취소
        cancel.forEach((_cancel: () => void) => {
            _cancel?.();
        }); // 실행 중인 애니메이션 취소
        clearTimeout(soundIdRef.current);
        _sound?.stop();
        stop();
        object.set('opacity', 1);
    };
    const onSetPlay = (flag: boolean) => {
        setIsPlay(flag);
    };
    const setEndTime = useCallback(() => {
        timeLineRef.current = { time: 0, index: 0 };
        object.data.effects.map((effect: EffectProps, idx: number) => {
            const { timeLine } = effect;
            if (timeLine[1] > timeLineRef.current.time) timeLineRef.current = { time: timeLine[1], index: idx };
        });
    }, [object]);

    useEffect(() => {
        setEndTime();
    }, [setEndTime]);

    useEffect(() => {
        document.addEventListener('click', (e) => {
            if (inputRef.current && !inputRef.current.contains(e.target as Node)) setDropDown(false);
        });
    }, [inputRef]);

    return (
        <div
            className="rounded-[8px] mb-4 p-[4px_10px] shadow-[1px_3px_5px_1px_#cdd8dd] cursor-pointer"
            style={{ backgroundColor: activeObject && activeObject.data.id === object.data.id ? '#dddbdb' : '#ecebeb' }}
            onClick={() => {
                editor?.canvas.setActiveObject(object);
                editor?.canvas.renderAll();
            }}
        >
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
                            disabled={isPlay || isPlaying}
                        ></input>
                        {dropDown && (
                            <ul className="bg-[white] w-[500px] shadow-[1px_1px_3px_1px_#cdd8dd] text-center cursor-pointer absolute top-1 ml-2 z-20">
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
            <div className="flex justify-between p-2">
                <button className="flex cursor-pointer" onClick={() => setTransForm(!transform)}>
                    {transform ? <MdKeyboardArrowDown /> : <MdChevronRight />}
                    Transform
                </button>
                {isPlaying ? (
                    <button className="bg-[#CC0000] text-[white] p-[4px_16px] rounded-[8px] hover:bg-[#FF6666]" onClick={onStop}>
                        Stop
                    </button>
                ) : (
                    <button className="bg-[orange] text-[white] p-[4px_16px] rounded-[8px] hover:bg-[#FFB129]" onClick={onPlay}>
                        Play
                    </button>
                )}
            </div>
            {transform ? (
                <div className="p-[3px_1px_3px_10px]">
                    {object.data.effects.map((effects: EffectProps, index: number) => {
                        const data = {
                            object: object,
                            id: index,
                            onDeleteEffect: onDeleteEffect,
                            isPlay: isPlaying,
                            setEndTime: setEndTime,
                            onSetPlay: onSetPlay,
                            sounds: sounds
                        };
                        return (
                            <React.Fragment key={index}>
                                {effects.type === 'FADEIN' && <FadeIn data={data} />}
                                {effects.type === 'FADEOUT' && <FadeOut data={data} />}
                                {effects.type === 'MOVE' && <Move data={data} />}
                                {effects.type === 'SCALE' && <Scale data={data} />}
                                {effects.type === 'ROTATE' && <Rotate data={data} />}
                                {effects.type === 'OPACITY' && <Opacity data={data} />}
                                {effects.type === 'SOUND' && <Sound data={data} />}
                            </React.Fragment>
                        );
                    })}
                </div>
            ) : null}
        </div>
    );
};
