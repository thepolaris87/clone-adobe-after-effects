import InsertImage from './InsertImage';
import InsertText from './InsertText';
import Save from './Save';

export default function Toolbox() {
    return (
        <div className="flex gap-x-1 p-2">
            <Save />
            <InsertText />
            <InsertImage />
        </div>
    );
}
