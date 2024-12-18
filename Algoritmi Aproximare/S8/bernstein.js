function bernsteinDifference(f, n, x) {
	if (n < 2 || x < 0 || x > 1) {
		throw new Error("Invalid input: n >= 2 and 0 <= x <= 1 are required.");
	}

	// Function to calculate factorial
	function factorial(num) {
		return num <= 1 ? 1 : num * factorial(num - 1);
	}

	// Function to calculate binomial coefficient
	function binomialCoefficient(n, k) {
		return factorial(n) / (factorial(k) * factorial(n - k));
	}

	// Compute the prefactor
	const prefactor = (x * (1 - x)) / (n * (n + 1));

	// Calculate the summation
	let summation = 0;
	for (let k = 0; k <= n - 1; k++) {
		// Binomial probability term for p_{n-1,k}
		const p_n_minus_1_k =
			binomialCoefficient(n - 1, k) *
			Math.pow(x, k) *
			Math.pow(1 - x, n - 1 - k);

		// Contribution of f(k/n)
		const contribution = f(k / n) * p_n_minus_1_k;

		// Log terms for debugging
		console.log(
			`k=${k}, p_n_minus_1_k=${p_n_minus_1_k}, contribution=${contribution}`
		);

		summation += contribution;
	}

	// Multiply summation by prefactor
	const difference = prefactor * summation;

	console.log(
		`Prefactor: ${prefactor}, Summation: ${summation}, Difference: ${difference}`
	);
	return difference;
}

// Main function to run from the terminal
function main() {
	const args = process.argv.slice(2);
	if (args.length < 3) {
		console.error("Usage: node bernstein.js '<function>' <n> <x>");
		console.error("Example: node bernstein.js 't => t * t' 3 0.5");
		process.exit(1);
	}

	try {
		const f = eval(args[0]); // Evaluate the function string
		const n = parseInt(args[1], 10);
		const x = parseFloat(args[2]);

		if (typeof f !== "function" || isNaN(n) || isNaN(x)) {
			throw new Error(
				"Invalid input. Ensure the function is valid and n, x are numbers."
			);
		}

		const result = bernsteinDifference(f, n, x);
		console.log(`Bernstein difference for f(t), n=${n}, x=${x}: ${result}`);
	} catch (error) {
		console.error("Error:", error.message);
		process.exit(1);
	}
}

// Execute the main function if the script is run directly
if (require.main === module) {
	main();
}

// run commands:
// node bernstein.js "t => t * t" 3 0.5
// or
// node bernstein.js "t => Math.sin(t)" 5 0.3
