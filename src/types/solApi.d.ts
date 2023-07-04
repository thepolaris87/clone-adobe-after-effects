type TGetImage = {
    imageId: string;
    imageDivisionCode: string;
    width: string;
    height: string;
    extension: string;
    size: string;
    reference: string;
    tags: string;
};

type TGetSound = {
    soundId: string;
    soundDivisionCode: string;
    duration: string;
    extension: 'mp3';
    size: string;
    reference: string;
    tags: string;
};
