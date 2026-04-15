
const fs =  require('fs')
const content = fs.readFileSync('notes.txt', 'utf-8')
fs.appendFileSync('copy.txt',`\n\n ${content}`,'utf-8')
console.log(content);
fs.unlinkSync('copy.txt')
