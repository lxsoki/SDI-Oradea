/** Seminar 2, problema 1 */

/*
    Exemplu de rulare:
    node prob1.js -1 1 2 3 2 -1 1 2 1.5
    Nodurile x0, x1, x2, x3 sunt -1, 1, 2, 3
    Valorile f(x0), f(x1), f(x2), f(x3) sunt 2, -1, 1, 2
    Punctul de interpolare este 1.5
    ---
    dividedDifferences -> calculeaza diferentele divizate pentru interpolarea Newton
    newtonPolynomial -> foloseste diferentele divizate pentru a calcula polinomul de interpolare Newton pe un punct dat
    main -> functia principala care citeste argumentele din linia de comanda si afiseaza rezultatul
*/

// Function to calculate divided differences
const dividedDifferences = (x, f) => {
	const n = x.length;
	const differences = Array.from(f); // Copy initial values of f into differences

	for (let i = 1; i < n; i++) {
		for (let j = n - 1; j >= i; j--) {
			differences[j] =
				(differences[j] - differences[j - 1]) / (x[j] - x[j - i]);
		}
	}

	return differences;
};

// Function to calculate the Newton interpolation polynomial
const newtonPolynomial = (x, f, point) => {
	const differences = dividedDifferences(x, f);
	let result = differences[0];
	let product = 1;

	for (let i = 1; i < x.length; i++) {
		product *= point - x[i - 1];
		result += differences[i] * product;
	}

	return result;
};

// Main function to run from command line
const main = () => {
	const args = process.argv.slice(2);
	if (args.length < 8) {
		console.log(
			"Please provide at least 8 arguments: 4 x values and 4 f values for the nodes."
		);
		return;
	}

	const x = args.slice(0, 4).map(Number);
	const f = args.slice(4, 8).map(Number);
	const point = args[8] ? Number(args[8]) : x[0]; // Optional interpolation point

	console.log(
		"The Lagrange interpolation polynomial evaluated at point",
		point,
		"is:",
		newtonPolynomial(x, f, point)
	);
};

main();
