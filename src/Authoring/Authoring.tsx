import Toolbox from './Toolbox/Toolbox';
import Viewer from './Viewer/Viewer';

export default function Authoring() {
    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <Toolbox />
            <hr className="border-cyan-950"></hr>
            <div className="flex">
                <div className="flex-[1]">Left Content</div>
                <div>
                    <Viewer />
                </div>
                <div className="flex-[1.5]">Right Content</div>
            </div>
            <hr className="border-cyan-950"></hr>
            <div className="flex-[1] overflow-auto p-2">
                <div>animation scroll test</div>
                <div>animation scroll test</div>
                <div>animation scroll test</div>
                <div>animation scroll test</div>
                <div>animation scroll test</div>
                <div>animation scroll test</div>
                <div>animation scroll test</div>
                <div>animation scroll test</div>
                <div>animation scroll test</div>
                <div>animation scroll test</div>
                <div>animation scroll test</div>
                <div>animation scroll test</div>
                <div>animation scroll test</div>
                <div>animation scroll test</div>
                <div>animation scroll test</div>
                <div>animation scroll test</div>
                <div>animation scroll test</div>
                <div>animation scroll test</div>
                <div>animation scroll test</div>
                <div>animation scroll test</div>
                <div>animation scroll test</div>
                <div>animation scroll test</div>
                <div>animation scroll test</div>
                <div>animation scroll test</div>
                <div>animation scroll test</div>
                <div>animation scroll test</div>
                <div>animation scroll test</div>
                <div>animation scroll test</div>
                <div>animation scroll test</div>
            </div>
        </div>
    );
}
