function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

// Call the factorial function for a large number
var result = factorial(100);
console.log(result);