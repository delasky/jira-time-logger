var inspect = require('util').inspect

module.exports = function logger() {
    console.log(inspect(Array.prototype.slice.call(arguments), {depth: null, colors: true}));
}
