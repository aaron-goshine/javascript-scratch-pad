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

/**
 * Returns an function that expects an array
 *
 * @name mapper
 * @function
 * @param {function} f - A function to be applied
 * @returns {function}  function that accepts an array
 */
function mapper (f) {
  return function (a) {
    return a.map(f);
  };
}

/**
 * Increments a numeric value
 *
 * @name increment
 * @function
 * @param {number} x - value to be incremented
 * @returns {number} incremented value
 */
var increment = function (x) {
  return x + 1;
};

var incrementer = mapper(increment);
console.log('incrementer([1, 2, 3])');
console.log(incrementer([1, 2, 3]));

/**
 * Returns a function that composes f . g
 *
 * @name compose
 * @function
 * @param {function} f - function
 * @param {function} g - function
 * @returns {function} function to compose functions passed in as parameter
 */
function compose (f, g) {
  return function () {
    return f(g.apply(this, arguments));
  };
}

/**
 * Squares a number
 *
 * @name square
 * @function
 * @param {number} x - numeric value to be squared
 * @returns {number} the squared value
 */
var square = function (x) {
  return x * x;
};

/**
 * Adds two numbers
 *
 * @name sum
 * @function
 * @param {number} x
 * @param {number} y
 * @returns {number} returns the sum of two numbers
 */
var sum = function (x, y) {
  return x + y;
};

var squareOfSum = compose(square, sum);
console.log('squareOfSum(2, 3)');
console.log(squareOfSum(2, 3));

