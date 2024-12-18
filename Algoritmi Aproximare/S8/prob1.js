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

	// Calculate the Bernstein difference B_n(f)(x) - B_{n+1}(f)(x)
	let difference = 0;
	for (let k = 0; k <= n - 1; k++) {
		// Calculate coefficients
		const coefficient =
			(k / n) * ((k + 1) / (n + 1)) - ((k + 1) / (n + 1)) * (k / n);

		// Compute binomial probability term
		const p_n_minus_1_k =
			binomialCoefficient(n - 1, k) *
			Math.pow(x, k) *
			Math.pow(1 - x, n - 1 - k);

		// Add to the sum
		difference += coefficient * f(k / n) * p_n_minus_1_k;
	}

	// Include the prefactor
	difference *= (x * (1 - x)) / (n * (n + 1));

	return difference;
}

// Example usage
const f = (t) => t * t; // Example function f(x) = x^2
const n = 3; // Degree of Bernstein polynomial
const x = 0.5; // Point of evaluation

console.log("Bernstein difference:", bernsteinDifference(f, n, x));
