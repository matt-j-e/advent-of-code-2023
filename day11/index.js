const helpers = require('../helpers/helperFunctions');

const lines = helpers.loadData(__dirname.split('/').pop(), false)
// console.log(lines)
const emptyC = emptyCols(lines)
const emptyR = emptyRows(lines)

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

function emptyRows(lines) {
  const result = []
  for (let i = 0; i < lines.length; i++) {
    if (!lines[i].includes('#')) result.push(i)
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

function galaxies(space) {
  const locations = []
  for (let r = 0; r < space.length; r++) {
    for (let c = 0; c < space[r].length; c++) {
      if (space[r][c] === '#') {
        const coords = {r, c}
        locations.push(coords)
      }
    }
  }
  return locations
}

const space = expandVertically(lines)
const locs = galaxies(space)

let sumOfPaths = 0
while (locs.length > 1) {
  for (let i = 1; i < locs.length; i++) {
    const dist = locs[i].r - locs[0].r + Math.abs(locs[i].c - locs[0].c)
    sumOfPaths += dist
  }
  locs.shift()
}
console.log('Part One:', sumOfPaths) // 9609130

const locs2 = galaxies(space)

const expansionFactor = 1000000
const expandedLocs = locs2.map(loc => {
  for (let i = emptyR.length - 1; i >= 0; i--) {
    if (loc.r > (emptyR[i] + i)) {
      loc.r += (expansionFactor - 2) * (i + 1)
      break
    }
  }
  for (let i = emptyC.length - 1; i >= 0; i--) {
    if (loc.c > (emptyC[i] + i)) {
      loc.c += (expansionFactor - 2) * (i + 1)
      break
    }
  }
  return loc
})

sumOfPaths = 0
while (expandedLocs.length > 1) {
  for (let i = 1; i < expandedLocs.length; i++) {
    const dist = expandedLocs[i].r - expandedLocs[0].r + Math.abs(expandedLocs[i].c - expandedLocs[0].c)
    sumOfPaths += dist
  }
  expandedLocs.shift()
}
console.log('Part Two:', sumOfPaths) // 702152204842
