import { ChangeEventHandler } from "react";

type input = {
    title: string;
    name?: string;
    value: number | undefined;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    readOnly?: boolean;
}
export default function Input({title, name, value, onChange, readOnly} : input) {
    
    return (
        <div className="flex flex-col">
            <label>{title}</label>
            <input type="number" className="w-16 text-right px-1" step="any" name={name} value={(value) ? Math.round(value * 100) / 100 : 0} onChange={onChange} readOnly={readOnly}></input>
        </div>
    );
}
