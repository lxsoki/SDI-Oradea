/** Problema 5 */
/** Rezolvati un sistem liniar de 4 ecuatii cu 4 necunoscute prin metoda lui Gauss */

function solveLinearSystem(coefficients, constants) {
	const n = 4; // For a 4x4 system

	// Forward elimination
	for (let i = 0; i < n; i++) {
		// Find the pivot and swap rows if necessary
		let maxRow = i;
		for (let k = i + 1; k < n; k++) {
			if (
				Math.abs(coefficients[k][i]) > Math.abs(coefficients[maxRow][i])
			) {
				maxRow = k;
			}
		}

		// Swap rows in coefficients and constants
		[coefficients[i], coefficients[maxRow]] = [
			coefficients[maxRow],
			coefficients[i],
		];
		[constants[i], constants[maxRow]] = [constants[maxRow], constants[i]];

		// Make all rows below this one 0 in the current column
		for (let k = i + 1; k < n; k++) {
			const factor = coefficients[k][i] / coefficients[i][i];
			for (let j = i; j < n; j++) {
				coefficients[k][j] -= factor * coefficients[i][j];
			}
			constants[k] -= factor * constants[i];
		}
	}

	// Back substitution
	const solutions = new Array(n).fill(0);
	for (let i = n - 1; i >= 0; i--) {
		let sum = 0;
		for (let j = i + 1; j < n; j++) {
			sum += coefficients[i][j] * solutions[j];
		}
		solutions[i] = (constants[i] - sum) / coefficients[i][i];
	}

	return solutions;
}

// Example usage
const coefficients = [
	[2, -1, 1, 3],
	[1, 3, 2, -2],
	[3, -2, -1, 1],
	[2, 4, -3, -1],
];

const constants = [5, -1, 3, 2];

const solutions = solveLinearSystem(coefficients, constants);
console.log("Solutions:", solutions);
