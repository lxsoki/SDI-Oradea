/** Seminar 2, problema 3 */
/* 
    Exemplu de rulare:
    node prob3.js 115
    param 115 reprezinta punctul la care se estimeaza radicalul
    ---
    lagrangeInterpolation -> calculeaza polinomul de interpolare Lagrange bazat pe nodurile date si valorile functiei
    main -> functia principala care citeste argumentele din linia de comanda si afiseaza rezultatul
*/
// Function to calculate the Lagrange interpolation polynomial at a given point
const lagrangeInterpolation = (xNodes, fValues, x) => {
	let result = 0;
	for (let i = 0; i < xNodes.length; i++) {
		let term = fValues[i];
		for (let j = 0; j < xNodes.length; j++) {
			if (j !== i) {
				term *= (x - xNodes[j]) / (xNodes[i] - xNodes[j]);
			}
		}
		result += term;
	}
	return result;
};
// Main function to run from the command line
const main = () => {
	const args = process.argv.slice(2);
	if (args.length < 1) {
		console.log(
			"Please provide the point at which to estimate the square root (e.g., 115)."
		);
		return;
	}

	const xEstimate = parseFloat(args[0]);
	const xNodes = [100, 121, 144];
	const fValues = xNodes.map(Math.sqrt); // Calculate f(x) = sqrt(x) at the nodes
	const result = lagrangeInterpolation(xNodes, fValues, xEstimate);
	const actual = Math.sqrt(xEstimate);
	const error = Math.abs(actual - result).toFixed(2);
	console.log(
		`Approximate value of sqrt(${xEstimate}) using Lagrange interpolation: ${result}`
	);
	console.log(`Actual value of sqrt(${xEstimate}): ${actual}`);
	console.log(`Error: ${error}`);
};
main();
