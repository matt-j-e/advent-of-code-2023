const helpers = require('../helpers/helperFunctions');

const lines = helpers.loadData(__dirname.split('/').pop(), true)
lines.sort((a, b) => {
  const ac = a.split('~')[0]
  const az = ac.split(',')[2]
  const bc = b.split('~')[0]
  const bz = bc.split(',')[2]
  return parseInt(az) > parseInt(bz) ? 1 : -1
})
console.log(lines)

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
  }

  _print() {
    return this.coords
  }
}

const bricks = lines.map(line => new Brick(line))

bricks.forEach(brick => console.log(brick._print()))

