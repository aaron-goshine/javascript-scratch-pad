
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
