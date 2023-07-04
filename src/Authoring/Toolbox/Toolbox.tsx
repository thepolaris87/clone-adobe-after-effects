import IndexItems from './IndexItems';
import InsertImage from './InsertImage';
import InsertText from './InsertText';
import Save from './Save';
import Style from './TextStyle/Style';

export default function Toolbox() {
    return (
        <div className="flex gap-x-1 p-2">
            <Save />
            <InsertText />
            <InsertImage />
            <IndexItems />
            <Style />
        </div>
    );
}
