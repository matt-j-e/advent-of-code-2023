const helpers = require('../helpers/helperFunctions');

const input = helpers.loadData(__dirname.split('/').pop(), false)
const races = []
const times = input[0].match(/[0-9]+/g)
const distances = input[1].match(/[0-9]+/g)
for (let i = 0; i < times.length; i++) {
  races.push(times[i], distances[i])
}

let combinedWays = 1
let r = 0
while (r < races.length) {
  let ways = 0
  for (let i = 1; i < races[r]; i++) {
    const dist = i * (races[r] - i)
    if (dist > races[r + 1]) ways++
  }
  combinedWays *= ways
  r += 2
}

console.log('Part One:', combinedWays) // 1660968

// Part Two
const time = parseInt(times.join(''))
const maxD = parseInt(distances.join(''))
let minHold
for (let i = 1; i < maxD; i++) {
  const d = i * (time - i)
  if (d > maxD) {
    minHold = i
    break
  }
}

console.log('Part Two', time - (2 * minHold) + 1) // 26499773