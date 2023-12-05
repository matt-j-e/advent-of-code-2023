const helpers = require('../helpers/helperFunctions');

const almanac = helpers.loadData(__dirname.split('/').pop(), false)
const seeds = almanac[0].match(/[0-9]+/g).map(seed => parseInt(seed))

const maps = []
let map
for (let i = 2; i <= almanac.length; i++) {
  if (i === almanac.length || almanac[i] === '') {
    maps.push(map)
    continue
  }
  if (almanac[i][0].match(/[a-z]/)) {
    map = []
    continue
  }
  if (almanac[i][0].match(/[0-9]/)) {
    const values = almanac[i].match(/[0-9]+/g)
    map.push(values.map(value => parseInt(value)))
    continue
  }
}

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

let minLocation = Number.POSITIVE_INFINITY
let s = 0
while (s < seeds.length) {
  for (let i = seeds[s]; i < (seeds[s] + seeds[s + 1]); i++) {
    const location = process(i, 0)
    if (location < minLocation) minLocation = location
  }
  s += 2
}
console.log('Part Two:', minLocation) // 17729182 took ~ 5 mins to work through