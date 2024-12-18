/** Problema 4, Verifica daca o matrice este */
function isHermitian(matrix) {
	const numRows = matrix.length;

	// Check if the matrix is square
	if (!matrix.every((row) => row.length === numRows)) {
		return false;
	}

	// Check the Hermitian property
	for (let i = 0; i < numRows; i++) {
		for (let j = 0; j <= i; j++) {
			const element = matrix[i][j];
			const conjugateElement = matrix[j][i];

			// For real numbers, conjugate is the same as the number itself
			const realMatch =
				typeof element === "number" && element === conjugateElement;

			// For complex numbers represented as objects
			const complexMatch =
				typeof element === "object" &&
				typeof conjugateElement === "object" &&
				element.re === conjugateElement.re &&
				element.im === -conjugateElement.im;

			if (!realMatch && !complexMatch) {
				return false;
			}
		}
	}
	return true;
}

// test cases
// Example matrices
const m1 = [
	[1, 2],
	[2, 1],
];

const m2 = [
	[
		{ re: 2, im: 0 },
		{ re: 1, im: 2 },
	],
	[
		{ re: 1, im: -2 },
		{ re: 3, im: 0 },
	],
];

const m3 = [
	[1, 2],
	[3, 1],
];

// Test the function
console.log(isHermitian(m1)); // true
console.log(isHermitian(m2)); // true
console.log(isHermitian(m3)); // false
