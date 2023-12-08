const helpers = require('../helpers/helperFunctions');

const lines = helpers.loadData(__dirname.split('/').pop(), false)
const directions = lines[0]
const nodes = lines.slice(2).map(node => {
  const parts = node.split(' = ')
  const label = parts[0]
  const L = parts[1].substring(1,4)
  const R = parts[1].substring(6,9)
  return {label, L, R}
})

let currentNode = 'AAA'
let steps = 0
while (currentNode !== 'ZZZ') {
  const currentNodeObj = nodes.find(node => node.label === currentNode)
  const direction = directions[steps % directions.length]
  currentNode = currentNodeObj[direction]
  steps++
}

console.log('Part One', steps) // 19667

const currentNodes = nodes.filter(node => node.label.endsWith('A'))
const zSteps = currentNodes.map(currentNode => {
  let step = 0
  while(!currentNode.label.endsWith('Z')) {
    const direction = directions[step % directions.length]
    currentNode = nodes.find(node => node.label === currentNode[direction])
    step++
  }
  return step
})

// Greatest Common Divisor (Euclidian algorithm)
function gcd(a, b) {
  return a ? gcd(b % a, a) : b
}
// Lowest Common Multiple
function lcm(a, b) {
  return a * b / gcd(a, b)
}

console.log('Part Two:', zSteps.reduce(lcm)) // 19185263738117
