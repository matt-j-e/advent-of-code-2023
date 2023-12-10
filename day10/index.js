const helpers = require('../helpers/helperFunctions');

const matrix = helpers.loadData(__dirname.split('/').pop(), false).map(line => line.split(''))

function nextTile(coords, dir) {
  let nextDir
  const tile = matrix[coords.r][coords.c]
  switch(tile) {
    case '|':
      if (dir === 'n') {
        coords.r -= 1
        nextDir = dir
      }
      if (dir === 's') {
        coords.r += 1
        nextDir = dir
      }
      break
    case '-':
      if (dir === 'e') {
        coords.c += 1
        nextDir = dir
      }
      if (dir === 'w') {
        coords.c -= 1
        nextDir = dir
      }
      break
    case 'L':
      if (dir === 's') {
        coords.c += 1
        nextDir = 'e'
      }
      if (dir === 'w') {
        coords.r -= 1
        nextDir = 'n'
      }
      break
    case 'J':
      if (dir === 's') {
        coords.c -= 1
        nextDir = 'w'
      }
      if (dir === 'e') {
        coords.r -= 1
        nextDir = 'n'
      }
      break
    case '7':
      if (dir === 'e') {
        coords.r += 1
        nextDir = 's'
      }
      if (dir === 'n') {
        coords.c -= 1
        nextDir = 'w'
      }
      break
    case 'F':
      if (dir === 'w') {
        coords.r += 1
        nextDir = 's'
      }
      if (dir === 'n') {
        coords.c += 1
        nextDir = 'e'
      }
      break
  }
  return {coords, nextDir}
}

// 'S' cords = {r:114, c:35}
let coords = {r:114, c:36}
let dir = 'e'
let count = 1
while (matrix[coords.r][coords.c] !== 'S') {
  const n = nextTile(coords, dir)
  coords = n.coords
  dir = n.nextDir
  count++
}
console.log('Part One:', count / 2) // 6690