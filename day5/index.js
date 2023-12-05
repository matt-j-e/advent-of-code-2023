const helpers = require('../helpers/helperFunctions');

const almanac = helpers.loadData(__dirname.split('/').pop(), false)
// console.log(almanac)
const seeds = almanac[0].match(/[0-9]+/g).map(seed => parseInt(seed))
// console.log(seeds)

const maps = []
let mapping = false
let map
for (let i = 2; i <= almanac.length; i++) {
  if (i === almanac.length || almanac[i] === '') {
    map.sort((a, b) => a[1] - b[1] > 0 ? 1 : -1)
    maps.push(map)
    mapping = false
    continue
  }
  if (almanac[i][0].match(/[a-z]/)) {
    mapping = true
    map = []
    continue
  }
  if (almanac[i][0].match(/[0-9]/)) {
    const values = almanac[i].match(/[0-9]+/g)
    map.push(values.map(value => parseInt(value)))
    continue
  }
}

// console.log(maps)

function process(value, mapIndex) {
  let newValue = value
  if (mapIndex > 6) return value
  for (let i = 0; i < maps[mapIndex].length; i++) {
    const range = maps[mapIndex][i]
    if (value >= range[1] && value < (range[1] + range[2])) {
      newValue = value + range[0] - range[1]
      break
    }
  }
  return process(newValue, mapIndex + 1)
}

const locations = seeds.map(seed => process(seed, 0))
console.log('Part One:', Math.min(...locations)) // 382895070