const heapq = require('heapq')

const helpers = require('../helpers/helperFunctions');
const lines = helpers.loadData(__dirname.split('/').pop(), false)
const grid = new Map()
for (let r = 0; r < lines.length; r++) {
  lines[r].split('').forEach((v, c) => grid.set(`${r},${c}`, parseInt(v)))
}
const height = lines.length
const width = lines[0].trim().length
const queue = []
const cmp = (x, y) => x[0] < y[0]
heapq.push(queue, [0,0,0,0,0,0], cmp)
const seen = new Set()

let totalHeat

while (queue.length > 0) {
  const [heat, r, c, dr, dc, s] = heapq.pop(queue, cmp)

  if (seen.has([r, c, dr, dc, s].toString())) continue

  if (r === height - 1 && c === width - 1) {
    totalHeat = heat
    break
  }

  seen.add([r, c, dr, dc, s].toString())

  for (const [nextDr, nextDc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
    const nextR = r + nextDr
    const nextC = c + nextDc
    if (nextR < 0 || nextR >= height || nextC < 0 || nextC >= width) {
      continue // outside the grid
    }
    if (nextDr === -dr && nextDc === -dc) {
      continue // back steps not allowed
    }
    if (nextDr === dr && nextDc === dc) {
      if (s < 3) {
        heapq.push(queue, [
          heat + grid.get(nextR + ',' + nextC),
          nextR,
          nextC,
          nextDr,
          nextDc,
          s + 1
        ], cmp)
      } else {
        continue
      }
    } else {
      heapq.push(queue, [
        heat + grid.get(nextR + ',' + nextC),
        nextR,
        nextC,
        nextDr,
        nextDc,
        1
      ], cmp)
    }
  }
}

console.log('Part One:', totalHeat) // 786 too high, 785 = correct