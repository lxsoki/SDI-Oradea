function isHermitian(matrix) {
	const n = matrix.length;

	// Check if matrix is square
	for (let i = 0; i < n; i++) {
		if (matrix[i].length !== n) {
			console.log("Matrix is not square.");
			return false; // Not square
		}
	}

	// Check the Hermitian property A[i][j] == A[j][i]
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n; j++) {
			// Debugging: Checking each comparison in detail
			if (matrix[i][j] !== matrix[j][i]) {
				console.log(`Matrix is not Hermitian at position [${i}][${j}]`);
				return false; // Not Hermitian
			}
		}
	}

	return true;
}

// Example matrices

const matrix1 = [
	[2, 1, 1],
	[1, 2, 1],
	[1, 1, 2],
];

const matrix2 = [
	[2, 1, 1],
	[1, 2, -1],
	[1, -1, 2],
];

console.log(isHermitian(matrix1)); // Should return true (Hermitian matrix)
console.log(isHermitian(matrix2)); // Should return false (Not Hermitian)
