const zlib = require('zlib');
const tar  = require('tar');
const parser = new tar.Parse();
const crypto = require('crypto');


const cipherName = process.argv[2];
const passphrase = process.argv[3];
const decripter = crypto.createDecipher(cipherName, passphrase)


parser.on('entry',  (entry) => {

const hash = crypto.createHash('md5', {encoding: 'hex'});
const fileName=entry.file


})

process.stdin
.pipe(decripter)
.pipe(parser)
.pipe(process.stdout)
