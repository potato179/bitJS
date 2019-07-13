const fs = require('fs')
let memory = []

module.exports = (target) => {
  if (!target) {
    console.error('Wrong execute!')
    process.exit(1)
  }
  
  let data = fs.readFileSync(target)
  data = data.toString('utf8').split(' ').join('')
  data.split('\n').forEach((v, i) => {
    let command = v.slice(0, 4)
    let arg0 = v.slice(4, 12)
    let arg1 = v.slice(12, 20)

    switch (command) {
      case '0000':
        break

      case '0001':
        memory[parseInt(arg0, 2)] = parseInt(arg1, 2)
        break

      case '0010':
        if (!memory[parseInt(arg0, 2)]) memory[parseInt(arg0, 2)] = 0
        memory[parseInt(arg0, 2)] += parseInt(arg1, 2)
        break

      case '0011':
        if (!memory[parseInt(arg0, 2)]) memory[parseInt(arg0, 2)] = 0
        memory[parseInt(arg0, 2)] -= parseInt(arg1, 2)
        break

      case '0100':
        if (!memory[parseInt(arg0, 2)]) memory[parseInt(arg0, 2)] = 0
        console.log(memory[parseInt(arg0, 2)])
        break

      case '0101':
        if (!memory[parseInt(arg0, 2)]) memory[parseInt(arg0, 2)] = 0
        console.log(String.fromCharCode(memory[parseInt(arg0, 2)]))
        break

      case '1111':
        process.exit(parseInt(arg0, 2))

      default:
        break
    }
  })
}