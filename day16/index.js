const helpers = require('../helpers/helperFunctions');

const matrix = helpers.loadData(__dirname.split('/').pop(), false).map(line => line.split(''))
// console.log(matrix)

let startPoints = [{r:0, c:0, dir:'e'}]

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

let path = []

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

let nodes = new Set()
path.forEach(node => nodes.add(node.substring(0, node.length - 2)))

console.log('Part One:', nodes.size) // 7788

const allNodes = []
for (let r = 0; r < matrix.length; r++) {
  for (let c = 0; c < matrix[0].length; c++) {
    allNodes.push({r, c})
  }
}
const entryPoints = allNodes.filter(node => 
  node.r === 0 || 
  node.c === 0 || 
  node.r === matrix.length - 1 || 
  node.c === matrix[0].length - 1)
entryPoints.map(node => {
  if (node.r === 0) node.dir = 's'
  if (node.r === matrix.length - 1) node.dir = 'n'
  if (node.c === 0) node.dir = 'e'
  if (node.c === matrix[0].length - 1) node.dir = 'w'
})
entryPoints.push({r:0, c:0, dir:'s'})
entryPoints.push({r:0, c:matrix[0].length - 1, dir:'s'})
entryPoints.push({r:matrix.length - 1, c:0, dir:'n'})
entryPoints.push({r:matrix.length - 1, c:matrix[0].length - 1, dir:'n'})
console.log(entryPoints.length)
// entryPoints.forEach(point => console.log(point))

let maxNumberOfTiles = 0

for (let entryPoint of entryPoints) {
  path = []
  startPoints = [entryPoint]
  while (startPoints.length > 0) {
    let startPoint = startPoints.shift()
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
  nodes = new Set()
  path.forEach(node => nodes.add(node.substring(0, node.length - 2)))
  if (nodes.size > maxNumberOfTiles) maxNumberOfTiles = nodes.size
}

console.log('Part Two:', maxNumberOfTiles) // 7987
