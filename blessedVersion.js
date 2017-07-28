const blessed = require('blessed');
const moment = require('moment')
const fse = require('fs-extra')
const inspect = require('util').inspect

const timeFormat = 'h:mma'
const start_time = moment()
const start_display = start_time.format(timeFormat)


const getElapsedTime = require('./lib/elapsed_time')

const logger = function(msg) {
    fse.appendFile('./logfile.txt', msg,  function(err) {
        if (err) {
            throw err;
        }
    })
}

const debug = function(obj) {
    logger(inspect(obj, {depth: null, colors: true}))
}

// Create a screen object.
let screen = blessed.screen({
   smartCSR: true
})

screen.title = 'My window title';



//   // Create a box perfectly centered horizontally and vertically.
let box = blessed.box({
    content: `Start: ${start_display}`,
    tags: true,
});

screen.append(box);

screen.render()

let lines = [
    'recording time'
]
lines.forEach(function(v,i) {
    box.setLine(i+1,v)
})

let progress = blessed.progressbar({
    parent: box,
    orientation: 'horizontal',
    bottom: 0
})
//
// //// Append our box to the screen.
//
//
// WHILE RECORDING
let timer = setInterval(function() {
    let snapshotTime = moment()
    box.setContent(`Start: ${start_display}`)
    let lines = [
        'recording time',
        `Current: ${snapshotTime.format(timeFormat)}`,
    ]
    lines.forEach(function(v,i) {
        box.setLine(i+1,v)
    })
    // progress.progress(0.000025)
    screen.render()
}, 600)




//// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
});

screen.key(['enter'], function(ch, key) {
    clearInterval(timer)
    box.setContent(`Start: ${start_display}`)

    let finish_time = moment()
    let finish_display = finish_time.clone().format(timeFormat)
    let elapsed = getElapsedTime(finish_time.diff(start_time))
    let lines = [
        'recording stopped',
        `Current: ${finish_display}`,
        `Elapsed: ${elapsed}`
    ]
    lines.forEach(function(v,i) {
        box.setLine(i+1,v)
    })
    screen.render();
})
//
//// Focus our element.
// prompt.focus();
box.focus();
//
//// Render the screen.
screen.render();
//
