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