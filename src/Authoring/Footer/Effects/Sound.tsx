import { useState, useRef, useEffect } from 'react';
import { BiBadge, BiTrash } from 'react-icons/bi';
import { MdPlayCircle, MdStopCircle } from 'react-icons/md';
import { Slider } from '../components/Slider';
import { sound } from '@/util/util';

export const Sound = ({ sounds, object, id, onDeleteEffect }: AnimationProps) => {
    const [open, setOpen] = useState(false);
    const [soundId, setSoundId] = useState<string>();
    const [_sound, setSound] = useState<ReturnType<typeof sound>>();
    const [playing, setPlaying] = useState<boolean>(false);
    const [timeMinValue, setTimeMinValue] = useState(0);
    const [timeMaxValue, setTimeMaxValue] = useState(100);
    const divRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const onClick = (soundId: string) => {
        setSoundId(soundId);
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
        if (flag && soundId) {
            const audio = sound(`https://sol-api.esls.io/sounds/D1/${soundId}.mp3`);
            setSound(audio);
            setPlaying(true);
            audio.play();
        } else if (!flag && _sound) {
            setPlaying(false);
            _sound.stop();
        }
    };

    useEffect(() => {
        document.addEventListener('click', (e) => {
            if (e.target === inputRef.current) setOpen(true);
            else if (divRef.current && !divRef.current.contains(e.target as Node)) setOpen(false);
            else setOpen(false);
        });
    }, [divRef]);

    useEffect(() => {
        const effects = object.data.effects.map((effect: EffectProps, index: number) => {
            if (index === id) return { ...effect, timeLine: [timeMinValue, timeMaxValue] };
            return effect;
        });
        object.set('data', { ...object.get('data'), effects });
    }, [timeMinValue, timeMaxValue, id, object]);

    return (
        <div className="flex flex-wrap justify-between mb-2">
            <div className="flex w-[40%] justify-between">
                <span className="flex">
                    <BiBadge className="mr-1" />
                    <h5>Sound</h5>
                </span>
                <div className="flex">
                    {playing ? <MdStopCircle className="mr-3" onClick={() => onPlay(false)} /> : <MdPlayCircle className="mr-3" onClick={() => onPlay(true)} />}
                    <span className="hidden sm:block relative">
                        <input
                            type="button"
                            className="w-[192px] rounded-sm px-2 shadow-[0_1px_#cdd8dd] bg-[white] cursor-pointer hover:shadow-[0px_1px_5px_1px_#50bcdf]"
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
            />
            <BiTrash className="cursor-pointer" onClick={() => onDeleteEffect(id)} />
        </div>
    );
};
