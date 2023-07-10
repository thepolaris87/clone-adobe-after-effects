import { useState, useRef, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import { BiBadge, BiTrash } from 'react-icons/bi';
import { MdPlayCircle, MdStopCircle, MdOutlineStopCircle } from 'react-icons/md';
import { Slider } from '../components/Slider';
import { sound } from '@/util/util';
import { MdPlayCircleOutline } from 'react-icons/md';
import { wait, onSetTimeLine } from '@/util/util';
import { useTimeCheck } from '@/hooks/useTimeCheck';
import { soundComponent } from '@/util/soundComponent';

export const Sound = ({ sounds, object, id, onDeleteEffect, isPlay, setEndTime, onSetPlay }: AnimationProps) => {
    const [open, setOpen] = useState(false);
    const [soundId, setSoundId] = useState<string>();
    const [_sound, setSound] = useState<ReturnType<typeof sound>>();
    const [playing, setPlaying] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [timeMinValue, setTimeMinValue] = useState(0);
    const [timeMaxValue, setTimeMaxValue] = useState(100);
    const divRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const soundIdRef = useRef<number>(0);
    const { start, stop, time } = useTimeCheck();

    const onClick = (soundId: string) => {
        setSoundId(soundId);
        const audio = sound(`https://sol-api.esls.io/sounds/D1/${soundId}.mp3`);
        setSound(audio);
        const effects = object.data.effects.map((effect: EffectProps, index: number) => {
            if (index === id) return { ...effect, option: { ...effect.option, src: soundId } };
            return effect;
        });
        object.set('data', { ...object.get('data'), effects });
    };
    const onCheckRange = () => {
        if (timeMaxValue - timeMinValue > 1) return;
        setTimeMaxValue(timeMaxValue + 1);
        setTimeMinValue(timeMinValue - 1);
    };
    const onPlay = (flag: boolean) => {
        if (flag && _sound) {
            setPlaying(true);
            _sound.play();
            _sound.audio.onended = () => setPlaying(false);
        } else if (!flag && _sound) {
            setPlaying(false);
            _sound.stop();
        }
    };
    const onPlayAnimation = async () => {
        if (!soundId) return;
        setIsPlaying(true);
        onSetPlay(true);
        const { timeLine } = object.data.effects[id];
        await wait(timeLine[0] * 1000);
        if (!_sound) return;
        start();
        soundIdRef.current = soundComponent({ soundIdRef, _sound });
    };
    const onStopAnimation = useCallback(() => {
        setIsPlaying(false);
        onSetPlay(false);
        clearInterval(soundIdRef.current);
        _sound?.stop();
        stop();
    }, [_sound, stop, onSetPlay]);

    useEffect(() => {
        if (isPlay) setIsPlaying(true);
        else setIsPlaying(false);
    }, [isPlay]);

    useEffect(() => {
        const { timeLine } = object.data.effects[id];
        if (timeLine[1] <= time) onStopAnimation();
    }, [time, id, object, onStopAnimation]);

    useEffect(() => {
        if (isPlay) setIsPlaying(true);
        else setIsPlaying(false);
    }, [isPlay]);

    useEffect(() => {
        document.addEventListener('click', (e) => {
            if (e.target === inputRef.current) setOpen(true);
            else if (divRef.current && !divRef.current.contains(e.target as Node)) setOpen(false);
            else setOpen(false);
        });
    }, [divRef]);

    useEffect(() => {
        onSetTimeLine({ object, id, timeMinValue, timeMaxValue });
        setEndTime();
    }, [timeMinValue, timeMaxValue, id, object, setEndTime]);

    return (
        <div className="flex flex-wrap justify-between mb-2">
            <div className="flex w-[40%] justify-between">
                <span className="flex">
                    <BiBadge className="mr-1" />
                    <h5>Sound</h5>
                </span>
                <div className="hidden sm:flex">
                    {playing ? <MdStopCircle className="mr-1" onClick={() => onPlay(false)} /> : <MdPlayCircle className="mr-1" onClick={() => onPlay(true)} />}
                    <span className="relative">
                        <input
                            type="button"
                            className="w-[190px] rounded-sm px-2 shadow-[0_1px_#cdd8dd] bg-[white] cursor-pointer hover:shadow-[0px_1px_5px_1px_#50bcdf]"
                            value={soundId ? soundId : 'Select sound'}
                            onClick={() => setOpen(true)}
                            ref={inputRef}
                        ></input>
                        <div ref={divRef}>
                            {open && (
                                <ul className="bg-[white] w-full h-[300px] shadow-[1px_1px_3px_1px_#cdd8dd] overflow-scroll text-center cursor-pointer absolute top-1 z-10">
                                    {sounds?.map((sound, index) => {
                                        return (
                                            <li key={index} className="hover:bg-[#d9edf4]" onClick={() => onClick(sound.soundId)}>
                                                {sound.soundId}
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    </span>
                </div>
            </div>
            <Slider
                timeMinValue={timeMinValue}
                timeMaxValue={timeMaxValue}
                setTimeMaxValue={setTimeMaxValue}
                setTimeMinValue={setTimeMinValue}
                onCheckRange={onCheckRange}
                objectId={object.data.id}
                isPlaying={isPlaying}
            />
            <span className="flex w-[4%]">
                {!isPlay &&
                    (!isPlaying ? (
                        <MdPlayCircleOutline className="hidden sm:block cursor-pointer mr-1" onClick={() => onPlayAnimation()} />
                    ) : (
                        <MdOutlineStopCircle className="cursor-pointer hidden sm:block mr-1" onClick={() => onStopAnimation()} />
                    ))}
                {!isPlay && (
                    <BiTrash
                        className={classNames(isPlaying ? 'cursor-not-allowed' : 'cursor-pointer', 'hidden sm:block')}
                        onClick={() => !isPlaying && onDeleteEffect(id)}
                    />
                )}
            </span>
        </div>
    );
};
