const helpers = require('../helpers/helperFunctions');

const lines = helpers.loadData(__dirname.split('/').pop(), false)
// console.log(lines)

const grid = new Map()
for (let r = 0; r < lines.length; r++) {
  lines[r].split('').forEach((v, c) => grid.set(`${r},${c}`, v))
}
const height = lines.length
const width = lines[0].trim().length

function next(path) {
  const loc = path[path.length - 1]
  const [R,C] = loc.split(',')
  const locR = parseInt(R)
  const locC = parseInt(C)

  // handle slopes
  if (grid.get(loc) === '^') return [`${locR - 1},${locC}`]
  if (grid.get(loc) === 'v') return [`${locR + 1},${locC}`]
  if (grid.get(loc) === '<') return [`${locR},${locC - 1}`]
  if (grid.get(loc) === '>') return [`${locR},${locC + 1}`]

  const nextCoords = []
  for (const [r, c] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
    const nextR = locR + r
    const nextC = locC + c
    if (nextR < 0 || nextR >= height || nextC < 0 || nextC >= width) {
      continue // outside the grid
    }
    if (path.includes(nextR + ',' + nextC)) {
      continue // no backtracking
    }
    // no heading up slippery slopes
    if (r === -1 && grid.get(nextR + ',' + nextC) === 'v') continue
    if (r === 1 && grid.get(nextR + ',' + nextC) === '^') continue
    if (c === -1 && grid.get(nextR + ',' + nextC) === '>') continue
    if (c === 1 && grid.get(nextR + ',' + nextC) === '<') continue

    if (grid.get(nextR + ',' + nextC) !== '#') {
      nextCoords.push(nextR + ',' + nextC)
    }
  }
  return nextCoords
}

// const end = '22,21' // test
const end = '140,139'
const paths = [['0,1']]

for (let i = 0; i < paths.length; i++) {
  const path = paths[i]
  let lastStep = path[path.length - 1]
  while (lastStep !== end) {
    console.log(lastStep)
    const moves = next(path)
    if (moves.length > 1) {
      for (let p = 0; p < moves.length - 1; p++) {
        paths.push([...path])
      }
      for (let m = 0; m < moves.length; m++) {
        if (m === 0) {
          path.push(moves[m])
        } else {
          paths[paths.length - m].push(moves[m])
        }
      }
    } else {
      path.push(moves[0])
    }
    lastStep = path[path.length - 1]
  }
}

// paths.forEach(path => console.log(path.length - 1))
const lengths = paths.map(path => path.length - 1)
console.log('Part One:', Math.max(...lengths)) // 1930