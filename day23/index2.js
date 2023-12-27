const helpers = require('../helpers/helperFunctions');

let lines = helpers.loadData(__dirname.split('/').pop(), false)
console.log(lines)
lines = lines.map(line => {
  line = line.replaceAll('<','.')
    .replaceAll('>','.')
    .replaceAll('^','.')
    .replaceAll('v','.')
  return line
})
console.log(lines)

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
    // console.log(lastStep)
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
    } else if (moves.length === 1) {
      path.push(moves[0])
    } else {
      lastStep = end
      continue
    }
    lastStep = path[path.length - 1]
  }
}

// paths.forEach(path => console.log(path.length - 1))
const lengths = paths.map(path => path.length - 1)
console.log('Part Two:', Math.max(...lengths)) // 5847 too low