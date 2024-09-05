

const SummaryBox = ({ title, icon: Icon, color, amount, icon1: Icon1, percent }: SummaryProps) => {
    return (
        <main className="w-[23%] min-w-[18rem] p-4 rounded-xl bg-light-600 dark:bg-dark-600 flex flex-col gap-y-3">
            <div className="flex justify-between items-center">
                <p>{title}</p>
                <Icon size="30" className={`${color} p-1`} />
            </div>
            <p className="text-xl md:text-2xl xl:text-3xl font-semibold dark:text-white text-black">{amount}</p>
            <p className="flex items-center gap-x-1">
                <Icon1 size="18" className={percent === 0 ? "text-textOrange" : percent < 0 ? "text-textRed" : "text-textGreen"} variant="Bold" />
                {percent === 0 ? "No Record Yet" : percent < 0 ? `${percent}% lower than yesterday` : `${percent}% higher than yesterday`}
            </p>
        </main>
    );
}

export default SummaryBox;

// #516fff
// #f98838
// #9879f4
// #f48fc7
// GReen #4c8942
//Red #d82e2e
//0.1% higher than yesterday
//0.1% lower than yesterday