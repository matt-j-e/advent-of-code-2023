const fs = require('fs')

const dir = __dirname.split('/').pop()
// const filename = `./${dir}/input.txt`
const filename = `./${dir}/part2-test1.txt`
const lines = fs.readFileSync(filename, 'utf-8').split('\n')
console.log(lines)