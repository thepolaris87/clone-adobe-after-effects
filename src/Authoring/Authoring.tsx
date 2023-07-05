import Toolbox from './Toolbox/Toolbox';
import Viewer from './Viewer/Viewer';
import { Transform } from './Footer/Transform';
import LeftContent from './SideContents/LeftContent';
import RightContent from './SideContents/RightContent';

export default function Authoring() {
    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <Toolbox />
            <hr className="border-cyan-950"></hr>
            <div className="flex">
                <div className="flex-[1]">
                    <LeftContent />
                </div>
                <div>
                    <Viewer />
                </div>
                <div className="flex-[1.5]">
                    <RightContent />
                </div>
            </div>
            <hr className="border-cyan-950"></hr>
            <div className="flex-[1] overflow-auto p-2">
                <Transform />
            </div>
        </div>
    );
}
