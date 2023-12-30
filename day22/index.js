const helpers = require('../helpers/helperFunctions');

const lines = helpers.loadData(__dirname.split('/').pop(), false)

class Brick{
  constructor(line) {
    const [x1,y1,z1,x2,y2,z2] = line.replace('~',',').split(',').map(coord => parseInt(coord))
    this.x1 = x1
    this.y1 = y1
    this.z1 = z1
    this.x2 = x2
    this.y2 = y2
    this.z2 = z2
    this.supports = new Set()
    this.isSupportedBy = new Set()
  }

  _print() {
    return `${this.x1}, ${this.y1}, ${this.z1} : ${this.x2}, ${this.y2}, ${this.z2} : Supports: ${this.supports.size}, isSupportedBy: ${this.isSupportedBy.size}`
  }

  overlaps(other) {
    return (Math.max(this.x1, other.x1) <= Math.min(this.x2, other.x2)) &&
      (Math.max(this.y1, other.y1) <= Math.min(this.y2, other.y2))
  }
}

const bricks = lines.map(line => new Brick(line)).sort((a, b) => a.z1 > b.z1 ? 1 : -1)


for (let [i, brick] of bricks.entries()) {
  let floor = 1
  for (let other of bricks.slice(0, i)) {
    if (brick.overlaps(other)) {
      floor = Math.max(floor, other.z2 + 1)
    } 
  }
  const fall_dist = brick.z1 - floor
  brick.z1 -= fall_dist
  brick.z2 -= fall_dist
}

bricks.sort((a, b) => a.z1 > b.z1 ? 1 : -1)

for (let [i, brick] of bricks.entries()) {
  for (let other of bricks.slice(0, i)) {
    if (brick.overlaps(other) && other.z2 === brick.z1 - 1) {
      brick.isSupportedBy.add(other)
      other.supports.add(brick)
    }
  }
}

let disintegratable = 0

bricks.forEach((thisLayer) => {
  if (Array.from([...thisLayer.supports]).every(supportedBrick => supportedBrick.isSupportedBy.size > 1)) disintegratable++
})

console.log('Part One:', disintegratable) // 485