// Higher order function returns a new function
// that passes its arguments to f and returns the logical
// negation of the function's return value
/**
 * negates the return value of a function
 *
 * @name not
 * @function
 * @param {function} func - function to test
 * @returns {boolean}
 */
function not (func) {
  return function () {
    var result = func.apply(this, arguments);
    return !result;
  };
}

/**
 * Checks if a number is even
 *
 * @name isEven
 * @function
 * @param {number} num - a number to check
 * @returns {boolean}
 */
var isEven = function (num) {
  return num % 2 === 0;
};

var isOdd = not(isEven);
console.log([1, 1, 3, 2, 5].every(isOdd));
