var inspect = require('util').inspect

module.exports = function logger(msg) {
    console.log(inspect(msg, {depth: null, colors: true}))
}
