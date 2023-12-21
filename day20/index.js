const helpers = require('../helpers/helperFunctions');

const lines = helpers.loadData(__dirname.split('/').pop(), false)
// console.log(lines)

const modules = new Map()
const conjuncs = []

for (let line of lines) {
  const [details, recipientStr] = line.split(' -> ')
  const recipients = recipientStr.split(', ')
  let name, type, isOn
  if (details === 'broadcaster') {
    modules.set('broadcaster', {recipients})
  } else {
    name = details.substring(1)
    if (details[0] === '%') {
      type = 'flip'
      isOn = false
      modules.set(name, {type, isOn, recipients})
    } else {
      type = 'conj'
      senders = []
      pulses = []
      modules.set(name, {type, senders, pulses, recipients})
      conjuncs.push(name)
    }
  }
}

// set pulse senders in conjunc modules
modules.forEach((v, k) => {
  conjuncs.forEach(c => {
    if (v.recipients.includes(c)) {
      const moduleConfig = modules.get(c)
      moduleConfig.senders.push(k)
      moduleConfig.pulses.push(0)
    }
  })
})

let combinedLow = 0
let combinedHigh = 0

for (let i = 0; i < 1000; i++) {
  const queue = [['broadcaster', 0]]
  let low = 1
  let high = 0
  while(queue.length > 0) {
    let [moduleName, pulseType] = queue.shift()
    const moduleConfig = modules.get(moduleName)
    for (recipient of moduleConfig.recipients) {
      const recipientConfig = modules.get(recipient)
      if (pulseType === 0) {
        low += 1
      } else {
        high += 1
      }
      if (!recipientConfig) continue
      if (recipientConfig.type === 'flip') {
        if (pulseType === 0) {
          if (recipientConfig.isOn) {
            queue.push([recipient, 0])
          } else {
            queue.push([recipient, 1])
          }
          recipientConfig.isOn = !recipientConfig.isOn
        }
      } else {
        const senderIndex = recipientConfig.senders.indexOf(moduleName)
        recipientConfig.pulses[senderIndex] = pulseType
        if (recipientConfig.pulses.filter(pulse => pulse === 0).length === 0) {
          queue.push([recipient, 0])
        } else {
          queue.push([recipient, 1])
        }
      }
    }
  }
  combinedLow += low
  combinedHigh += high
}

console.log('Part One:', combinedLow * combinedHigh) // 794930686