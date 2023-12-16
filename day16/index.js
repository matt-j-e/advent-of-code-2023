const helpers = require('../helpers/helperFunctions');

const matrix = helpers.loadData(__dirname.split('/').pop(), false).map(line => line.split(''))
// console.log(matrix)

const startPoints = [{r:0, c:0, dir:'e'}]

function nextTile(coords, dir) {
  const tile = matrix[coords.r][coords.c]
  switch(tile) {
    case '|':
      if (dir === 'e' || dir === 'w') {
        startPoints.push({r: coords.r, c: coords.c, dir: 'n'})
        if (coords.r < matrix.length - 1) {
          coords.r += 1
          dir = 's'
        }
      } else if (dir === 's') {
        if (coords.r < matrix.length - 1) {
          coords.r += 1
        }
      } else {
        if (coords.r > 0) {
          coords.r -= 1
        }
      }
      break
    case '-':
      if (dir === 'n' || dir === 's') {
        startPoints.push({r: coords.r, c: coords.c, dir: 'w'})
        if (coords.c < matrix[0].length - 1) {
          coords.c += 1
          dir = 'e'
        }
      } else if (dir === 'e') {
        if (coords.c < matrix[0].length - 1) {
          coords.c += 1
        }
      } else {
        if (coords.c > 0) {
          coords.c -= 1
        }
      }
      break
    case '\\':
      if (dir === 'e') {
        if (coords.r < matrix.length - 1) {
          coords.r += 1
          dir = 's'
        }
      } else if (dir === 'n') {
        if (coords.c > 0) {
          coords.c -= 1
          dir = 'w'
        }
      } else if (dir === 'w') {
        if (coords.r > 0) {
          coords.r -= 1
          dir = 'n'
        }
      } else {
        if (coords.c < matrix[0].length - 1) {
          coords.c += 1
          dir = 'e'
        }
      }
      break
    case '/':
      if (dir === 'e') {
        if (coords.r > 0) {
          coords.r -= 1
          dir = 'n'
        } 
      } else if (dir === 'n') {
        if (coords.c < matrix[0].length - 1) {
          coords.c += 1
          dir = 'e'
        }
      } else if (dir === 'w') {
        if (coords.r < matrix.length - 1) {
          coords.r += 1
          dir = 's'
        }
      } else {
        if (coords.c > 0) {
          coords.c -= 1
          dir = 'w'
        }
      }
      break
    default:
      if (dir === 'e' && coords.c < matrix[0].length - 1) coords.c += 1
      if (dir === 'w' && coords.c > 0) coords.c -= 1
      if (dir === 'n' && coords.r > 0) coords.r -= 1
      if (dir === 's' && coords.r < matrix.length - 1) coords.r += 1
  }
  return {coords, dir}
}

const path = []

while (startPoints.length > 0) {
  let startPoint = startPoints.shift()
  // console.log('START POINT', startPoint)
  let coords = {r: startPoint.r, c: startPoint.c}
  let dir = startPoint.dir
  let node = `${coords.r}-${coords.c} ${dir}`
  while (!path.includes(node)) {
    path.push(node)
    const n = nextTile(coords, dir)
    coords = n.coords
    dir = n.dir
    node = `${coords.r}-${coords.c} ${dir}`
  }
}

const nodes = new Set()
path.forEach(node => nodes.add(node.substring(0, node.length - 2)))

console.log('Part One:', nodes.size) // 7788