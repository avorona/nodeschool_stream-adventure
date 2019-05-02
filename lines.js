const split = require('split');
const through = require('through2');

let counter = true;

const stream = through(function(line, __, next) {
  let stringLine = line.toString();
  this.push(
    counter === true
      ? stringLine.toLowerCase() + '\n'
      : stringLine.toUpperCase() + '\n'
  );
  counter = !counter;
  next();
});

process.stdin
  .pipe(split())
  .pipe(stream)
  .pipe(process.stdout);
