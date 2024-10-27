/** Tema Seminar 1, problema 1 */

const f = (x) => {
    return x * x;
}

const deltaKf = (k, x, h) =>  {
    if (k === 0) {
        return f(x);
    }
    return deltaKf(k - 1, x + h, h) - deltaKf(k - 1, x, h);
}

const args = process.argv.slice(2);
const k = parseInt(args[0], 10);
const x = parseFloat(args[1]);
const h = parseFloat(args[2]);

if (isNaN(k) || isNaN(x) || isNaN(h)) {
    console.error("Provide valid numbers for k, x and h");
} else {
    const result = deltaKf(k, x, h);
    console.log(`deltaKf(${k}, ${x}, ${h}) = ${result}`);
}

// run it with node prob1.js param1 param2 param3