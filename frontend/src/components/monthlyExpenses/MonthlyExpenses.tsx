import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { XIcon } from "lucide-react";

interface MonthlyExpensesProps {
	expenses: Record<string, number>;
	updateExpenses: (expenses: Record<string, number>) => void;
}
const MonthlyExpenses = ({
	expenses,
	updateExpenses,
}: MonthlyExpensesProps) => {
	const updateExpense = (expense: string, value: number) => {
		const newExpenses = { ...expenses, [expense]: value };
		updateExpenses(newExpenses);
	};

	const addExpense = ({
		key,
		currentTarget,
	}: React.KeyboardEvent<HTMLInputElement>) => {
		if (key !== "Enter") return;
		updateExpense(currentTarget.value, 0);
		currentTarget.value = "";
	};

	const removeExpense = (expense: string) => {
		const { [expense]: _, ...rest } = expenses;
		updateExpenses(rest);
	};

	return (
		<div className="flex flex-col gap-4 p-4">
			{Object.entries(expenses).map(([expense, value]) => (
				<div key={expense} className="flex flex-col gap-2">
					<Label>{expense}</Label>
					<div className="flex gap-2">
						<Input
							type="number"
							className=""
							defaultValue={value}
							onBlur={(e) => {
								if (Number.isNaN(+e.currentTarget.valueAsNumber)) return;
								updateExpense(expense, +e.currentTarget.valueAsNumber);
							}}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									e.currentTarget.blur();
								}
							}}
						/>
						<Button
							variant={"ghost"}
							size={"icon"}
							onClick={() => removeExpense(expense)}
						>
							<XIcon />
						</Button>
					</div>
				</div>
			))}
			<div className="flex flex-col gap-2">
				<Label>Add new expense</Label>
				<Input onKeyDown={addExpense} />
			</div>
		</div>
	);
};

export default MonthlyExpenses;
