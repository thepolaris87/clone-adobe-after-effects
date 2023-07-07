import { useAtomValue } from 'jotai';
import Input from './Components/Input';
import { activeObjectAtom, editorAtom } from '@/atoms/atom';
import { useEffect, useState } from 'react';

export default function RightContent() {
    const editor = useAtomValue(editorAtom);
    const canvas = editor?.canvas;
    const activeObject: any = useAtomValue(activeObjectAtom);
    const [position, setPosition] = useState({centerX: '', centerY: ''});
    const [size, setSize] = useState({width: '', height: ''});
    const [scaleValue, setScaleValue] = useState({scaleX:'' , scaleY:''});
    const [setting, setSetting] = useState({angle: '', opacity:''})

    //초기화
    useEffect(() => {
      if(Object.keys(activeObject).length === 0){
        setPosition({centerX: '', centerY: ''})
        setSize({width: '', height: ''})
        setScaleValue({scaleX: '', scaleY: ''})
        setSetting({angle: '', opacity: ''})
        return;
      }
      setPosition(({centerX: activeObject.left, centerY: activeObject.top}))
      setSize(({width: activeObject.width, height: activeObject.height}))
      setScaleValue({scaleX: activeObject.scaleX, scaleY: activeObject.scaleY});
      (activeObject.angle) ? setSetting(prev=> ({...prev, angle: activeObject.angle})) : setSetting(prev=> ({...prev, angle: '0'}));
      setSetting(prev=> ({...prev, opacity: activeObject.opacity}))
    }, [activeObject])

    //Position
    const inputCenter = (e: React.ChangeEvent<HTMLInputElement>) => {
        activeObject.set({ left: Number(e.target.value), top: activeObject.top });
        canvas?.renderAll();

        if(e.target.name === "centerX") {
          setPosition(prev => ({...prev, centerX: e.target.value}));
          activeObject.set({ left: Number(e.target.value), top: activeObject.top });
  
        } else if(e.target.name === "centerY") {
          setPosition(prev => ({...prev, centerY: e.target.value}));
          activeObject.set({ left: activeObject.left, top: Number(e.target.value) });
      }
      canvas?.renderAll();
    };

    //Size
    const inputSize = (e: React.ChangeEvent<HTMLInputElement>) => {
      if(e.target.value) activeObject.set({width: Number(e.target.value), height: activeObject.height})
      canvas?.renderAll();
      console.log(activeObject.width);
    }

    const inputScale = (e: React.ChangeEvent<HTMLInputElement>) => {
      if(Object.keys(activeObject).length === 0) return;

      if(e.target.name === "scaleX") {
        setScaleValue(prev => ({...prev, scaleX: e.target.value}));
        activeObject.set({scaleX: e.target.value, sclaeY: activeObject.scaleY})

      } else if(e.target.name === "scaleY") {
        setScaleValue(prev => ({...prev, scaleY: e.target.value}));
        activeObject.set({scaleX: activeObject.scaleX, scaleY: e.target.value})
    }
      canvas?.renderAll();

    }

    //Rotate
    const inputAngle = (e: React.ChangeEvent<HTMLInputElement>) => {
      if(Object.keys(activeObject).length === 0) return;

      setSetting(prev=> ({...prev, angle: e.target.value}))
      activeObject.rotate(e.target.value);
      canvas?.renderAll();
    }

    const inputOpacity = (e: React.ChangeEvent<HTMLInputElement>) => {
      if(Object.keys(activeObject).length === 0) return;
      setSetting(prev=> ({...prev, opacity: e.target.value}))
      activeObject.set({opacity: e.target.value})
      canvas?.renderAll();
    }
    return (
        <>
            <div>
                <div className="font-extrabold pt-3">Transform</div>
                <div className="border-b pb-3 w-40">
                    <div>Position</div>
                    <div className="flex gap-3">
                        <Input title="Center-X" name="centerX" value={position.centerX || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputCenter(e)} />
                        <Input title="Center-Y" name="centerY" value={position.centerY || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputCenter(e)}/>
                    </div>
                </div>
                <div className="border-b pb-3 w-40">
                    <div>Size</div>
                    <div>
                        <div className="flex gap-3">
                            <Input title="Width" value={size.width || ''} readOnly={true} />

                            <Input title="Height" value={size.height || ''} readOnly={true} />
                        </div>
                        <div>
                            <div className="flex gap-3">
                                <Input title="Scale-X" name="scaleX" value={scaleValue.scaleX || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputScale(e)}   />
                                <Input title="Scale-Y" name="scaleY" value={scaleValue.scaleY || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputScale(e)}   />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-b pb-3 w-40">
                    <div>Rotate</div>
                    <Input title="Angle" value={setting.angle || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputAngle(e)}/>
                </div>
            </div>
            <div>
                <div className="font-extrabold pt-6">Attribute</div>
                <div>
                    <Input title="Opacity" value={setting.opacity || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputOpacity(e)}/>
                </div>
            </div>
        </>
    );
}
