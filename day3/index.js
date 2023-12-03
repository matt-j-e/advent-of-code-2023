const helpers = require('../helpers/helperFunctions');

const lines = helpers.loadData(__dirname.split('/').pop(), false)

let sumOfPartNumbers = 0

lines.forEach((line, index) => {
  const numbers = line.matchAll(/[0-9]+/g) || []

  for (let number of numbers) {
    const sPos = number.index
    const ePos = sPos + number[0].length - 1
    if (sPos > 0) {
      if (!line[sPos - 1].match(/\./)) {
        sumOfPartNumbers += parseInt(number[0])
      }  
    }
    if (ePos < line.length - 1) {
      if (!line[ePos + 1].match(/\./)) {
        sumOfPartNumbers += parseInt(number[0])
      }  
    }
    if (index > 0) {
      const rangeStart = sPos === 0 ? 0 : sPos - 1
      const rangeEnd = ePos === line.length - 1 ? line.length - 1 : ePos + 1
      for (let i = rangeStart; i < rangeEnd + 1; i++) {
        if (!lines[index - 1][i].match(/\./)) {
          sumOfPartNumbers += parseInt(number[0])
        }  
      }
    }
    if (index < lines.length - 1) {
      const rangeStart = sPos === 0 ? 0 : sPos - 1
      const rangeEnd = ePos === line.length - 1 ? line.length - 1 : ePos + 1
      for (let i = rangeStart; i < rangeEnd + 1; i++) {
        if (!lines[index + 1][i].match(/\./)) {
          sumOfPartNumbers += parseInt(number[0])
        }  
      }
    }
  }
})

console.log('Part One:', sumOfPartNumbers) // 550891 too low, 551118 too high, 550934 is right!

let sumOfGearRatios = 0

lines.forEach((line, index) => {
  const asterisks = line.matchAll(/\*/g)

  let adjacentPartNumbers = []
  // For each asterisk in current line
  for (const ast of asterisks) {
    let prevLineNumbers
    let nextLineNumbers

    if (index > 0) {
      prevLineNumbers = lines[index - 1].matchAll(/[0-9]+/g) || []
    }

    const currentLineNumbers = line.matchAll(/[0-9]+/g)

    if (index < lines.length - 1) {
      nextLineNumbers = lines[index + 1].matchAll(/[0-9]+/g)
    }

    // For each prevLineNumber
    for (const number of prevLineNumbers) {
      const sPos = number.index
      const ePos = sPos + number[0].length - 1
      if (sPos === ast.index - 1 || sPos === ast.index || sPos === ast.index + 1 || ePos === ast.index - 1 || ePos === ast.index || ePos === ast.index + 1) {
        adjacentPartNumbers.push(number[0])
      }
    }
    // For each nextLineNumber
    for (const number of nextLineNumbers) {
      const sPos = number.index
      const ePos = sPos + number[0].length - 1
      if (sPos === ast.index - 1 || sPos === ast.index || sPos === ast.index + 1 || ePos === ast.index - 1 || ePos === ast.index || ePos === ast.index + 1) {
        adjacentPartNumbers.push(number[0])
      }
    }
    // For each currentLineNumber
    for (const number of currentLineNumbers) {
      const sPos = number.index
      const ePos = sPos + number[0].length - 1
      if (sPos === ast.index + 1 || ePos === ast.index - 1) {
        adjacentPartNumbers.push(number[0])
      }
    }
    if (adjacentPartNumbers.length === 2) {
      sumOfGearRatios += (parseInt(adjacentPartNumbers[0]) * parseInt(adjacentPartNumbers[1]))
    }
    while (adjacentPartNumbers.length > 0) adjacentPartNumbers.pop()
  }
})

console.log('Part Two:', sumOfGearRatios) // 26357368 too low, 81997870 is right