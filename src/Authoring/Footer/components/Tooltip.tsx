export const Tooltip = ({ value, flag, change }: { value: number; flag: boolean; change: boolean }) => {
    return (
        <div
            className="w-[35px] justify-center text-[14.5px] font-[NotoSansKRRegular] absolute bottom-8 bg-[white] rounded-[4px] p-2 border-[#cdd8dd] border-[1px] z-10"
            style={{ display: flag || change ? 'flex' : 'none', left: value + '%' }}
        >
            <h5>{value}</h5>
        </div>
    );
};
