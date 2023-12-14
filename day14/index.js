const helpers = require('../helpers/helperFunctions');

let matrix = helpers.loadData(__dirname.split('/').pop(), false).map(line => line.split(''))
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

function tilt(dir = 'n') {
  if (dir === 'n') {
    for (let r = 1; r < matrix.length; r++) {
      for (let c = 0; c < matrix[0].length; c++) {
        if (matrix[r][c] === 'O') roll({r, c}, dir)
      }
    }
  } else if (dir === 'w') {
    for (let r = 0; r < matrix.length; r++) {
      for (let c = 0; c < matrix[0].length; c++) {
        if (matrix[r][c] === 'O') roll({r, c}, dir)
      }
    }
  } else if (dir === 's') {
    for (let r = matrix.length - 2; r >= 0; r--) {
      for (let c = 0; c < matrix[0].length; c++) {
        if (matrix[r][c] === 'O') roll({r, c}, dir)
      }
    }
  } else {
    for (let r = 0; r < matrix.length; r++) {
      for (let c = matrix[0].length - 1; c >= 0; c--) {
        if (matrix[r][c] === 'O') roll({r, c}, dir)
      }
    } 
  }
}

function calcLoad() {
  let result = 0
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
    result += (rowLoad * multiplier)
    row++
  }
  return result
}

function arrayToString(arr) {
  return arr.map(elem => elem.join('')).join('')
}

// tilt() // commented out to avoid impacting Part 2
console.log('Part One:', calcLoad()) // 107142

const cache = new Map()
const instances = {}

let cycle = 0
/**
 * Identified (by observing logged output) that the matrix output from a cycle
 * repeats every 22 cycles after 265 cycles have been completed.
 * So we can calculate which cycle will generate the same load as the billionth
 * using this formula:
 * (1 billion - 265) % 22 + 265
 */
const repeatStart = 265
const repeatLength = 22
const limit = (1_000_000_000 - repeatStart) % repeatLength + repeatStart
while (cycle < limit) {
  let matrixStr = arrayToString(matrix)
  if (cache.has(matrixStr)) {
    matrix = helpers.deepCopy(cache.get(matrixStr))
    instances[matrixStr]++
  } else {
    // console.log(cycle)
    tilt('n')
    tilt('w')
    tilt('s')
    tilt('e')
    cache.set(matrixStr, helpers.deepCopy(matrix))
    instances[matrixStr] = 1
  }
  // const load = calcLoad(matrix)
  // if (load === 104715) console.log(cycle, load)
  cycle++
}
// console.log(instances)
// console.log(Object.values(instances))
// Object.values(instances).forEach((val, i) => console.log(i, val))

console.log('Part Two:', calcLoad(matrix)) // 104815
