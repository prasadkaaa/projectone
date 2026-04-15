
const fs =  require('fs')
//const content = fs.readFileSync('notes.txt', 'utf-8')
//fs.appendFileSync('copy.txt',`\n\n ${content}`,'utf-8')
//console.log(content);

console.log("start of script");

//non blocking
fs.readFile('notes.txt', 'utf-8',function(err,data){
    if(err) console.log(err)
        else console.log(data)
})

// blocking

// const content = fs.readFileSync('notes.txt', 'utf-8');
// console.log(content);

console.log(" end of script");

