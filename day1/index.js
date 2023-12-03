const helpers = require('../helpers/helperFunctions');

const values = helpers.loadData(__dirname.split('/').pop(), false)
console.log(values)

let combinedCalib = 0

values.forEach(value => {
  const calib = {}
  const valArr = value.split('')
  for (let v of valArr) {
    if (v.search(/[0-9]/) !== -1) {
      calib.first = v
      break
    }
  }
  for (let v of valArr.reverse()) {
    if (v.search(/[0-9]/) !== -1) {
      calib.second = v
      break
    }
  }
  console.log('CALIB >>>', calib)
  const calibVal = parseInt(calib.first + calib.second)
  console.log('CALIBVAL >>>', calibVal)
  combinedCalib += calibVal
})

console.log('Answer A:', combinedCalib) // 54708

const strDigits = ['one','two','three','four','five','six','seven','eight','nine']
const numDigits = ['1','2','3','4','5','6','7','8','9']

function findDigitLocations(value) {
  const locations = []
  strDigits.forEach(digit => {
    let location = value.indexOf(digit)
    while (location !== -1) {
      locations.push([digit, location])
      location = value.indexOf(digit, location + 1)
    }
  })
  numDigits.forEach(digit => {
    let location = value.indexOf(digit)
    while (location !== -1) {
      locations.push([digit, location])
      location = value.indexOf(digit, location + 1)
    }
  })
  const sortedLocations = locations.sort((a,b) => a[1] - b[1] > 0 ? 1 : -1)
  return {first: sortedLocations[0][0], second: sortedLocations.reverse()[0][0]}
}

function calibVal(rawCalib) {
  if (rawCalib.first.search(/[0-9]/) === -1) {
    rawCalib.first = String(strDigits.findIndex(dig => dig === rawCalib.first) + 1)
  }
  if (rawCalib.second.search(/[0-9]/) === -1) {
    rawCalib.second = String(strDigits.findIndex(dig => dig === rawCalib.second) + 1)
  }
  const calibVal = parseInt(rawCalib.first + rawCalib.second)
  // console.log(calibVal)
  return calibVal 
}

combinedCalib = 0

values.forEach(value => {
  // console.log(value)
  const rawCalib = findDigitLocations(value)
  combinedCalib += calibVal(rawCalib)
})

console.log('Answer B:', combinedCalib) // 54132 too high, 53988 too low, Answer = 54087
