const helpers = require('../helpers/helperFunctions');

const lines = helpers.loadData(__dirname.split('/').pop(), false)
const workflows = new Map()
const parts = []

for (const line of lines) {
  if (line === '') {
    continue
  } else if (line.startsWith('{')) {
    const part = {}
    const elements = line.split(',')
    part.x = parseInt(elements[0].match(/\d+/g)[0])
    part.m = parseInt(elements[1].match(/\d+/g)[0])
    part.a = parseInt(elements[2].match(/\d+/g)[0])
    part.s = parseInt(elements[3].match(/\d+/g)[0])
    parts.push(part)
  } else {
    const workflowName = line.split('{')[0]
    const rules = line.split('{')[1].replace('}', '').split(',')
    workflows.set(workflowName, rules)
  }
}

function process(wkfls, part) {
  let workflow = [...wkfls.get('in')]
  while (workflow.length > 0) {
    const step = workflow.shift()
    if (step.match(/^[A|R]$/)) {
      return step
    }
    if (step.match(/^[a-z]+$/)) {
      workflow = [...wkfls.get(step)]
      continue
    }
    const cond = step.split(':')[0]
    const condCat = cond[0]
    const condOperator = cond[1]
    const condVal = parseInt(cond.substring(2))
    const wfIfTrue = step.split(':')[1]

    if (condOperator === '<') {
      if (part[condCat] < condVal) {
        if (wfIfTrue === 'A' || wfIfTrue === 'R') {
          workflow = [wfIfTrue]
        } else {
          workflow = [...wkfls.get(wfIfTrue)]
        }
      } else {
        continue
      }
    } else {
      if (part[condCat] > condVal) {
        if (wfIfTrue === 'A' || wfIfTrue === 'R') {
          workflow = [wfIfTrue]
        } else {
          workflow = [...wkfls.get(wfIfTrue)]
        }
      } else {
        continue
      }
    }
  }
}

let totalRatings = 0
parts.forEach(part => {
  if (process(workflows, part) === 'A') {
    totalRatings += part.x + part.m + part.a + part.s
  }
})

console.log('Part One:', totalRatings) // 406849