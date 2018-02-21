const concat = require('concat-stream');

process.stdin
.pipe(concat(function(buf) {
 const str= buf.toString().split('').reverse().join('')
 console.log(str)
} ))

