const combine = require('stream-combiner');
const split = require('split');
const through = require('through2');
const zlib = require('zlib');

module.exports = function() {
  let bookShell;
  function countBooks(buffer, _, next) {
    if (buffer.length === 0) return next();
    const row = JSON.parse(buffer);

    if (row.type === 'genre') {
      if (bookShell) {
        this.push(JSON.stringify(bookShell) + '\n');
      }

      bookShell = { name: row.name, books: [] };
    } else if (row.type === 'book') {
      bookShell.books.push(row.name);
    }
    next();
  }

  function end(done) {
    if (bookShell) {
      this.push(JSON.stringify(bookShell) + '\n');
    }
    done();
  }

  const stream = through(countBooks, end);

  return combine(split(), stream, zlib.createGzip());
};
