export interface MonthlyExpensesModel {
	monthlyExpenses: Record<string, number>;
	singleExpenses: Record<string, number>;
	totalExpenses: number;
	updateMonthlyExpenses: (updatedExpenses: MonthlyExpenses) => void;
	getExpenses: () => MonthlyExpenses;
}

export type MonthlyExpenses = Pick<
	MonthlyExpensesModel,
	"monthlyExpenses" | "singleExpenses" | "totalExpenses"
>;

export const createMonthlyExpenses = (): MonthlyExpensesModel => {
	return {
		monthlyExpenses: {},
		singleExpenses: {},
		totalExpenses: 0,
		updateMonthlyExpenses(updatedExpenses) {
			this.monthlyExpenses = updatedExpenses.monthlyExpenses;
			this.singleExpenses = updatedExpenses.singleExpenses;
			this.totalExpenses = updatedExpenses.totalExpenses;
		},
		getExpenses() {
			return {
				monthlyExpenses: this.monthlyExpenses,
				singleExpenses: this.singleExpenses,
				totalExpenses: this.totalExpenses,
			};
		},
	};
};
