const helpers = require('../helpers/helperFunctions');

const lines = helpers.loadData(__dirname.split('/').pop(), true)
console.log(lines)

function emptyCols(rows) {
  const populatedCols = new Set()
  rows.forEach((row,index) => {
    for (let i = 0; i < row.length; i++) {
      if (row[i] === '#') populatedCols.add(i)
    }
  })
  const result = []
  for (let i = 0; i < rows[0].length; i++) {
    if (!Array.from(populatedCols).includes(i)) result.push(i)
  }
  return result
}

function expandRow(row, emptyCols) {
  const rowArr = row.split('')
  const empty = [...emptyCols]
  while (empty.length > 0) {
    rowArr.splice(empty.pop(), 0, '.')
  }
  return rowArr.join('')
}

function expandRows(rows) {
  const empty = emptyCols(rows)
  for (let i = 0; i < rows.length; i++) {
    rows[i] = expandRow(rows[i], empty)
  }
}

function expandVertically(rows) {
  expandRows(rows)
  const result = [...rows]
  for (let i = rows.length - 1; i >= 0; i--) {
    if (!rows[i].includes('#')) {
      result.splice(i, 0, rows[i])
    }
  }
  return result
}

const space = expandVertically(lines)

let num = 1
let row = 0
while (row < space.length) {
  const arr = space[row].split('')
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === '#') {
      arr[i] = num
      num++
    }
  }
  space[row] = arr
  row++
}
console.log(space)