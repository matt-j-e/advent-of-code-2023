const helpers = require('../helpers/helperFunctions');

const lines = helpers.loadData(__dirname.split('/').pop(), false)

const moveMap = new Map()
const directions = ['R','L','U','D']
const moves = [[0,1],[0,-1],[-1,0],[1,0]]
for (let i = 0; i < 4; i++) {
  moveMap.set(directions[i], moves[i])
}

const points = [[0,0]]
let r = 0
let c = 0
for (const line of lines) {
  const [dir, num] = line.split(' ')
  const [newR, newC] = moveMap.get(dir)
  r += newR * parseInt(num)
  c += newC * parseInt(num)
  points.push([r,c])
}

function perimeter(points) {
  let total = 0
  for (let i = 0; i < points.length - 1; i++) {
    let [r1, c1] = points[i]
    let [r2, c2] = points[i + 1]
    total += Math.abs(r1 - r2) + Math.abs(c1 - c2)
  }
  return total
}

// Shoelace formula
function internalArea(points) {
  let total = 0
  for (let i = 0; i < points.length - 1; i++) {
    let [r1, c1] = points[i]
    let [r2, c2] = points[i + 1]
    total += (r1 + r2) * (c1 - c2)
  }
  return total / 2
}

/**
 * Pick's Theorem
 * --------------
 * Total area covered by a polygon is:
 * - internal area (from Shoelace formula)
 * - plus half the perimeter
 * - plus 1
 */
console.log('Part One:', internalArea(points) + (perimeter(points) / 2) + 1) // 53844

const points2 = [[0,0]]
const dirsMap = {'0':'R', '1':'D', '2':'L', '3':'U'}

r = 0
c = 0
for (const line of lines) {
  const [,,hex] = line.split(' ')
  const num = hex.substring(2,7)
  const [newR, newC] = moveMap.get(dirsMap[hex[7]])
  r += newR * parseInt(num, 16)
  c += newC * parseInt(num, 16)
  points2.push([r,c])
}

console.log('Part Two:', internalArea(points2) + (perimeter(points2) / 2) + 1) // 42708339569950