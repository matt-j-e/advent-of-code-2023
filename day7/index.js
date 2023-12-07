const helpers = require('../helpers/helperFunctions');

const lines = helpers.loadData(__dirname.split('/').pop(), false)
const hands = lines.map(line => {
  const obj = {}
  obj.cards = line.split(' ')[0]
  obj.bid = line.split(' ')[1]
  return obj
})
// console.log(hands)

function isFive(cards) {
  return cards.every(card => card === cards[0])
}

function isFour(cards) {
  const _cards = [...cards].sort()
  if (_cards[0] === _cards[1] && _cards[0] === _cards[2] && _cards[0] === _cards[3]) return true
  if (_cards[1] === _cards[2] && _cards[1] === _cards[3] && _cards[1] === _cards[4]) return true
  return false
}

function isFull(cards) {
  const _cards = [...cards].sort()
  if (_cards[0] === _cards[1] && _cards[0] === _cards[2] && _cards[3] === _cards[4]) return true
  if (_cards[2] === _cards[3] && _cards[2] === _cards[4] && _cards[0] === _cards[1]) return true
  return false
}

function isThree(cards) {
  const _cards = [...cards].sort()
  if (_cards[0] === _cards[1] && _cards[0] === _cards[2]) return true
  if (_cards[1] === _cards[2] && _cards[1] === _cards[3]) return true
  if (_cards[2] === _cards[3] && _cards[2] === _cards[4]) return true
  return false
}

function isTwoPair(cards) {
  const _cards = [...cards].sort()
  if (_cards[0] === _cards[1] && _cards[2] === _cards[3]) return true
  if (_cards[1] === _cards[2] && _cards[3] === _cards[4]) return true
  if (_cards[0] === _cards[1] && _cards[3] === _cards[4]) return true
  return false
}

function isOnePair(cards) {
  const _cards = [...cards].sort()
  if (_cards[0] === _cards[1]) return true
  if (_cards[1] === _cards[2]) return true
  if (_cards[2] === _cards[3]) return true
  if (_cards[3] === _cards[4]) return true
  return false 
}

function strength(hand) {
  const cards = hand.split('')
  if (isFive(cards)) return 7
  if (isFour(cards)) return 6
  if (isFull(cards)) return 5
  if (isThree(cards)) return 4
  if (isTwoPair(cards)) return 3
  if (isOnePair(cards)) return 2
  return 1
}

function addStrength() {
  hands.map(hand => hand.strength = strength(hand.cards))
}

function remap(hand) {
  const mapping = {'2':'a','3':'b','4':'c','5':'d','6':'e','7':'f','8':'g','9':'h','T':'j','J':'k','Q':'l','K':'m','A':'n'}
  const cards = hand.split('')
  const _cards = cards.map(card => card = mapping[card])
  return _cards.join('')
}

function revalue() {
  hands.map(hand => {
    hand.cards = remap(hand.cards)
  })
}

addStrength()
revalue()
hands.sort((a,b) => a.strength - b.strength > 0 ? 1 : -1)
hands.sort((a,b) => {
  if (a.strength === b.strength) return a.cards > b.cards ? 1 : -1
  return 0
})

let winnings = 0
hands.forEach((hand, index) => winnings += (parseInt(hand.bid) * (index + 1)))

console.log(winnings) // 248179786