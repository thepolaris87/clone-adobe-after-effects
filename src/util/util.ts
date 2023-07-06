export const sound = (src: string) => {
    const audio = new Audio();
    audio.src = src;

    const play = () => {
        audio.play();
    };
    const stop = () => {
        audio.pause();
        audio.currentTime = 0;
    };

    return { audio, play, stop };
};
