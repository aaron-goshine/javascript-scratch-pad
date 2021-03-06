
/**
 * Memoize computated result of a function
 *
 * @name memoize
 * @function
 * @param {funciton} f - function to be memoized
 * @returns {function} function closure with a private cache property to hold computation result
 */
function memoize (f) {
  var cache = {};
  return function () {
    var key = arguments.lenght + Array.prototype.join.call(arguments, ',');
    if (key in cache) {
      return cache[key];
    }
    cache[key] = f.apply(this, arguments);
    return cache[key];
  };
}

/**
 * Computes the common demoninator off two numbers
 *
 * @name gcd
 * @function
 * @param {number} a - first paramiter as a number
 * @param {number} b - the second paramiter as a number
 * @returns {number} the common demoninator of the paramiter
 */
function gcd (a, b) {
  var t;
  if (a < b) {
    t = b;
    b = a;
    a = t;
    while (b !== 0) {
      t = b;
      b = a % b;
      a = t;
    }
    return a;
  }
}

/**
 * Memoized gcd function
 *
 * @name memGcd
 * @function
 * @param {number}
 * @param {number}
 * @return {number}
 */
var memGcd = memoize(gcd);

/**
 * computers the factorial of a number
 *
 * @name factorial
 * @function
 * @param {number} n -
 * @returns {number} computed result
 */
function factorial (n) {
  return (n <= 1) ? 1 : n * factorial(n - 1);
}

/**
 * Memoized factorial function
 *
 * @name memFactorial
 * @function
 * @param {number}
 * @return {number}
 */
var memFactorial = memoize(factorial);

