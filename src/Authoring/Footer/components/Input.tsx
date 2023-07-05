export const Input = ({ value, onCheck, setValue }: InputProps) => {
    return (
        <input
            type="range"
            min={1}
            max={100}
            value={value}
            step={1}
            onChange={(e) => {
                setValue(e.target.valueAsNumber);
                onCheck();
            }}
            className="input"
        />
    );
};
