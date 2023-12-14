const helpers = require('../helpers/helperFunctions');

const matrix = helpers.loadData(__dirname.split('/').pop(), true).map(line => line.split(''))
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

function findEasternmostDot(coords) {
  let targetC = coords.c
  for (let c = coords.c + 1; c < matrix[0].length; c++) {
    if (matrix[coords.r][c] === '.') {
      targetC = c
    } else {
      break
    }
  }
  return {r: coords.r, c: targetC}
}
// console.log(findEasternmostDot({r:1,c:2}))

function findSouthernmostDot(coords) {
  let targetR = coords.r
  for (let r = coords.r + 1; r < matrix.length; r++) {
    if (matrix[r][coords.c] === '.') {
      targetR = r
    } else {
      break
    }
  }
  return {r: targetR, c: coords.c}
}

function findWesternmostDot(coords) {
  let targetC = coords.c
  for (let c = coords.c - 1; c >= 0; c--) {
    if (matrix[coords.r][c] === '.') {
      targetC = c
    } else {
      break
    }
  }
  return {r: coords.r, c: targetC}
}
// console.log(findWesternmostDot({r:9,c:2}))

function roll(current, dir) {
  let target
  switch(dir) {
    case 'n':
      target = findNorthernmostDot(current)
      break
    case 'e':
      target = findEasternmostDot(current)
      break
    case 's':
      target = findSouthernmostDot(current)
      break
    case 'w':
      target = findWesternmostDot(current)
      break
    default:
      target = findNorthernmostDot(current)
  }
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