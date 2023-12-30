const helpers = require('../helpers/helperFunctions');

const lines = helpers.loadData(__dirname.split('/').pop(), false)
lines.sort((a, b) => {
  const ac = a.split('~')[0]
  const az = ac.split(',')[2]
  const bc = b.split('~')[0]
  const bz = bc.split(',')[2]
  return parseInt(az) > parseInt(bz) ? 1 : -1
})
// console.log(lines)

class Brick {
  constructor(line) {
    const [x1,y1,z1,x2,y2,z2] = line.replace('~',',').split(',')
    this.coords = []
    const range = Math.max(x2-x1, y2-y1, z2-z1)
    for (let i = 0; i < range + 1; i++) {
      const coord = []
      if (i === 0) {
        coord.push(parseInt(x1))
        coord.push(parseInt(y1))
        coord.push(parseInt(z1))
        this.coords.push(coord)
        continue
      }
      if (x2 > x1) {
        coord.push(parseInt(x1) + i)
      } else {
        coord.push(parseInt(x1))
      }
      if (y2 > y1) {
        coord.push(parseInt(y1) + i)
      } else {
        coord.push(parseInt(y1))
      }
      if (z2 > z1) {
        coord.push(parseInt(z1) + i)
      } else {
        coord.push(parseInt(z1))
      }
      this.coords.push(coord)
    }
    this.supports = new Set()
    this.isSupportedBy = new Set()
  }

  _print() {
    // return [this.coords, this.supports, this.isSupportedBy]
    return `${this.coords} | Supports: ${this.supports.size} | SupportedBy: ${this.isSupportedBy.size}`
  }

  decreaseZsBy1() {
    this.coords.forEach(coord => coord[2] -= 1)
  }
}

function canMoveDownOne(i) {
  const floor = bricks[i - 1].coords[0][2]
  const thisLayer = helpers.deepCopy(bricks[i].coords)
  if (thisLayer[0][2] === floor) return false
  const newZ = thisLayer[0][2] - 1
  for (let j = i - 1; j >= 0; j--) {
    const below = bricks[j].coords.map(coord => coord.join())
    for (let a = 0; a < thisLayer.length; a++) {
      thisLayer[a][2] = newZ
      for (let b = 0; b < below.length; b++) {
        if (thisLayer[a].join() === below[b]) return false
      }
    }
  }
  return true
}

/**
 * Instantiate the brick objects
 */
const bricks = lines.map(line => new Brick(line))

// bricks.forEach(brick => console.log('BEFORE MOVING', brick._print()))

/**
 * Let the bricks fall
 */
let i = 1
while (i < bricks.length) {
  if (canMoveDownOne(i)) {
    if (i % 100 === 0) console.log(i, 'MOVING')
    bricks[i].decreaseZsBy1()
    // bricks.forEach(brick => console.log(brick._print()))
  }
  if (!canMoveDownOne(i)) {
    i++
  }
}

bricks.sort((a, b) => a.coords[0][2] > b.coords[0][2] ? 1 : -1)
// bricks.forEach(brick => console.log('AFTER SORTING', brick._print()))

/**
 * Add isSupportedBy & supports properties
 */
for (let i = 1; i < bricks.length; i++) {
  const thisLayer = bricks[i].coords
  for (let j = i - 1; j >= 0; j--) {
    const below = bricks[j].coords
    for (let a = 0; a < thisLayer.length; a++) {
      for (let b = 0; b < below.length; b++) {
        if (below[b][2] !== thisLayer[a][2] - 1) continue
        if (thisLayer[a][0] === below[b][0] || thisLayer[a][1] === below[b][1]) {
          bricks[i].isSupportedBy.add(bricks[j])
          bricks[j].supports.add(bricks[i])
        }
      }
    }
  }
}

// bricks.forEach(brick => console.log(brick._print()))

let disintegratable = 0

// bricks.forEach((thisLayer) => {
//   if (
//     thisLayer.supports.size > 0 && 
//     Array.from([...thisLayer.supports]).every(supportedBrick => supportedBrick.isSupportedBy.size > 1)
//     ) disintegratable++
// })

function allSupportedByMoreThanOne(collection) {
  if (collection.size === 0) return false
  let result = true
  Array.from([...collection]).forEach(item => {
    if (item.isSupportedBy.size < 2) result = false
  })
  return result
}

bricks.forEach(thisLayer => {
  if (allSupportedByMoreThanOne(thisLayer.supports)) disintegratable++
})

console.log('Part One:', disintegratable)
