const fs = require('fs')


fs.readFile('./hello.txt' ,(err,data) => {
  if(err) {
    console.log(err)
    return
  }
  console.log(data.toString())
})

console.log('cc')