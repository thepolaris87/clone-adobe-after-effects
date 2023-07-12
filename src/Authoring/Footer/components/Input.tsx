import { useState } from 'react';
import css from '../css/Input.module.css';
import { Tooltip } from './Tooltip';

export const Input = ({ value, onCheck, setValue, isPlaying, flag }: InputProps) => {
    const [change, setChange] = useState(false);
    return (
        <div className="flex items-center">
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
                    setChange(true);
                }}
                onMouseOver={() => setChange(true)}
                onMouseUp={() => setChange(false)}
                onMouseLeave={() => setChange(false)}
                disabled={isPlaying}
            />
            <Tooltip value={value} flag={flag} change={change} />
        </div>
    );
};
