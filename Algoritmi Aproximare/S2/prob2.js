/** Seminar 2, problema 2 */
/*
    Exemplu de rulare:
    node prob2.js 10
    param 10 reprezinta numarul de termeni pentru seria Maclaurin
    ---
    factorial -> calculeaza factorialul unui numar folosit in seria Maclaurin
    maclaurinExponential -> calculeaza e^(x^2) folosind seria Maclaurin
    approximateIntegral -> calculeaza integrala lui e^(x^2) de la 0 la 1 folosind seria Maclaurin
    main -> functia principala care citeste argumentele din linia de comanda si afiseaza rezultatul
*/
// Function to calculate factorial
const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));
// Function to approximate e^(x^2) using Maclaurin series
const maclaurinExponential = (x, terms) => {
	let sum = 0;
	for (let n = 0; n < terms; n++) {
		sum += Math.pow(x, 2 * n) / factorial(n);
	}
	return sum;
};
// Function to calculate the integral of e^(x^2) from 0 to 1 using Maclaurin series
const approximateIntegral = (terms) => {
	const intervals = 10000; // Number of intervals for numerical integration
	const step = 1 / intervals;
	let integral = 0;
	for (let i = 0; i < intervals; i++) {
		const x = i * step;
		integral += maclaurinExponential(x, terms) * step;
	}
	return integral.toFixed(2); // Round to two decimal places
};
// Main function to run from command line
const main = () => {
	const args = process.argv.slice(2);
	if (args.length < 1) {
		console.log(
			"Please provide the number of terms for the Maclaurin series."
		);
		return;
	}
	const terms = parseInt(args[0]);
	console.log(
		"Approximate value of the integral of e^(x^2) from 0 to 1 is:",
		approximateIntegral(terms)
	);
};
main();
