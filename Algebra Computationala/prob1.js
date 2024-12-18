/** Problema 1 */
/** Verificati daca inversa unei matrici triunghiulare este tot triunghiulara */

function isUpperTriangular(matrix) {
	const n = matrix.length;
	for (let i = 1; i < n; i++) {
		for (let j = 0; j < i; j++) {
			if (matrix[i][j] !== 0) return false; // Check if any element below the main diagonal is non-zero
		}
	}
	return true;
}

function isLowerTriangular(matrix) {
	const n = matrix.length;
	for (let i = 0; i < n - 1; i++) {
		for (let j = i + 1; j < n; j++) {
			if (matrix[i][j] !== 0) return false; // Check if any element above the main diagonal is non-zero
		}
	}
	return true;
}

function inverseMatrix(matrix) {
	const n = matrix.length;
	let augmented = matrix.map((row, i) => [...row, ...Array(n).fill(0)]);

	// Create an identity matrix on the right side
	for (let i = 0; i < n; i++) {
		augmented[i][n + i] = 1;
	}

	// Perform Gaussian elimination
	for (let i = 0; i < n; i++) {
		// Make the diagonal element 1
		let factor = augmented[i][i];
		if (factor === 0)
			throw new Error("Matrix is singular and cannot be inverted");

		for (let j = 0; j < 2 * n; j++) {
			augmented[i][j] /= factor;
		}

		// Eliminate other rows
		for (let j = 0; j < n; j++) {
			if (i !== j) {
				factor = augmented[j][i];
				for (let k = 0; k < 2 * n; k++) {
					augmented[j][k] -= augmented[i][k] * factor;
				}
			}
		}
	}

	// Extract the right half as the inverse matrix
	const inverse = augmented.map((row) => row.slice(n));

	return inverse;
}

function isInverseTriangular(matrix) {
	// Check if the matrix is upper or lower triangular
	const isUpper = isUpperTriangular(matrix);
	const isLower = isLowerTriangular(matrix);

	if (isUpper || isLower) {
		return true;
	}
	return false;
}

// Main function to check if the inverse of a triangular matrix is also triangular
function checkInverseIsTriangular(matrix) {
	const n = matrix.length;

	// Check if the matrix is triangular (upper or lower)
	const isUpper = isUpperTriangular(matrix);
	const isLower = isLowerTriangular(matrix);

	if (!isUpper && !isLower) {
		throw new Error("Matrix is not triangular");
	}

	// Find the inverse of the matrix
	const inverse = inverseMatrix(matrix);

	// Check if the inverse is also triangular
	const isInverseUpper = isUpperTriangular(inverse);
	const isInverseLower = isLowerTriangular(inverse);

	return isUpper ? isInverseUpper : isInverseLower;
}

// Example usage:

const upperTriangularMatrix = [
	[2, 1, 1],
	[0, 3, 1],
	[0, 0, 4],
];

const lowerTriangularMatrix = [
	[2, 0, 0],
	[1, 3, 0],
	[1, 1, 4],
];

console.log(checkInverseIsTriangular(upperTriangularMatrix)); // true
console.log(checkInverseIsTriangular(lowerTriangularMatrix)); // true
