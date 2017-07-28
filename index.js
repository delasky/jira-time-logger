const blessed = require('blessed')
const commander = require('commander')
const inquirer = require('inquirer')

const program = require('commander')

const pkg = require('./package.json')
const track = require('./lib/track.js')

program
    .version(pkg.version)
    .option('-t, --ticket <ticket>', 'ticket number to log time against')

program.parse(process.argv)

if (program.ticket) {
    console.log('i have ticket number', program.ticket)
    track(program.ticket)
} else {
    let question = {
        type: 'input',
        name: 'ticket',
        message: "Please enter the ticket number you want to log time against"
    }
    inquirer.prompt([question]).then(function(answers) {
        console.log(answers)
        track(answers.ticket)
    })

}
