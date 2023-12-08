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

// console.log(directions)
// console.log(nodes)

let currentNode = 'AAA'
let steps = 0
while (currentNode !== 'ZZZ') {
  const currentNodeObj = nodes.find(node => node.label === currentNode)
  const direction = directions[steps % directions.length]
  currentNode = currentNodeObj[direction]
  steps++
}

console.log('Part One', steps) // 19667