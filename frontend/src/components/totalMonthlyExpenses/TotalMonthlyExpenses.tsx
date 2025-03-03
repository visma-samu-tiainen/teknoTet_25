interface TotalMonthlyExpensesProps {
	totalExpenses: number;
}

const TotalMonthlyExpenses = ({ totalExpenses }: TotalMonthlyExpensesProps) => {
	return (
		<div className="flex gap-4 p-4">
			<div className="flex flex-col gap-2">
				<span className="underline">TotalMonthlyExpenses:</span>
				<span className="text-4xl">{`${totalExpenses} €`}</span>
			</div>
		</div>
	);
};

export default TotalMonthlyExpenses;
