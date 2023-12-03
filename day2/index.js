const helpers = require('../helpers/helperFunctions');

const games = helpers.loadData(__dirname.split('/').pop(), false)

function maxVal(colours) {
  return colours.reduce((max, pull) => {
    const pullNum = parseInt(pull.split(' ')[0])
    if (pullNum > max) {
      return pullNum
    } else {
      return max
    }
  }, 0)
}

function extractMaxVals(game) {
  const reds = game.match(/[0-9]* red/g)
  const greens = game.match(/[0-9]* green/g)
  const blues = game.match(/[0-9]* blue/g)
  return [
    maxVal(reds),
    maxVal(greens),
    maxVal(blues)
  ]
}

function possibleGames(games) {
  const bag = [12, 13, 14]
  let sumOfPossIds = 0
  for (let game of games) {
    const id = parseInt(game.split(':')[0].split(' ')[1])
    const maxVals = extractMaxVals(game)
    if (maxVals[0] <= bag[0] && maxVals[1] <= bag[1] && maxVals[2] <= bag[2]) {
      sumOfPossIds += id
    }
  }
  return sumOfPossIds
}

function powerSets(games) {
  let sumOfPowerSets = 0
  games.forEach(game => {
    const maxVals = extractMaxVals(game)
    sumOfPowerSets += maxVals[0] * maxVals[1] * maxVals[2]
  })
  return sumOfPowerSets
}

console.log('Part One:', possibleGames(games)) // 2505
console.log('Part Two:', powerSets(games)) // 70265
