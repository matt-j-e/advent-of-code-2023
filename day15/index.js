const helpers = require('../helpers/helperFunctions');

const steps = helpers.loadData(__dirname.split('/').pop(), false)[0].split(',')

function convert(str) {
  let result = 0
  for (let i = 0; i < str.length; i++) {
    result += str.charCodeAt(i)
    result *= 17
    result %= 256
  }
  return result
}

const sumOfSteps = steps.reduce((tot, step) => tot = tot + convert(step), 0)

console.log('Part One:', sumOfSteps) // 515210

const boxes = new Array(256)
for (let b = 0; b < boxes.length; b++) {
  boxes[b] = []
}

function lensPos(box, label) {
  for (let i = 0; i < boxes[box].length; i++) {
    if (boxes[box][i].label === label) return i
  }
  return
}

function removeLens(box, label) {
  const pos = lensPos(box, label)
  if (pos !== undefined) {
    boxes[box].splice(pos, 1)
  }
}

function process(step) {
  let label, fl, operator
  if (step.includes('=')) {
    operator = '='
    label = step.split('=')[0]
    fl = parseInt(step.split('=')[1])
  } else {
    operator = '-'
    label = step.split('-')[0]
  }
  const box = convert(label)
  if (operator === '-') {
    removeLens(box, label)
  } else {
    if (lensPos(box, label) === undefined) {
      boxes[box].push({label, fl})
    } else {
      const pos = lensPos(box, label)
      boxes[box][pos].fl = fl
    }
  }
}

steps.forEach(step => process(step))

let combinedPower = 0
for (let b = 0; b < boxes.length; b++) {
  let boxPower = 0
  for (let l = 0; l < boxes[b].length; l++) {
    let lensPower = (b + 1) * (l + 1) * boxes[b][l].fl
    boxPower += lensPower
  }
  combinedPower += boxPower
}

console.log('Part Two:', combinedPower) // 246762
