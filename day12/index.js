const helpers = require('../helpers/helperFunctions');

const lines = helpers.loadData(__dirname.split('/').pop(), false)

const rows = lines.map(line => {
  const parts = line.split(' ')
  const springs = parts[0]
  const config = parts[1]
  return {springs, config}
})
// console.log(rows)

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

function allPossibleStrings(str) {
  function generate(currentStr, index) {
    if (index === str.length) {
      result.push(currentStr)
      return
    }
    if (str[index] === '?') {
      generate(currentStr + '#', index + 1)
      generate(currentStr + '.', index + 1)
    } else {
      generate(currentStr + str[index], index + 1)
    }
  }
  const result = []
  generate('', 0)
  return result
}

let sumOfCounts = 0
rows.forEach(row => {
  let count = 0
  const strings = allPossibleStrings(row.springs)
  strings.forEach(string => {
    if (string.search(new RegExp(createRegex(row.config))) !== -1) count++
  })
  sumOfCounts += count
})
console.log('Part One:', sumOfCounts) // 7857