import Input from './Input';

export default function RightContent() {
    return (
        <>
            <div>
                <div className="font-extrabold pt-3">Transform</div>
                <div>
                    <div>Position</div>
                    <div className="flex gap-3">
                        <Input title="Center-X" />
                        <Input title="Center-Y" />
                    </div>
                </div>
                <div>
                    <div>Size</div>
                    <div>
                        <div className="flex gap-3">
                            <Input title="Width" />

                            <Input title="Height" />
                        </div>
                        <div>
                            <div className="flex gap-3">
                                <Input title="Scale-X" />
                                <Input title="Scale-Y" />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>Rotate</div>
                    <Input title="Angle" />
                </div>
            </div>
            <div>
                <div className="font-extrabold pt-6">Attribute</div>
                <div>
                    <Input title="Opacity" />
                </div>
            </div>
        </>
    );
}
