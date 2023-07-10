import css from '../css/Input.module.css';
import { Tooltip } from './Tooltip';

export const Input = ({ value, onCheck, setValue, isPlaying }: InputProps) => {
    return (
        <div className="group flex items-center">
            <input
                className={css.input}
                type="range"
                min={1}
                max={100}
                value={value}
                step={1}
                onChange={(e) => {
                    setValue(e.target.valueAsNumber);
                    onCheck();
                }}
                disabled={isPlaying}
            />
            <Tooltip value={value} />
        </div>
    );
};
