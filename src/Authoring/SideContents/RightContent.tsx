import { useAtom, useAtomValue } from 'jotai';
import Input from './Components/Input';
import { activeObjectAtom, editorAtom } from '@/atoms/atom';
import { useEffect, useState } from 'react';
import { CgEditFlipH, CgEditFlipV } from 'react-icons/cg';
import { BsChevronDown } from 'react-icons/bs';
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
    const [_activeObject, setActiveObject] = useAtom(activeObjectAtom);
    const [position, setPosition] = useState<position>({ centerX: undefined, centerY: undefined });
    const [size, setSize] = useState<size>({ width: undefined, height: undefined });
    const [scaleValue, setScaleValue] = useState<scale>({ scaleX: undefined, scaleY: undefined });
    const [setting, setSetting] = useState<setting>({ angle: undefined, opacity: undefined });
    const [flip, setFlip] = useState({ flipX: false, flipY: false });
    const [isOpen, setIsOpen] = useState({ position: false, size: false, rotate: false, opacity: false });
    const activeObject = _activeObject as fabric.Object;

    //초기화
    useEffect(() => {
        if (!activeObject) return;
        setPosition({ centerX: activeObject.left, centerY: activeObject.top });
        setSize({ width: activeObject.width, height: activeObject.height });
        setScaleValue({ scaleX: activeObject.scaleX, scaleY: activeObject.scaleY });
        setSetting({ angle: activeObject.angle, opacity: activeObject.opacity });
    }, [activeObject, canvas]);

    useEffect(() => {
        const handleObjectModified = (e: fabric.IEvent) => {
            setSetting((prev) => ({ ...prev, opacity: e.target?.opacity }));
            setSize({ width: e.target?.width, height: e.target?.height });
        };
        const handleObjectMoving = (e: fabric.IEvent) => {
            setPosition({ centerX: e.target?.left, centerY: e.target?.top });
        };
        const handleObjectScaling = (e: fabric.IEvent) => {
            setScaleValue({ scaleX: e.target?.scaleX, scaleY: e.target?.scaleY });
        };

        const handleObjectRotating = (e: fabric.IEvent) => {
            setSetting((prev) => ({ ...prev, angle: e.target?.angle }));
        };

        const handleSelectionUpdated = (e: fabric.IEvent) => {
            if (!e.selected) return;
            setPosition({ centerX: e.selected[0].left, centerY: e.selected[0].top });
            setSize({ width: e.selected[0].width, height: e.selected[0].height });
            setScaleValue({ scaleX: e.selected[0].scaleX, scaleY: e.selected[0].scaleY });
            setSetting({ angle: e.selected[0].angle, opacity: e.selected[0].opacity });
        };

        const handleSelectionCleared = () => {
            setPosition({ centerX: undefined, centerY: undefined });
            setSize({ width: undefined, height: undefined });
            setScaleValue({ scaleX: undefined, scaleY: undefined });
            setSetting({ angle: undefined, opacity: undefined });
        };

        if (canvas) {
            canvas.on('object:modified', handleObjectModified);
            canvas.on('object:moving', handleObjectMoving);
            canvas.on('object:scaling', handleObjectScaling);
            canvas.on('object:rotating', handleObjectRotating);
            canvas.on('selection:updated', handleSelectionUpdated);
            canvas.on('selection:cleared', handleSelectionCleared);
        }

        return () => {
            if (canvas) {
                canvas.off('object:modified', handleObjectModified);
                canvas.off('object:moving', handleObjectMoving);
                canvas.off('object:scaling', handleObjectScaling);
                canvas.off('object:rotating', handleObjectRotating);
                canvas.off('selection:updated', handleSelectionUpdated);
                canvas.on('selection:cleared', handleSelectionCleared);
            }
        };
    }, [canvas]);

    //Position
    const inputCenter = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'centerX') {
            setPosition((prev) => ({ ...prev, centerX: Number(e.target.value) }));
            activeObject.set({ left: Number(e.target.value) });
        } else if (e.target.name === 'centerY') {
            setPosition((prev) => ({ ...prev, centerY: Number(e.target.value) }));
            activeObject.set({ top: Number(e.target.value) });
        }
        canvas?.renderAll();
    };

    //Size
    const inputScale = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!activeObject) return;

        if (e.target.name === 'scaleX') {
            setScaleValue((prev) => ({ ...prev, scaleX: Number(e.target.value) }));
            activeObject.set({ scaleX: Number(e.target.value), scaleY: Number(activeObject.scaleY) });
        } else if (e.target.name === 'scaleY') {
            setScaleValue((prev) => ({ ...prev, scaleY: Number(e.target.value) }));
            activeObject.set({ scaleX: activeObject.scaleX, scaleY: Number(e.target.value) });
        }
        canvas?.renderAll();
    };

    //Rotate
    const inputAngle = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!activeObject) return;

        setSetting((prev) => ({ ...prev, angle: Number(e.target.value) }));
        activeObject.rotate(Number(e.target.value));
        canvas?.renderAll();
    };

    const inputOpacity = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!activeObject) return;
        setSetting((prev) => ({ ...prev, opacity: Number(e.target.value) }));
        activeObject.set({ opacity: Number(e.target.value) });
        canvas?.renderAll();
    };

    const onFlipXClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!activeObject) return;
        setFlip((prev) => ({ ...prev, flipX: !flip.flipX }));
        activeObject.set('flipX', !flip.flipX);
        canvas?.renderAll();
    };

    const onFlipYClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!activeObject) return;
        setFlip((prev) => ({ ...prev, flipY: !flip.flipY }));
        activeObject.set('flipY', !flip.flipY);
        canvas?.renderAll();
    };

    return (
        <>
            <div>
                <div className="font-extrabold pt-3">Transform</div>
                <div className="border-b pb-3 w-2/3 min-w-[140px]">
                    <div
                        className="flex justify-between bg-[#E7E6E6] cursor-pointer p-1"
                        onClick={() => setIsOpen((prev) => ({ ...prev, position: !isOpen.position }))}
                    >
                        <div>Position</div>
                        <div>
                            <BsChevronDown className="w-4" />
                        </div>
                    </div>
                    {isOpen.position && (
                        <div className="flex gap-3">
                            <Input
                                title="Center-X"
                                name="centerX"
                                value={position.centerX}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputCenter(e)}
                            />
                            <Input
                                title="Center-Y"
                                name="centerY"
                                value={position.centerY}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputCenter(e)}
                            />
                        </div>
                    )}
                </div>
                <div className="border-b pb-3 w-2/3 min-w-[140px]">
                    <div
                        className="flex justify-between bg-[#E7E6E6] cursor-pointer p-1"
                        onClick={() => setIsOpen((prev) => ({ ...prev, size: !isOpen.size }))}
                    >
                        <div>Size</div>
                        <div>
                            <BsChevronDown className="w-4" />
                        </div>
                    </div>
                    {isOpen.size && (
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
                    )}
                </div>
                <div className="border-b pb-3 w-2/3 min-w-[140px]">
                    <div
                        className="flex justify-between bg-[#E7E6E6] p-1 cursor-pointer"
                        onClick={() => setIsOpen((prev) => ({ ...prev, rotate: !isOpen.rotate }))}
                    >
                        <div>Rotate</div>
                        <div>
                            <BsChevronDown className="w-4" />
                        </div>
                    </div>
                    {isOpen.rotate && (
                        <div className="flex gap-3">
                            <Input title="Angle" value={setting.angle} onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputAngle(e)} />
                            <div onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => onFlipXClick(e)}>
                                <CgEditFlipH className="mt-4" />
                            </div>
                            <div onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => onFlipYClick(e)}>
                                <CgEditFlipV className="mt-4" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div>
                <div className="font-extrabold pt-4">Attribute</div>
                <div
                    className="flex justify-between w-2/3 min-w-[140px] bg-[#E7E6E6] cursor-pointer p-1"
                    onClick={() => setIsOpen((prev) => ({ ...prev, opacity: !isOpen.opacity }))}
                >
                    <div className="">Opacity</div>
                    <div>
                        <BsChevronDown className="w-4" />
                    </div>
                </div>
                {isOpen.opacity && (
                    <div>
                        <Input title="Opacity" value={setting.opacity} onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputOpacity(e)} />
                    </div>
                )}
            </div>
        </>
    );
}
