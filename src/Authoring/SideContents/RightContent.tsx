import { useAtomValue } from 'jotai';
import Input from './Components/Input';
import { activeObjectAtom, editorAtom } from '@/atoms/atom';
import { MouseEventHandler, useEffect, useState } from 'react';
import { CgEditFlipH, CgEditFlipV } from 'react-icons/cg';
type position = {
    centerX: number | undefined;
    centerY: number | undefined;
};
type size = {
    width: number | undefined;
    height: number | undefined;
};
type scale = {
    scaleX: number | undefined;
    scaleY: number | undefined;
};
type setting = {
    angle: number | undefined;
    opacity: number | undefined;
};
export default function RightContent() {
    const editor = useAtomValue(editorAtom);
    const canvas = editor?.canvas;
    const activeObject: any = useAtomValue(activeObjectAtom);
    const [position, setPosition] = useState<position>({ centerX: undefined, centerY: undefined });
    const [size, setSize] = useState<size>({ width: undefined, height: undefined });
    const [scaleValue, setScaleValue] = useState<scale>({ scaleX: undefined, scaleY: undefined });
    const [setting, setSetting] = useState<setting>({ angle: undefined, opacity: undefined });
    const [flip, setFlip] = useState({ flipX: false, flipY: false });

    //초기화
    useEffect(() => {
        if (Object.keys(activeObject).length === 0) {
            setPosition({ centerX: undefined, centerY: undefined });
            setSize({ width: undefined, height: undefined });
            setScaleValue({ scaleX: undefined, scaleY: undefined });
            setSetting({ angle: undefined, opacity: undefined });
            return;
        }
        setPosition({ centerX: activeObject.left, centerY: activeObject.top });
        setSize({ width: activeObject.width, height: activeObject.height });
        setScaleValue({ scaleX: activeObject.scaleX, scaleY: activeObject.scaleY });
        activeObject.angle ? setSetting((prev) => ({ ...prev, angle: activeObject.angle })) : setSetting((prev) => ({ ...prev, angle: 0 }));
        setSetting((prev) => ({ ...prev, opacity: activeObject.opacity }));
    }, [activeObject]);

    useEffect(() => {
        const handleObjectModified = (e: any) => {
            setSetting((prev) => ({ ...prev, opacity: e.target.opacity }));
        };
        const handleObjectMoving = (e: fabric.IEvent) => {
            setPosition({ centerX: e.target?.left, centerY: e.target?.top });
        };
        const handleObjectScaling = (e: any) => {
            setScaleValue({ scaleX: e.target.scaleX, scaleY: e.target.scaleY });
        };

        const handleObjectRotating = (e: any) => {
            setSetting((prev) => ({ ...prev, angle: e.target.angle }));
        };

        if (canvas) {
            canvas.on('object:modified', handleObjectModified);
            canvas.on('object:moving', handleObjectMoving);
            canvas.on('object:scaling', handleObjectScaling);
            canvas.on('object:rotating', handleObjectRotating);
        }

        return () => {
            if (canvas) {
                canvas.off('object:moving', handleObjectMoving);
                canvas.off('object:scaling', handleObjectScaling);
                canvas.off('object:rotating', handleObjectRotating);
            }
        };
    }, [canvas]);

    //Position
    const inputCenter = (e: React.ChangeEvent<HTMLInputElement>) => {
        activeObject.set({ left: Number(e.target.value), top: activeObject.top });
        canvas?.renderAll();

        if (e.target.name === 'centerX') {
            setPosition((prev) => ({ ...prev, centerX: Number(e.target.value) }));
            activeObject.set({ left: Number(e.target.value), top: activeObject.top });
        } else if (e.target.name === 'centerY') {
            setPosition((prev) => ({ ...prev, centerY: Number(e.target.value) }));
            activeObject.set({ left: activeObject.left, top: Number(e.target.value) });
        }
        canvas?.renderAll();
    };

    //Size
    const inputScale = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (Object.keys(activeObject).length === 0) return;

        if (e.target.name === 'scaleX') {
            setScaleValue((prev) => ({ ...prev, scaleX: Number(e.target.value) }));
            activeObject.set({ scaleX: e.target.value, sclaeY: activeObject.scaleY });
        } else if (e.target.name === 'scaleY') {
            setScaleValue((prev) => ({ ...prev, scaleY: Number(e.target.value) }));
            activeObject.set({ scaleX: activeObject.scaleX, scaleY: e.target.value });
        }
        canvas?.renderAll();
    };

    //Rotate
    const inputAngle = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (Object.keys(activeObject).length === 0) return;

        setSetting((prev) => ({ ...prev, angle: Number(e.target.value) }));
        activeObject.rotate(e.target.value);
        canvas?.renderAll();
    };

    const inputOpacity = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (Object.keys(activeObject).length === 0) return;
        setSetting((prev) => ({ ...prev, opacity: Number(e.target.value) }));
        activeObject.set({ opacity: e.target.value });
        canvas?.renderAll();
    };

    const onFlipXClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (Object.keys(activeObject).length === 0) return;
        setFlip((prev) => ({ ...prev, flipX: !flip.flipX }));
        activeObject.set('flipX', !flip.flipX);
        canvas?.renderAll();
    };

    const onFlipYClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (Object.keys(activeObject).length === 0) return;
        console.log(activeObject);
        setFlip((prev) => ({ ...prev, flipY: !flip.flipY }));
        activeObject.set('flipY', !flip.flipY);
        canvas?.renderAll();
    };
    return (
        <>
            <div>
                <div className="font-extrabold pt-3">Transform</div>
                <div className="border-b pb-3 w-40">
                    <div>Position</div>
                    <div className="flex gap-3">
                        <Input title="Center-X" name="centerX" value={position.centerX} onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputCenter(e)} />
                        <Input title="Center-Y" name="centerY" value={position.centerY} onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputCenter(e)} />
                    </div>
                </div>
                <div className="border-b pb-3 w-40">
                    <div>Size</div>
                    <div>
                        <div className="flex gap-3">
                            <Input title="Width" value={size.width} readOnly={true} />

                            <Input title="Height" value={size.height} readOnly={true} />
                        </div>
                        <div>
                            <div className="flex gap-3">
                                <Input
                                    title="Scale-X"
                                    name="scaleX"
                                    value={scaleValue.scaleX}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputScale(e)}
                                />
                                <Input
                                    title="Scale-Y"
                                    name="scaleY"
                                    value={scaleValue.scaleY}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputScale(e)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-b pb-3 w-40">
                    <div>Rotate</div>
                    <div className="flex gap-3">
                        <Input title="Angle" value={setting.angle} onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputAngle(e)} />
                        <div onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => onFlipXClick(e)}>
                            <CgEditFlipH className="mt-6" />
                        </div>
                        <div onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => onFlipYClick(e)}>
                            <CgEditFlipV className="mt-6" />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="font-extrabold pt-6">Attribute</div>
                <div>
                    <Input title="Opacity" value={setting.opacity} onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputOpacity(e)} />
                </div>
            </div>
        </>
    );
}
