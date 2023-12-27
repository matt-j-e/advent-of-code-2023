const helpers = require('../helpers/helperFunctions');

const lines = helpers.loadData(__dirname.split('/').pop(), false)
const hs = []
for (let line of lines) {
  const [px,py] = line.split(' @ ')[0].split(', ')
  const [vx,vy] = line.split(' @ ')[1].split(', ')
  hs.push([parseInt(px),parseInt(py),parseInt(vx),parseInt(vy)])
  // hs.push([BigInt(px),BigInt(py),BigInt(vx),BigInt(vy)])
}
// console.log(hs)
let unsafeInts = 0

function yInt(hailstone) {
  const [px,py,vx,vy] = hailstone
  if (px / vx * vy > Number.MAX_SAFE_INTEGER) unsafeInts++
  return py - (px / vx * vy)
}

function slope(hailstone) {
  const [,,vx,vy] = hailstone
  return vy / vx
}

function deriveY(hailstone, x) {
  return yInt(hailstone) + (slope(hailstone) * x)
}

function deriveX(h1, h2) {
  return (yInt(h2) - yInt(h1)) / (slope(h1) - slope(h2))
}

function xInPast(x, hs) {
  const [px,py,vx,vy] = hs
  if (x < px && vx > 0) return true
  if (x > px && vx < 0) return true
  return false
}

function yInPast(y, hs) {
  const [px,py,vx,vy] = hs
  if (y < py && vy > 0) return true
  if (y > py && vy < 0) return true
  return false
}

// const lower = 7
// const upper = 27
const lower = 200000000000000
const upper = 400000000000000

let intersects = 0

for (let i = 0; i < hs.length - 1; i++) {
  for (let j = 1; j < hs.length; j++) {
    const x = deriveX(hs[i], hs[j])
    if (x >= lower && x <= upper) {
      const y = deriveY(hs[i], x)
      if (y >= lower && y <= upper) {
        if (!xInPast(x,hs[i]) && !xInPast(x,hs[j]) && !yInPast(y,hs[i]) && !yInPast(y,hs[j])) {
          // console.log('i',i,'j',j,'X', x)
          // console.log('i',i,'j',j,'Y', y)
          intersects++
        }
      }
    }
  }
}

console.log('Part One:', intersects) //35197 too high
console.log(unsafeInts)