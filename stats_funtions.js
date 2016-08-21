// This  an array of number that represents our
// dataset

var data = [1, 1, 3, 5, 5];

// The mean is the sum of the elements divided by the
// number of elements
/**
 * Compute the mean from a list of elements
 * @name mean
 * @param {array} dataList
 * @returns {number} the mean value
 */

function getMean (dataList) {
  var total = 0;
  var len = dataList.length;
  for (var i = 0; i < len; i++) {
    total += dataList[i];
  }
  return total / len;
}

// The standard deviation
// To compute the standard deviation, we first sum the squares
// of the deviation of each element from the mean
/**
 * Computes the standard deviation for a list of elements
 * @param {number} dataList
 * @returns {number} The standard deviation value
 */

function standardDeviation (dataList) {
  var total = 0;
  var len = dataList.length;
  var mean = getMean(dataList);
  for (var i = 0; i < len; i++) {
    var deviation = data[i] - mean;
    total += deviation * deviation;
  }
  return Math.sqrt(total / (len - 1));
}

console.log('Data set: ');
console.log(data);
console.log('The mean: ');
console.log(getMean(data));
console.log('The Standard deviation:');
console.log(standardDeviation(data));

