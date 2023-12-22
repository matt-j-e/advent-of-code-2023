const helpers = require('../helpers/helperFunctions');

const lines = helpers.loadData(__dirname.split('/').pop(), false)
// console.log(lines[65][65]) // outputs 'S' with input data
const grid = new Map()
for (let r = 0; r < lines.length; r++) {
  lines[r].split('').forEach((v, c) => grid.set(`${r},${c}`, v))
}
const height = lines.length
const width = lines[0].trim().length

function next(coordStr) {
  const coords = coordStr.split(',')
  const nextCoords = []
  for (const [r, c] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
    const nextR = parseInt(coords[0]) + r
    const nextC = parseInt(coords[1]) + c
    if (nextR < 0 || nextR >= height || nextC < 0 || nextC >= width) {
      continue // outside the grid
    }
    if (grid.get(nextR + ',' + nextC) !== '#') {
      nextCoords.push(nextR + ',' + nextC)
    }
  }
  return nextCoords
}

// const start = '5,5' // test
// const target = 6 // test
const start = '65,65' 
const target = 64
let queue = [start]
let step = 0
let lastRoundNewPlots = 1
let newPlots
while (step < target) {
  console.log('Step', step)
  newPlots = []
  for (let i = 0; i < lastRoundNewPlots; i++) {
    const nextCoords = next(queue.shift())
    const plots = [...newPlots, ...nextCoords]
    newPlots = Array.from(new Set(plots))
  }
  queue = [...queue, ...newPlots]
  lastRoundNewPlots = newPlots.length
  step++
}

console.log('Part One:', new Set(queue).size) // 3677