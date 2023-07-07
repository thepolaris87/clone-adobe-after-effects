import { ChangeEventHandler } from "react";

type input = {
    title: string;
    name?: string;
    value?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    readOnly?: boolean;
}
export default function Input({title, name, value, onChange, readOnly} : input) {
    return (
        <div className="flex flex-col">
            <label>{title}</label>
            <input type="text" className="w-16 text-right px-1" name={name} value={value} onChange={onChange} readOnly={readOnly}></input>
        </div>
    );
}
