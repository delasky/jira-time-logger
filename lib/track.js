const blessed = require('blessed');
const moment = require('moment')

const getElapsedTime = require('./elapsed_time')
const updateJira = require('./update_jira')
const timeFormat = 'h:mma'
const start_time = moment()
const start_display = start_time.format(timeFormat)

module.exports = function track (ticket) {

    let screen = blessed.screen({
       smartCSR: true
    })

    screen.title = `Tracking ${ticket}`;

    let content = `
Tracking ${ticket}
Start: ${start_display}
*RECORDING*
Press <space> or <enter> to send, <esc> or <C-c> to quit
`


    let box = blessed.text({
        content: content,
        tags: true
    });

    screen.append(box);
    screen.render()

    let timer = setInterval(function() {

        let snapshotTime = moment()

        let elapsed = getElapsedTime(snapshotTime.diff(start_time))

        let updatedContent = `
Tracking ${ticket}
Start: ${start_display}
Current: ${snapshotTime.format(timeFormat)}
Elapsed: ${elapsed}
*RECORDING*
Press <space> or <enter> to send, <esc> or <C-c> to quit
        `
        box.setContent(updatedContent)

        screen.render()
    }, 30000)

    screen.key(['escape', 'q', 'C-c'], function(ch, key) {
        return process.exit(0);
    });

    screen.key(['space', 'enter'], function(ch, key) {

        clearInterval(timer)

        let finish_time = moment()
        let finish_display = finish_time.clone().format(timeFormat)
        let elapsed = getElapsedTime(finish_time.diff(start_time))

        let updatedContent = `
Tracking ${ticket}
Start: ${start_display}
Finish: ${finish_display}
Elapsed: ${elapsed}
        `

        box.setContent(updatedContent)
        screen.render();
        screen.destroy();

        updateJira(elapsed, ticket)

    })
}
