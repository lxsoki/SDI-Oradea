/** Tema Seminar 1, problema 2 */
const f = (x) => {
    return 1 / x;
}



const dividedDifference = (x, start, end) => {
    if (end - start === 0) {
        return f(x[start]);
    } else {
        return (dividedDifference(x, start + 1, end) - dividedDifference(x, start, end - 1)) / (x[end] - x[start]);
    }
}


// Get command-line arguments (skip first two, which are node and script path)
const args = process.argv.slice(2);

// Parse the input: the first argument is the array of x values, the second is the start index, and the third is the end index.
const x = args[0].split(',').map(Number); // Convert comma-separated string to an array of numbers
const start = parseInt(args[1], 10); // Start index
const end = parseInt(args[2], 10);   // End index

if (x.some(isNaN) || isNaN(start) || isNaN(end)) {
    console.log("Please provide valid numbers for the array x, start index, and end index.");
} else if (start < 0 || end >= x.length || start > end) {
    console.log("Please provide valid start and end indices within the bounds of the array.");
} else {
    const result = dividedDifference(x, start, end);
    console.log(`dividedDifference(${x}, ${start}, ${end}) = ${result}`);
}

// run it with node prob2.js "1,2,3,4" 0 3