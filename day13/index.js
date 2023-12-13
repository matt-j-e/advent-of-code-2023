const helpers = require('../helpers/helperFunctions');

const lines = helpers.loadData(__dirname.split('/').pop(), false)
const patterns = []
const validReflectionLines = []
let pattern = []
lines.forEach((line, i) => {
  if (line !== '') pattern.push(line)
  if (line === '' || i === lines.length - 1) {
    patterns.push(pattern)
    pattern = []
  }
})

function range(len, row) {
  let s = 0
  let e = row + row + 1
  if ((row + 1) > (len / 2)) {
    s = row - ((len - 1) - (row + 1))
    e = len - 1
  }
  return {s,e}
}

function isExtended(pattern, row) {
  const r = range(pattern.length, row)
  while(r.s < r.e) {
    if (pattern[r.s] !== pattern[r.e]) return false
    r.s++
    r.e--
  }
  return true
}

function isMirror(p, dir, vrl) {
  for (let r = 0; r < p.length - 1; r++) {
    if (dir && vrl) {
      if (dir === vrl.dir && r + 1 === vrl.val) continue
    }
    if (p[r] === p[r + 1]) {
      if (isExtended(p, r)) {
        return r + 1
      }
    }
  }
  return false
}

function transpose(p) {
  const matrix = [...p].map(line => line.split(''))
  const transposed = matrix[0].map((col, i) => matrix.map(row => row[i]));
  return transposed.map(line => line.join(''))
}

patterns.forEach(pattern => {
  let dir, val
  const horizontal = isMirror(pattern)
  const vertical = isMirror(transpose(pattern))
  if (horizontal) {
    dir = 'h'
    val = horizontal
  }
  if (vertical) {
    dir = 'v'
    val = vertical
  }
  validReflectionLines.push({dir, val})
})

const part1 = validReflectionLines.reduce((tot, line) => {
  const lineVal = line.dir === 'h' ? line.val * 100 : line.val
  return tot + lineVal
}, 0)
console.log('Part One:', part1) // 35521

function swapChar(str, i) {
  const replacement = str[i] === '#' ? '.' : '#'
  return `${str.slice(0, i)}${replacement}${str.slice(i + 1)}`
}

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

for (let i = 0; i < patterns.length; i++) {
  let match = false
  for (let r = 0; r < patterns[i].length; r++) {
    for (let c = 0; c < patterns[i][0].length; c++) {
      const p = deepCopy(patterns)
      p[i][r] = swapChar(patterns[i][r], c)
      const horizontal = isMirror(p[i], 'h', validReflectionLines[i])
      const vertical = isMirror(transpose(p[i]), 'v', validReflectionLines[i])
      if (horizontal && (validReflectionLines[i].dir !== 'h' || validReflectionLines[i].val !== horizontal )) {
        validReflectionLines[i].dir = 'h'
        validReflectionLines[i].val = horizontal
        match = true
        break
      }
      if (vertical && (validReflectionLines[i].dir !== 'v' || validReflectionLines[i].val !== vertical)) {
        validReflectionLines[i].dir = 'v'
        validReflectionLines[i].val = vertical
        match = true
        break
      }
    }
    if (match) {
      match = false
      break
    }
  }
}

const part2 = validReflectionLines.reduce((tot, line) => {
  const lineVal = line.dir === 'h' ? line.val * 100 : line.val
  return tot + lineVal
}, 0)
console.log('PartTwo:', part2) // 34795
