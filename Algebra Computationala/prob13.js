/** Problema 13 */
/** Afisati toate cuvintele unui cod a carui matrice generatoare se cunoaste */

function generateCodeWords(generatorMatrix) {
	const k = generatorMatrix.length; // Numărul de rânduri (dimensiunea codului)
	const n = generatorMatrix[0].length; // Numărul de coloane (lungimea codului)

	const numWords = 2 ** k; // Numărul total de cuvinte (toate combinațiile posibile)
	const codeWords = [];

	// Generăm toate combinațiile posibile pentru vectorii de intrare
	for (let i = 0; i < numWords; i++) {
		const inputVector = Array.from(
			{ length: k },
			(_, bit) => (i >> bit) & 1
		);

		// Calculăm cuvântul cod prin înmulțirea cu matricea generatoare
		const codeWord = Array.from(
			{ length: n },
			(_, col) =>
				generatorMatrix.reduce(
					(sum, row, rowIndex) =>
						sum + row[col] * inputVector[rowIndex],
					0
				) % 2
		);

		codeWords.push(codeWord);
	}

	return codeWords;
}

// Exemplu de utilizare
const generatorMatrix = [
	[1, 0, 1],
	[0, 1, 1],
];

const codeWords = generateCodeWords(generatorMatrix);
console.log("Cuvintele codului sunt:");
codeWords.forEach((word) => console.log(word.join("")));
