const helpers = require('../helpers/helperFunctions');

const input = helpers.loadData(__dirname.split('/').pop(), false).map(line => line.split(' '))
const lines = input.map(line => line.map(num => parseInt(num)))
// console.log(lines)

function allZeros(nums) {
  return nums.every(num => num === 0)
}

function nextLevel(nums) {
  const _nums = []
  for (let i = 0; i < nums.length - 1; i++) {
    _nums.push(nums[i + 1] - nums[i])
  }
  return _nums
}

function buildArrayOfArrays(nums) {
  arrays.push(nums)
  if (allZeros(nums)) return
  return buildArrayOfArrays(nextLevel(nums))
}

function findNextVal(arr) {
  const _arrays = [...arr.reverse()]
  while (_arrays.length > 1) {
    const bottomLayer = _arrays.shift()
    const valToAdd = _arrays[0][_arrays[0].length - 1] + bottomLayer[bottomLayer.length - 1]
    _arrays[0].push(valToAdd)
  }
  return _arrays[0][_arrays[0].length - 1]
}

function findPrevVal(arr) {
  const _arrays = [...arr.reverse()]
  while(_arrays.length > 1) {
    const bottomLayer = _arrays.shift()
    const valToAdd = _arrays[0][0] - bottomLayer[0]
    _arrays[0].unshift(valToAdd)
  }
  return _arrays[0][0]
}

let arrays = []
let sum = 0
lines.forEach(line => {
  buildArrayOfArrays(line)
  sum += findNextVal(arrays)
  arrays = []
})
console.log('Part One:', sum) // 1789635132

arrays = []
sum = 0
lines.forEach(line => {
  buildArrayOfArrays(line)
  sum += findPrevVal(arrays)
  arrays = []
})
console.log('Part Two:', sum) // 913
