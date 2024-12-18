/** Problema 14 */
/** Se citeste matricea de control a unui cod si o multime de cuvinte. */
/** Afisati-le pe cele care sunt cuvinte ale codului */

function verifyCodeWords(controlMatrix, words) {
	// Funcție pentru a calcula produsul scalar modulo 2
	function checkParity(row, word) {
		// Calculăm suma produselor încrucișate pentru linia curentă
		let sum = 0;
		for (let i = 0; i < row.length; i++) {
			// Înmulțim fiecare bit al liniei cu bitul corespunzător din cuvânt
			sum += parseInt(row[i]) * parseInt(word[i]);
		}

		// Verificăm dacă suma este PAR (0 sau divizibilă la 2)
		return sum % 2 === 0;
	}

	// Verificăm fiecare cuvânt
	function isValidWord(word) {
		// Verificăm pentru TOATE liniile matricei de control
		return controlMatrix.every((row) => checkParity(row, word));
	}

	// Filtrăm și returnăm cuvintele valide
	return words.filter(isValidWord);
}

// Matricea de control
const controlMatrix = [
	["1", "0", "1", "1"],
	["1", "1", "0", "1"],
	["0", "1", "1", "1"],
];

// Mulțimea de cuvinte
const wordSet = ["101", "110", "001", "111", "000"];

// Verificăm cuvintele
const result = verifyCodeWords(controlMatrix, wordSet);
console.log(result);
