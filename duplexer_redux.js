const duplexer=require('duplexer2')
const through = require('through2').obj

module.exports =function (counter) {
  let country = {};

  const writeableStream = through( write,end)
  return duplexer({objectMode: true }, writeableStream, counter)


function write(buffer, encoding, next) {

  country[buffer.country] = (country[buffer.country] || 0) + 1 ;   
  next();
}

function end (done) {
  counter.setCounts(country);
done();
} 



}