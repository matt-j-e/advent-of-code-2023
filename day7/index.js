const helpers = require('../helpers/helperFunctions');

const lines = helpers.loadData(__dirname.split('/').pop(), false)
const hands = lines.map(line => {
  const obj = {}
  obj.cards = line.split(' ')[0]
  obj.bid = line.split(' ')[1]
  return obj
})

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

function mostFrequentNonJ(hand) {
  const frequency = hand.split('').reduce((freqObj, card) => {
    if (Object.keys(freqObj).includes(card)) {
      freqObj[card]++
    } else {
      freqObj[card] = 1
    }
    return freqObj
  }, {})
  frequency['J'] = 0
  const most = {card: 0, count:0}
  Object.entries(frequency).forEach(([k, v]) => {
    if (v > most.count) {
      most.card = k
      most.count = v
    }
  })
  return most.card
}

function addStrength(allHands, isPartTwo = false) {
  if (isPartTwo) {
    allHands.map(hand => {
      if (hand.cards === 'JJJJJ') return hand.strength = 7
      const replacement = mostFrequentNonJ(hand.cards)
      return hand.strength = strength(hand.cards.replaceAll('J', replacement))
      
    })
  } else {
    allHands.map(hand => hand.strength = strength(hand.cards))
  } 
}

function remap(hand, isPartTwo = false) {
  const mapping = {'2':'a','3':'b','4':'c','5':'d','6':'e','7':'f','8':'g','9':'h','T':'j','J':'k','Q':'l','K':'m','A':'n'}
  if (isPartTwo) mapping['J'] = 'A'
  const cards = hand.split('')
  const _cards = cards.map(card => card = mapping[card])
  return _cards.join('')
}

function revalue(allHands, isPartTwo) {
  allHands.map(hand => {
    hand.cards = isPartTwo ? remap(hand.cards, true) : remap(hand.cards)
  })
}

function sort(allHands) {
  allHands
    .sort((a,b) => a.strength - b.strength > 0 ? 1 : -1)
    .sort((a,b) => {
      if (a.strength === b.strength) return a.cards > b.cards ? 1 : -1
      return 0
    })
}

// PART ONE processing
addStrength(hands)
revalue(hands)
sort(hands)

let winnings = 0
hands.forEach((hand, index) => winnings += (parseInt(hand.bid) * (index + 1)))

console.log('Part One', winnings) // 248179786

// PART TWO processing
const partTwoHands = lines.map(line => {
  const obj = {}
  obj.cards = line.split(' ')[0]
  obj.bid = line.split(' ')[1]
  return obj
})

addStrength(partTwoHands, true)
revalue(partTwoHands, true)
sort(partTwoHands)

winnings = 0
partTwoHands.forEach((hand, index) => winnings += (parseInt(hand.bid) * (index + 1)))

console.log('Part Two', winnings) // 247885995