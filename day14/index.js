const helpers = require('../helpers/helperFunctions');

const matrix = helpers.loadData(__dirname.split('/').pop(), false).map(line => line.split(''))
// helpers.viewMatrix(matrix)

function findNorthernmostDot(coords) {
  let targetR = coords.r
  for (let r = coords.r - 1; r >= 0; r--) {
    if (matrix[r][coords.c] === '.') {
      targetR = r
    } else {
      break
    }
  }
  return {r: targetR, c: coords.c}
}

function roll(current) {
  const target = findNorthernmostDot(current)
  if (target.r === current.r && target.c === current.c) return
  matrix[target.r][target.c] = matrix[current.r][current.c]
  matrix[current.r][current.c] = '.'
}

for (let r = 1; r < matrix.length; r++) {
  for (let c = 0; c < matrix[0].length; c++) {
    if (matrix[r][c] === 'O') roll({r, c})
  }
}

let totalLoad = 0
let row = 0
while (row < matrix.length) {
  const multiplier = matrix.length - row
  const rowLoad = matrix[row].reduce((tot, char) => {
    if (char === 'O') {
      return tot + 1
    } else {
      return tot
    }
  },0)
  totalLoad += (rowLoad * multiplier)
  row++
}

console.log('Part One:', totalLoad) // 107142