const http = require('http');
const fs = require('fs');
const through = require('through2');

const port = parseInt(process.argv[2]);

const server = http.createServer(function(req, res) {
  if (req.method === 'POST') {
    req.pipe(through(write, end)).pipe(res);
  } else {
    res.end('send me a POST');
  }
  // res.end('beep
});
server.listen(port);

function write(buf, _, next) {
  this.push(buf.toString().toUpperCase());
  next();
}

function end(done) {
  done();
}
