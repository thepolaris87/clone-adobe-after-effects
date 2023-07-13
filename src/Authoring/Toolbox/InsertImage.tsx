import fabric from '@fabric';
import { getImage } from '@/apis/sol';
import { editorAtom, objectsAtom, stackAtom } from '@/atoms/atom';
import { IconButtonV1 } from '@/components/Button';
import useApi from '@/hooks/useApi';
import { useAtomValue, useSetAtom, useAtom } from 'jotai';
import { useMemo, useState } from 'react';
import { MdImage } from 'react-icons/md';
import { nanoid } from 'nanoid';

// const imageCache: { [key: string]: HTMLImageElement } = {};

const ImageModal = ({ onClose }: { onClose: () => void }) => {
    const editor = useAtomValue(editorAtom);
    const setObjects = useSetAtom(objectsAtom);
    const [stack, setStack] = useAtom(stackAtom);
    const { data } = useApi(getImage);
    const list = useMemo(() => data?.filter((img) => !!img.extension && img.imageDivisionCode === '01'), [data]);

    const onImageClick = (img: TGetImage) => {
        fabric.Image.fromURL(
            `https://sol-api.esls.io/images/D1/${img.imageId}.${img.extension}`,
            (obj) => {
                obj.set('data', { type: 'image', id: nanoid(), effects: [] });
                onClose();
                if (!editor) return;
                const objects = editor.add(obj);
                if (objects) setObjects(objects);
                const data = editor.canvas.toObject(['data']);
                console.log(JSON.stringify(data));
                setStack([...stack, JSON.stringify(data)]);
            },
            { crossOrigin: 'Anonymous' }
        );
    };

    // const cachedImage = useMemo(
    //     () =>
    //         list?.map((img) => {
    //             if (img.imageId in imageCache) return imageCache[img.imageId];
    //             else {
    //                 const image = new Image();
    //                 image.src = `https://sol-api.esls.io/images/D1/${img.imageId}.${img.extension}`;
    //                 imageCache[img.imageId] = image;
    //             }
    //         }),
    //     [list]
    // );

    return (
        <div className="fixed inset-20 z-10 overflow-auto bg-white rounded-md border-2 p-2">
            <h1 className="text-center text-3xl font-bold p-2">이미지</h1>
            <div className="flex flex-wrap gap-2">
                {list?.map((img) => (
                    <div key={img.imageId}>
                        <IconButtonV1 className="w-16 h-16 border p-2 shadow rounded overflow-hidden" onClick={() => onImageClick(img)}>
                            <img src={`https://sol-api.esls.io/images/D1/${img.imageId}.${img.extension}`}></img>
                        </IconButtonV1>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function InsertImage() {
    const [open, setOpen] = useState(false);
    const onInsertImageClick = () => setOpen(true);
    const onClose = () => setOpen(false);
    return (
        <>
            <IconButtonV1 onClick={onInsertImageClick}>
                <MdImage />
            </IconButtonV1>
            {open && <ImageModal onClose={onClose} />}
        </>
    );
}
