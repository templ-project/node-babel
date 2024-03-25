const {writeFileSync} = require('fs');
const {join: pathJoin} = require('path');

writeFileSync(pathJoin(__dirname, '..', 'dist', 'mjs', 'package.json'), JSON.stringify({type: 'module'}));
