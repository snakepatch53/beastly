// Dependences Externals
const fs = require('fs');

// Load Configurations
let proyect = JSON.parse(fs.readFileSync('config.json'));
proyect.getRootAbsolute = (req) => req.protocol + '://' + req.get('host') + "/";

module.exports = proyect;