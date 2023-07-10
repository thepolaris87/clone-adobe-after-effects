export const Tooltip = ({ value }: { value: number }) => {
    return (
        <div
            style={{ left: value + '%' }}
            className="group-hover:flex hidden w-[35px] justify-center text-[14.5px] font-[NotoSansKRRegular] absolute bottom-8 bg-[white] rounded-[4px] p-2 border-[#cdd8dd] border-[1px] z-10"
        >
            <h5>{value}</h5>
        </div>
    );
};
