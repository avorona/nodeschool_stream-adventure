const zlib = require('zlib');
const ungzip = zlib.createGunzip();
const tar = require('tar');
const parser = new tar.Parse();
const crypto = require('crypto');
const concat = require('concat-stream');

const cipherName = process.argv[2];
const passphrase = process.argv[3];
const decripter = crypto.createDecipher(cipherName, passphrase);

parser.on('entry', entry => {
  if (entry.type !== 'File') return entry.resume();

  const hashHex = crypto.createHash('md5', { encoding: 'hex' });
  const fileName = entry.path;

  entry.pipe(hashHex).pipe(
    concat(function(hash) {
      console.log(`${hash} ${fileName}`);
    })
  );
});

process.stdin
  .pipe(decripter)
  .pipe(ungzip)
  .pipe(parser);
