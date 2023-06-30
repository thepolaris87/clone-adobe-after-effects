import Toolbox from './Toolbox/Toolbox';
import Viewer from './Viewer/Viewer';

export default function Authoring() {
    return (
        <>
            <div>
                <Toolbox />
            </div>
            <div className="flex">
                <div>Left Content</div>
                <div>
                    <Viewer />
                </div>
                <div>Right Content</div>
            </div>
            <div>Animation</div>
        </>
    );
}
