/** problema 6 */
/** Calculeaza rangul unei matrici prin metoda Gauss. 
    Calculati inversa matricii folosind metoda lui Gauss */
function calculateRank(matrix) {
	const numRows = matrix.length;
	const numCols = matrix[0].length;
	let rank = 0;

	const mat = matrix.map((row) => [...row]); // Copie pentru a nu modifica originalul

	for (let row = 0; row < numRows; row++) {
		// Găsește pivotul
		let pivotCol = -1;
		for (let col = 0; col < numCols; col++) {
			if (mat[row][col] !== 0) {
				pivotCol = col;
				break;
			}
		}

		if (pivotCol === -1) {
			continue; // Rândul este complet zero
		}

		// Normalizează pivotul
		const pivot = mat[row][pivotCol];
		for (let col = 0; col < numCols; col++) {
			mat[row][col] /= pivot;
		}

		// Anulează restul elementelor de pe coloană
		for (let otherRow = 0; otherRow < numRows; otherRow++) {
			if (otherRow === row) continue;
			const factor = mat[otherRow][pivotCol];
			for (let col = 0; col < numCols; col++) {
				mat[otherRow][col] -= factor * mat[row][col];
			}
		}
	}

	// Numără rândurile nenule
	for (let row = 0; row < numRows; row++) {
		if (mat[row].some((val) => Math.abs(val) > 1e-10)) {
			rank++;
		}
	}

	return rank;
}

// Exemplu
const matrix = [
	[2, 4, 1],
	[1, 2, 1],
	[3, 6, 2],
];

console.log("Rangul matricei:", calculateRank(matrix)); // 2

function calculateInverse(matrix) {
	const n = matrix.length;
	const augmentedMatrix = matrix.map((row, i) => [
		...row,
		...Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)),
	]);

	// Forward elimination
	for (let i = 0; i < n; i++) {
		let pivot = augmentedMatrix[i][i];
		if (pivot === 0) {
			for (let k = i + 1; k < n; k++) {
				if (augmentedMatrix[k][i] !== 0) {
					[augmentedMatrix[i], augmentedMatrix[k]] = [
						augmentedMatrix[k],
						augmentedMatrix[i],
					];
					pivot = augmentedMatrix[i][i];
					break;
				}
			}
		}

		if (pivot === 0) {
			throw new Error("Matricea nu este inversabilă.");
		}

		for (let j = 0; j < 2 * n; j++) {
			augmentedMatrix[i][j] /= pivot;
		}

		for (let k = 0; k < n; k++) {
			if (k !== i) {
				const factor = augmentedMatrix[k][i];
				for (let j = 0; j < 2 * n; j++) {
					augmentedMatrix[k][j] -= factor * augmentedMatrix[i][j];
				}
			}
		}
	}

	// Extrage inversa din matricea augmentată
	const inverse = augmentedMatrix.map((row) => row.slice(n));
	return inverse;
}

// Exemplu
const squareMatrix = [
	[4, 7],
	[2, 6],
];

console.log("Inversa matricei:", calculateInverse(squareMatrix));
// Output: [[0.6, -0.7], [-0.2, 0.4]]
