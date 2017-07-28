const blessed = require('blessed');
// Create a screen object.
let screen = blessed.screen({
   smartCSR: true
   });

screen.title = 'My window title';

let prompt = blessed.prompt({
    content: 'hello',
    input: 'hello',
    setInput: 'world',
    readInput: function(text, value, callback) {
        logger(`text => ${text}`)
        logger(`value => ${ value }`)
        logger(`callback => ${ callback }`)
    }
})

screen.append(prompt);

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
});
