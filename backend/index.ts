import {
	createMonthlyExpenses,
	type MonthlyExpenses,
	type MonthlyExpensesModel,
} from "./Models/expenses.model";

const monthlyExpenses = createMonthlyExpenses();

const CORS_HEADERS = {
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "OPTIONS, POST",
		"Access-Control-Allow-Headers": "Content-Type, Authorization",
	},
};

Bun.serve({
	routes: {
		// Per-HTTP method handlers
		"/api/monthly-expenses": {
			GET: () => Response.json(monthlyExpenses.getExpenses()),
			PUT: async (req) => {
				const body = await req.json();

				monthlyExpenses.updateMonthlyExpenses(body as MonthlyExpenses);
				return new Response("Ok");
			},
			OPTIONS: () => {
				const res = new Response("Departed", CORS_HEADERS);
				return res;
			},
		},
		// Wildcard route for all routes that start with "/api/" and aren't otherwise matched
		"/api/*": Response.json({ message: "Not found" }, { status: 404 }),
	},
});

console.log("Server running on http://localhost:3000");
