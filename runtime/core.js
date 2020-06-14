const fs = require('fs')
let memory = []

for (let n = 0; n < 256; n++) {
  memory[n] = 0
}

module.exports = (target) => {
  if (!target) {
    console.error('Wrong execute!')
    process.exit(1)
  }
  
  let data = fs.readFileSync(target)
  let pnt = 0
  data = data.toString('utf8').split(' ').join('')
  data.split('\n').forEach((v, i) => {
    let command = v.slice(0, 4)
    let arg0 = v.slice(4, 12)
    let arg1 = v.slice(12, 20)
// 0 = I, 1 = l
    switch (command) {
      case 'IIII':
        pnt = parseInt(arg0, 2)
        break

      case 'IIIl':
        memory[pnt] = parseInt(arg0, 2) <= 0 ? memory[parseInt(arg1, 2)] : parseInt(arg0, 2)
        break

      case 'IIlI':
        memory[pnt] += parseInt(arg0, 2) <= 0 ? memory[parseInt(arg1, 2)] : parseInt(arg0, 2)
        break

      case 'IIll':
        memory[pnt] -= parseInt(arg0, 2) <= 0 ? memory[parseInt(arg1, 2)] : parseInt(arg0, 2)
        break

      case 'IlII':
        let dum1 = ''
        for (let counter = parseInt(arg0, 2); counter <= parseInt(arg1, 2); counter++) {
          if (!memory[counter]) memory[counter] = 0
          dum1 += memory[counter]
        }
        console.log(dum1)
        break

      case 'IlIl':
        let dum2 = ''
        for (let counter = parseInt(arg0, 2); counter <= parseInt(arg1, 2); counter++) {
          if (!memory[counter]) memory[counter] = 0
          dum2 += String.fromCharCode(memory[counter])
        }
        console.log(dum2)
        break

      case 'llll':
        process.exit(parseInt(arg0, 2))

      default:
        break
    }
  })
}
