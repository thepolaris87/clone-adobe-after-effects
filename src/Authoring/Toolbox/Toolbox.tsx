import Group from './Group';
import IndexItems from './IndexItems';
import InsertImage from './InsertImage';
import InsertText from './InsertText';
import Preview from './Preview';
import RemoveObject from './RemoveObject';
import Save from './Save';
import Style from './TextStyle/Style';

export default function Toolbox() {
    return (
        <div className="flex gap-x-1 p-2">
            <Save />
            <Preview />
            <InsertText />
            <InsertImage />
            <IndexItems />
            <Group />
            <RemoveObject />
            <Style />
        </div>
    );
}
