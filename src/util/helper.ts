import { sound } from './util';

const timelineEasing = {
    linear: ({ time, t1, t2, from, to }: { time: number; t1: number; t2: number; from: number; to: number }) => ((to - from) / (t2 - t1)) * (time - t1) + from
};

export const createTimeLine = ({ setTimelineData, object }: { setTimelineData: (value: TimeLineDataProps[]) => void; object: fabric.Object }) => {
    setTimelineData([]);
    const timelineData: TimeLineDataProps[] = [];
    const clone = { ...object }; // 원래 객체 복사
    object.data.effects.forEach((effect: EffectProps) => {
        const { option, timeLine, type } = effect;
        if (type === 'FADEIN') timelineData.push({ key: 'opacity', t1: timeLine[0] * 1000, t2: timeLine[1] * 1000, from: 0, to: 1 });
        if (type === 'FADEOUT') timelineData.push({ key: 'opacity', t1: timeLine[0] * 1000, t2: timeLine[1] * 1000, from: 1, to: 0 });
        if (type === 'ROTATE')
            timelineData.push({ key: 'angle', t1: timeLine[0] * 1000, t2: timeLine[1] * 1000, from: clone.angle as number, to: option?.angle as number });
        if (type === 'MOVE') {
            timelineData.push({
                key: 'top',
                t1: timeLine[0] * 1000,
                t2: timeLine[1] * 1000,
                from: clone?.top as number,
                to: option?.top as number
            });
            timelineData.push({
                key: 'left',
                t1: timeLine[0] * 1000,
                t2: timeLine[1] * 1000,
                from: clone?.left as number,
                to: option?.left as number
            });
        }
        if (type === 'SCALE') {
            timelineData.push({
                key: 'scaleX',
                t1: timeLine[0] * 1000,
                t2: timeLine[1] * 1000,
                from: clone?.scaleX as number,
                to: option?.scaleX as number
            });
            timelineData.push({
                key: 'scaleY',
                t1: timeLine[0] * 1000,
                t2: timeLine[1] * 1000,
                from: clone?.scaleY as number,
                to: option?.scaleY as number
            });
        }
        if (type === 'OPACITY') {
            const interval = option?.interval || 1;
            const [startTime, endTime] = timeLine;
            let t1 = startTime * 1000;
            let t2 = t1;
            let opacity = true;
            while (t2 < endTime * 1000 - interval + 1 * 1000) {
                t2 = t1 + interval * 1000;
                timelineData.push({ key: 'opacity', t1: t1, t2: t2, from: Number(opacity), to: Number(!opacity) });
                t1 = t2;
                opacity = !opacity;
            }
            timelineData.push({ key: 'opacity', t1: t2, t2: t2 + interval * 1000, from: 1, to: 1 });
        }
        if (type === 'SOUND') {
            const audio = sound(`https://sol-api.esls.io/sounds/D1/${option?.src}.mp3`);
            audio.audio.loop = true;
            timelineData.push({ key: 'sound', t1: timeLine[0] * 1000, t2: timeLine[1] * 1000, ...audio });
        }
    });
    setTimelineData(timelineData);
};

export const setTimeLine = ({ e, setValue, timeLineData, object, editor, isPlay, isPlaying }: TimeLineBarProps) => {
    if (isPlay || isPlaying) return;
    setValue(e.target.valueAsNumber);
    timeLineData.forEach((data: TimeLineDataProps) => {
        const { key, t1, t2, from, to } = data;
        const timeValue = e.target.valueAsNumber * 1000;
        if (timeValue >= t1 && timeValue <= t2) {
            if (key === 'sound') {
                if (!data.isPlayed) {
                    data.isPlayed = true;
                    data.play?.();
                }
            } else {
                const val = timelineEasing.linear({ time: timeValue, t1, t2, from: from as number, to: to as number });
                (object as fabric.Object).set(key as keyof fabric.Object, val);
                editor?.canvas.renderAll();
            }
        } else {
            if (key === 'sound') {
                if (data.isPlayed) {
                    data.isPlayed = false;
                    data.stop?.();
                }
            }
        }
    });
};
