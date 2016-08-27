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

var sum = function (x, y) {
  return x + y;
};

partialLeft(f, 2)(3, 4);
partialRight(f, 2)(3, 4);
partialLeft(f, undefined, 2)(3, 4);

var increment = partialLeft(sum, 1);
var cuberoot = partialRight(Math.pow, 1 / 3);
String.first = partial(String.prototype.charAt, 0);
String.last = partial(String.prototype.substr, -1, 1);

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

var not = partialLeft(compose, function (x) {
  return !x;
});

var even = function (x) {
  return x % 2 === 0;
};
// Reduce an array to single value using a function
var reduce = Array.prototype.reduce_ ? function (a, f, initialValue) {
  if (initialValue) {
    return a.reduce(f, initialValue);
  }
  return a.reduce(f);
} : function (a, f, initialValue) {
  var i = 0;
  var len = a.length;
  var accumulator;
  if (initialValue) accumulator = initialValue;
  if (len === 0) throw TypeError();
  while (i < len) {
    if (i in a) {
      accumulator = a[i++];
      break;
    }
    i++;
  }
  if (i === len) throw TypeError();

  while (i < len) {
    accumulator = f(accumulator, a[i]);
    i++;
  }
  return accumulator;
};

// Array map implementation
var map = Array.prototype.map_ ? function (a, f) {
  return a.map(f);
} : function (a, f) {
  var results = [];
  var len = a.length;
  for (var i = 0; i < len; i++) {
    if (i in a) results[i] = f(i);
  }
  return results;
};

var odd = not(even);
var isNumber = not(isNaN);

var data = [1, 1, 3, 5, 5];
var product = function (x, y) {
  return x * y;
};
var neg = partial(product, -1);
var square = partial(Math.pow, undefined, 2);
var sqrt = partial(Math.pow, undefined, 0.5);
var reciprocal = partial(Math.pow, undefined, -1);

var mean = product(reduce(data, sum), reciprocal(data.length));
var stddev = sqrt(product(reduce(map(data, compose(square, partial(sum, neg(mean)))), sum),
                          reciprocal(sum(data.length, -1))));

