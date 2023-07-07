export default function RightContent() {
    return (
        <>
            <div>
                <div className="font-extrabold pt-3">Transform</div>
                <div>
                    <div>Position</div>
                    <div className="flex gap-3">
                        <div className="flex flex-col">
                            <label>Center-X</label>
                            <input type="text" className="w-16"></input>
                        </div>
                        <div className="flex flex-col">
                            <label>Center-Y</label>
                            <input type="text" className="w-16"></input>
                        </div>
                    </div>
                </div>
                <div>
                    <div>Size</div>
                    <div>
                        <div className="flex gap-3">
                            <div className="flex flex-col">
                                <label>Width</label>
                                <input type="text" className="w-16"></input>
                            </div>
                            <div className="flex flex-col">
                                <label>Height</label>
                                <input type="text" className="w-16"></input>
                            </div>
                        </div>
                        <div>
                            <div className="flex gap-3">
                                <div className="flex flex-col">
                                    <label>Scale-X</label>
                                    <input type="text" className="w-16"></input>
                                </div>
                                <div className="flex flex-col">
                                    <label>Scale-Y</label>
                                    <input type="text" className="w-16"></input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>Rotate</div>
                    <div className="flex flex-col">
                        <label>Angle</label>
                        <input type="text" className="w-16"></input>
                    </div>
                </div>
            </div>
            <div>
                <div className="font-extrabold pt-6">Attribute</div>
                <div>
                    <div>Opacity</div>
                    <div className="flex flex-col">
                        <label>Angle</label>
                        <input type="text" className="w-16"></input>
                    </div>
                </div>
            </div>
        </>
    );
}
