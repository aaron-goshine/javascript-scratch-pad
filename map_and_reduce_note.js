/**
 * Adds to values
 * @name sum
 * @param {number} x
 * @param {number} y
 * @returns {number} The total of the parameter values
 */
var sum = function (x, y) {
  return x + y;
};

/**
 * Adds to values
 * @name square
 * @param {number} x
 * @returns {number} The squared value of the param
 */
var square = function (x) {
  return x * x;
};

// Array map implementation
var map = Array.prototype.map ? function (a, f) {
  return a.map(f);
} : function (a, f) {
  var results = [];
  var len = a.length;
  for (var i = 0; i < len; i++) {
    if (i in a) results[i] = f(i);
  }
  return results;
};

// Reduce an array to single value using a function
var reduce = Array.prototype.reduce ? function (a, f, initialValue) {
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
};

// Test and Demonstration
var data = [1, 1, 3, 5, 5];
var mean = reduce(data, sum) / data.length;
var deviation = map(data, function (x) {
  return x - mean;
});
var stdv = reduce(map(deviation, square), sum) / (data.length - 1);
var standardDeviation = Math.sqrt(stdv);

console.log('standardDeviation');
console.log(standardDeviation);
