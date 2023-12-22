const helpers = require('../helpers/helperFunctions');

const lines = helpers.loadData(__dirname.split('/').pop(), true)
// console.log(lines[65][65]) // outputs 'S' with input data
const grid = new Map()
for (let r = 0; r < lines.length; r++) {
  lines[r].split('').forEach((v, c) => grid.set(`${r},${c}`, v))
}
const height = lines.length
const width = lines[0].trim().length

function next(coords) {
  const nextCoords = []
  for (const [r, c] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
    const nextR = coords[0] + r
    const nextC = coords[1] + c
    if (nextR < 0 || nextR >= height || nextC < 0 || nextC >= width) {
      continue // outside the grid
    }
    if (grid.get(nextR + ',' + nextC) !== '#') {
      // CAN THE RETURN STATEMENT BE CHANGED TO A
      // COMMA-SEPARATED STRING OF COORDS?
      // THAT WAY I COULD CONVERT IT TO A SET
      // TO REDUCE DUPLICATIONS EACH TIME
      // THROUGH THE WHILE LOOP
      nextCoords.push([nextR, nextC])
    }
  }
  return nextCoords
}

const start = [5,5] // test
// const start = [65,65] 
const target = 6 // test
// const target = 64
let queue = [start]
let step = 0
let lastRoundNewPlots = 1
let newPlots
while (step < target) {
  console.log('Step', step)
  newPlots = []
  for (let i = 0; i < lastRoundNewPlots; i++) {
    const nextCoords = next(queue.shift())
    newPlots = [...newPlots, ...nextCoords]
  }
  queue = [...queue, ...newPlots]
  lastRoundNewPlots = newPlots.length
  step++
}

console.log('Part One:', new Set(queue.map(item => `${item[0]}, ${item[1]}`)).size)
// THIS DELIVERS THE RIGHT ANSWER FOR THE TEST DATA
// BUT RUNS FOREVER WITH input.txt