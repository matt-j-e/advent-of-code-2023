/**
 * This approach is based on 0xdf's solution
 * https://gitlab.com/0xdf/aoc2023/-/blob/main/day24/day24.py?ref_type=heads
 * 
 * Converted to JS from Python. See README.md for an explanation why this is here.
 */

const helpers = require('../helpers/helperFunctions');

const lines = helpers.loadData(__dirname.split('/').pop(), false)
// console.log(lines)

class Stone {
  constructor(line) {
    const [pos, vel] = line.split(' @ ')
    const [px, py] = pos.split(', ')
    const [vx, vy] = vel.split(', ')
    this.px = parseInt(px)
    this.py = parseInt(py)
    this.vx = parseInt(vx)
    this.vy = parseInt(vy)
  }

  _print() {
    return `Stone ${this.px}, ${this.py} : ${this.vx}, ${this.vy}`
  }

  intersects(other) {
    const a = this.vy / this.vx
    const c = -this.px * a + this.py
    const b = other.vy / other.vx
    const d = -other.px * b + other.py
    if (a === b) return null
    const x = (d - c) / (a - b)
    const y = a * x + c
    const t1 = (x - this.px) / this.vx
    const t2 = (x - other.px) / other.vx
    return {t1, t2, x, y}
  }
}

const stones = lines.map(line => new Stone(line))

let intersects = 0
// const lower = 7
// const upper = 27
const lower = 200000000000000
const upper = 400000000000000


for (let i = 0; i < stones.length - 1; i++) {
  for (let j = i + 1; j < stones.length; j++) {
    const result = stones[i].intersects(stones[j])
    if (!result) continue
    const { t1, t2, x, y } = result
    if (x >= lower && x <= upper && y >= lower && y <= upper && t1 > 0 && t2 > 0) {
      intersects++
    }
  }
}

console.log('Part One:', intersects)
