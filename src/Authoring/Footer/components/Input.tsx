import css from '../css/Input.module.css';

export const Input = ({ value, onCheck, setValue }: InputProps) => {
    return (
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
        />
    );
};
