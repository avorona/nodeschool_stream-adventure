const crypto = require('crypto');
const key = process.argv[2];

const decripter = crypto.createDecipher('aes256', key);
process.stdin.pipe(decripter).pipe(process.stdout);
