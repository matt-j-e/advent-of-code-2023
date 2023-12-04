const helpers = require('../helpers/helperFunctions');

const cards = helpers.loadData(__dirname.split('/').pop(), false)

function cardValue(winners) {
  if (winners.length === 0) return 0
  if (winners.length === 1) return 1
  return Math.pow(2, winners.length - 1)
}

let pointsTotal = 0

for (const card of cards) {
  const targets = card.split('|')[0].split(':')[1].match(/[0-9]+/g)
  const yourNumbers = card.split('|')[1].match(/[0-9]+/g)
  const winners = yourNumbers.filter(number => targets.includes(number))
  pointsTotal += cardValue(winners)
}

console.log('Part One:', pointsTotal) // 32001

const cardInstances = cards.map(card => {
  const targets = card.split('|')[0].split(':')[1].match(/[0-9]+/g)
  const yourNumbers = card.split('|')[1].match(/[0-9]+/g)
  const winners = yourNumbers.filter(number => targets.includes(number))
  return {instances: 1, points: winners.length}
})

cardInstances.forEach((card, index) => {
  for (let i = 0; i < card.instances; i++) {
    let currentIndex = 0
    while (currentIndex < card.points) {
      cardInstances[index + currentIndex + 1].instances++
      currentIndex++
    }
  }
})

console.log('Part Two', cardInstances.reduce((tot, card) => {
  return tot + card.instances
}, 0)) // 5037841