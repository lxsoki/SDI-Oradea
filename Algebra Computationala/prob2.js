/** Problema 2 */
/** Verificati daca produsul a doua matrici triunghiulare este tot matrice triunghiulare */

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

function multiplyMatrices(A, B) {
	const n = A.length;
	let result = Array.from({ length: n }, () => Array(n).fill(0));

	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			for (let k = 0; k < n; k++) {
				result[i][j] += A[i][k] * B[k][j];
			}
		}
	}

	return result;
}

function isProductTriangular(A, B) {
	// Check if A and B are both triangular matrices
	const isAUpper = isUpperTriangular(A);
	const isALower = isLowerTriangular(A);
	const isBUpper = isUpperTriangular(B);
	const isBLower = isLowerTriangular(B);

	// If both matrices are upper or both are lower, the product is triangular
	if ((isAUpper && isBUpper) || (isALower && isBLower)) {
		return true;
	}

	// Multiply the matrices to get the result
	const product = multiplyMatrices(A, B);

	// Check if the product is triangular
	if (isUpperTriangular(product) || isLowerTriangular(product)) {
		return true;
	}

	return false;
}

// Example usage

const upperTriangularMatrix1 = [
	[2, 1, 1],
	[0, 3, 1],
	[0, 0, 4],
];

const upperTriangularMatrix2 = [
	[1, 0, 0],
	[0, 2, 0],
	[0, 0, 3],
];

const lowerTriangularMatrix1 = [
	[2, 0, 0],
	[1, 3, 0],
	[1, 1, 4],
];

const lowerTriangularMatrix2 = [
	[1, 0, 0],
	[1, 2, 0],
	[1, 1, 3],
];

console.log(
	isProductTriangular(upperTriangularMatrix1, upperTriangularMatrix2)
); // true (product is upper triangular)
console.log(
	isProductTriangular(lowerTriangularMatrix1, lowerTriangularMatrix2)
); // true (product is lower triangular)
console.log(
	isProductTriangular(upperTriangularMatrix1, lowerTriangularMatrix1)
); // false (product is not triangular)
