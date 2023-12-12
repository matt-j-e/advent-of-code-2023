const helpers = require('../helpers/helperFunctions');

const lines = helpers.loadData(__dirname.split('/').pop(), true)

const rows = lines.map(line => {
  const parts = line.split(' ')
  const springs = parts[0]
  const config = parts[1]
  return {springs, config}
})
console.log(rows)

function createRegex(config) {
  const chunks = config.split(',')
  let re = '^'
  chunks.forEach((chunk, i) => {
    re += i === 0 ? '\\.*' : '\\.+' 
    re += '#'.repeat(chunk)
    re += '\\.*'
  })
  re += '$'
  return re
}

console.log(createRegex('1,1,3'))

console.log('#.#.###'.match(new RegExp(createRegex('1,1,3'))))