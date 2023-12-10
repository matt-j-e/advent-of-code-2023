const helpers = require('../helpers/helperFunctions');

const matrix = helpers.loadData(__dirname.split('/').pop(), false).map(line => line.split(''))

function nextTile(coords, dir) {
  const tile = matrix[coords.r][coords.c]
  switch(tile) {
    case '|':
      if (dir === 'n') {
        coords.r -= 1
      }
      if (dir === 's') {
        coords.r += 1
      }
      break
    case '-':
      if (dir === 'e') {
        coords.c += 1
      }
      if (dir === 'w') {
        coords.c -= 1
      }
      break
    case 'L':
      if (dir === 's') {
        coords.c += 1
        dir = 'e'
      }
      if (dir === 'w') {
        coords.r -= 1
        dir = 'n'
      }
      break
    case 'J':
      if (dir === 's') {
        coords.c -= 1
        dir = 'w'
      }
      if (dir === 'e') {
        coords.r -= 1
        dir = 'n'
      }
      break
    case '7':
      if (dir === 'e') {
        coords.r += 1
        dir = 's'
      }
      if (dir === 'n') {
        coords.c -= 1
        dir = 'w'
      }
      break
    case 'F':
      if (dir === 'w') {
        coords.r += 1
        dir = 's'
      }
      if (dir === 'n') {
        coords.c += 1
        dir = 'e'
      }
      break
  }
  return {coords, dir}
}

// 'S' cords = {r:114, c:35}
let coords = {r:114, c:36}
let dir = 'e'
let count = 1
while (matrix[coords.r][coords.c] !== 'S') {
  const n = nextTile(coords, dir)
  coords = n.coords
  dir = n.dir
  count++
}
console.log('Part One:', count / 2) // 6690