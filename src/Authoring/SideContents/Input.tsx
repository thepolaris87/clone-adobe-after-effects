type input = {
    title: string;
    value?: string;
}
export default function Input({title, value} : input) {
    return (
        <div className="flex flex-col">
            <label>{title}</label>
            <input type="text" className="w-16" value={value}></input>
        </div>
    );
}
