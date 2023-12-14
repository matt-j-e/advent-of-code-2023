/**
 * Create a 2d array with the defined number of rows & cols
 * populated with the defined character
 * @param {*} rows The number of rows in the array
 * @param {*} cols The number of columns in the array
 * @param char The char to populate the array (default=0
 * @returns the completed array
 */
function create2DArrayOfChar(rows, cols, char=0) {
  const arr = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(char);
    }
    arr.push(row);
  }
  return arr;
}

/**
 * Load the puzzle input into a starting array
 * @param {*} dir The current day's directory
 * @param {*} test  A flag to control whether the test input or
 * actual input is loading into the initial array.
 * @returns the puzzle input contained in an array
 */
function loadData(dir, test = false) {
  const fs = require("fs");

  let filename = `./${dir}/input.txt`;
  if (test) {
    filename = `./${dir}/test.txt`;
  }
  try {
    return fs.readFileSync(filename, "utf8").split("\n");
  } catch (e) {
    console.log(e);
  }
}

/**
 * Prints out a 2D array with each row converted to a string.
 * Useful for visualising a 2D array of single chars
 * @param matrix A 2D array
 * @returns nothing - it just console.logs the array
 */
function viewMatrix(matrix) {
  console.log('\n')
  for (line of matrix) {
    console.log(line.join(''))
  }
}

/**
 * Generates a deep copy of a multi-dimensional array
 * (it will also copy a flat array but there are many simpler
 * ways to do that!)
 * @param {*} arr is the array to be copied
 * @returns a copy of the array
 */
function deepCopy(arr) {
  let result = []
  arr.forEach(elem => {
    if(Array.isArray(elem)) {
      result.push(deepCopy(elem))
    } else {
      result.push(elem)
    }
  })
  return result
}

module.exports = { 
	create2DArrayOfChar,
	loadData,
  viewMatrix,
  deepCopy
};

