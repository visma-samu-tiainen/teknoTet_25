import { useState, useEffect, useCallback } from "react";
export type TMonthlyExpenses = {
	monthlyExpenses: Record<string, number>;
	singleExpenses: Record<string, number>;
	totalExpenses: number;
};

export const useGetMonthlyExpenses = () => {
	const [expenses, setExpenses] = useState<TMonthlyExpenses>({
		monthlyExpenses: {},
		singleExpenses: {},
		totalExpenses: 0,
	});
	const [loading, setLoading] = useState(true);

	const fetchExpenses = useCallback(async () => {
		try {
			const response = await fetch("/api/monthly-expenses");
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const data = await response.json();
			setExpenses(data);
		} catch (error) {
			if (error instanceof Error) {
				throw error;
			}
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchExpenses();
	}, [fetchExpenses]);

	const updateExpenses = async (updatedExpenses: TMonthlyExpenses) => {
		setLoading(true);
		try {
			const response = await fetch("/api/monthly-expenses", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedExpenses),
			});
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			await fetchExpenses();
		} catch (error) {
			if (error instanceof Error) {
				throw error;
			}
		} finally {
			setLoading(false);
		}
	};

	return { expenses, loading, updateExpenses };
};
