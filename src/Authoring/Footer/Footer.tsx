import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { getSound } from '@/apis/sol';
import useApi from '@/hooks/useApi';
import { useAtomValue } from 'jotai';
import { objectsAtom } from '@/atoms/atom';
import { AnimationList } from './Animation/AnimationList';

export const Footer = () => {
    const objects = useAtomValue(objectsAtom);
    const { data } = useApi(getSound);
    const [start, setStart] = useState<boolean>(false);
    const [cancel, setCancel] = useState<any>([]);
    const [opacityCancel, setOpacityCancel] = useState<any>([]);
    const sounds = useMemo(() => data?.filter((sound) => sound.extension === 'mp3'), [data]);
    const finishRef = useRef({ num: 0, number: 0 });

    const onSetTime = (isPlaying: boolean) => {
        if (isPlaying) finishRef.current.number += 1;
        if (finishRef.current.num === finishRef.current.number) setStart(false);
    };
    const onSetNum = useCallback(() => {
        finishRef.current = { num: 0, number: 0 };
        objects.forEach((object) => {
            if (object.data.effects.length >= 1) finishRef.current.num += 1;
        });
    }, [objects]);
    const onSetCancel = (_cancel: () => void, endTime?: number) => {
        if (endTime) {
            setOpacityCancel((prev: any) => {
                return [...prev, _cancel];
            });
        } else {
            setCancel((prev: any) => {
                return [...prev, _cancel];
            });
        }
    };
    const onPlay = () => {
        if (finishRef.current.num === 0) return;
        setStart(true);
        finishRef.current.number = 0;
    };
    const onStop = () => {
        setStart(false);
        cancel.forEach((_cancel: () => void) => {
            _cancel?.();
        });
        opacityCancel.forEach((_cancel: () => void) => {
            _cancel?.();
        });
        objects.forEach((obj) => {
            obj.set('opacity', 1);
        });
    };

    useEffect(() => {
        onSetNum();
    }, [objects, onSetNum]);

    return (
        <React.Fragment>
            <div className="flex">
                <div className="w-full">
                    <div className="flex items-center mb-2">
                        <div className="font-[700] mr-3">Animation</div>
                        {!start && objects.length !== 0 ? (
                            <button className="bg-[#FD7C7C] w-[60px] text-[white] p-[4px_12px] rounded-[8px] hover:bg-[#FF8484]" onClick={() => onPlay()}>
                                Play
                            </button>
                        ) : (
                            objects.length !== 0 && (
                                <button className="bg-[black] w-[60px] text-[white] p-[4px_12px] rounded-[8px] hover:bg-[#3a3939]" onClick={() => onStop()}>
                                    Stop
                                </button>
                            )
                        )}
                    </div>
                    <div className="px-[10px]">
                        {objects.map((object, index) => {
                            return (
                                <AnimationList
                                    key={index}
                                    object={object}
                                    sounds={sounds}
                                    start={start}
                                    onSetTime={onSetTime}
                                    onSetNum={onSetNum}
                                    totalCancel={onSetCancel}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
