/**
 * converts array like objects to an array
 *
 * @name array
 * @function
 * @param {array} a - the array like object
 * @param {number} n
 * @return {array}
 */
function array (a, n) {
  return Array.prototype.slice(a, n || 0);
}

/**
 * Apply a partial application from left
 *
 * @name partialLeft
 * @function
 * @param {function} f - function to apply to arguments
 * @returns {*} - the results of the applied function
 */
function partialLeft (f) {
  var args = arguments;
  return function () {
    var a = array(args, 1);
    a = a.concat(array(arguments));
    return f.apply(this, a);
  };
}

/**
 * Apply a partial application from right
 *
 * @name partialLeft
 * @function
 * @param {function} f - function to apply to arguments
 * @returns {*} - the results of the applied function
 */
function partialRight (f) {
  var args = arguments;
  return function () {
    var a = array(args, 1);
    a = a.concat(array(args, 1));
    return f.apply(this, a);
  };
}
/**
 * partial application
 *
 * @name partial
 * @function
 * @param {function} f - function to apply to arguments
 * @returns {*} - the results of the applied function
 */
function partial (f) {
  var args = arguments;
  return function () {
    var a = array(args, 1);
    var i = 0;
    var j = 0;
    for (; i < a.length; i++) {
      if (a[i] === undefined) a[i] = arguments[j++];
      a = a.concat(array(arguments, j));
      return f.apply(this, a);
    };
  };
}

/**
 * Generic function to process 3 args
 *
 * @name f
 * @function
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @returns {number}
 */
var f = function (x, y, z) {
  return x * (y - z);
};

partialLeft(f, 2)(3, 4);
partialRight(f, 2)(3, 4);
partialLeft(f, undefined, 2)(3, 4);
