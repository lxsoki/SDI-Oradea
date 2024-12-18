/** Seminar 2, problema 4 */
/* 
    Exemplu de rulare:
    node prob4.js 0 1 1 2 2 4 1.5
    params 0 1 -> primul punct (x1, y1) = (0, 1)
    params 1 2 -> al doilea punct (x2, y2) = (1, 2)
    params 2 4 -> al treilea punct (x3, y3) = (2, 4)
    param 1.5 -> punctul la care se estimeaza interpolarea
    ---
    calculateLagrangeBasis -> calculeaza baza Lagrange pentru un punct dat
    calculateLagrange -> calculeaza interpolarea Lagrange pentru un punct dat
    main -> functia principala care citeste argumentele din linia de comanda si afiseaza rezultatul
*/
const calculateLagrangeBasis = (x, points, i) => {
	let result = 1;
	for (let j = 0; j < points.length; j++) {
		if (j !== i) {
			result *= (x - points[j].x) / (points[i].x - points[j].x);
		}
	}
	return result;
};
const calculateLagrange = (x, points) => {
	let result = 0;
	for (let i = 0; i < points.length; i++) {
		result += points[i].y * calculateLagrangeBasis(x, points, i);
	}
	return result;
};
const main = () => {
	const args = process.argv.slice(2);
	if (args.length < 3 || args.length % 2 === 0) {
		console.error("Usage: node task.js x1 y1 x2 y2 ... xn yn x");
		console.error("Where (x1,y1), (x2,y2), ..., (xn,yn) are points and x is the value to interpolate");
		process.exit(1);
	}
	const x = parseFloat(args[args.length - 1]);
	const points = [];
	for (let i = 0; i < args.length - 1; i += 2) {
		points.push({ x: parseFloat(args[i]), y: parseFloat(args[i + 1]) });
	}
	try {
		const result = calculateLagrange(x, points);
		console.log(Number(result.toFixed(4)));
	} catch (error) {
		console.error("Error calculating interpolation:", error.message);
		process.exit(1);
	}
};
main();
