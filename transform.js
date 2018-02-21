const through = require('through2');


function write(buffer, encoding, next) {
  let buf = buffer.toString().toUpperCase();
  this.push(buf)
  next();
}

const end = (done) => {
  done();
}
const stream = through(write,end);

process.stdin.pipe(stream).pipe(process.stdout);