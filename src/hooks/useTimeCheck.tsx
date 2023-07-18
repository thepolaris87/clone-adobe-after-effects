import { useCallback, useState, useEffect, useRef } from 'react';

export const useTimeCheck = () => {
    const [time, setTime] = useState(0);
    const interval = useRef<ReturnType<typeof setInterval>>();

    const start = useCallback(() => {
        interval.current = setInterval(() => {
            setTime((prev) => {
                const currentTime = prev + 1;
                return currentTime;
            });
        }, 1000);
    }, []);

    const stop = useCallback(() => {
        setTime(0);
        clearInterval(interval.current);
    }, []);

    useEffect(() => {
        return () => {
            clearInterval(interval.current);
        };
    }, []);

    return { time, start, stop };
};
