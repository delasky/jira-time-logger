//  IGNORE THIS 
const blessed = require('blessed')
const commander = require('commander')
const inquirer = require('inquirer')

const program = require('commander')

const pkg = require('../package.json')
const track = require('../lib/track.js')
const updateJira = require('../lib/update_jira')

program
    .command('log')
    .description('directly log time against a ticket')

program
    .version(pkg.version)
    .description('keeps track of time')
    .option('-j, --jira <jira>', 'ticket number to log time against')

    if (program.jira) {
        track(program.jira)
    } else {
        let question = {
            type: 'input',
            name: 'jira',
            message: "Please enter the ticket number you want to log time against"
        }
        inquirer.prompt([question]).then(function(answers) {
            track(answers.jira)
        })
    }

program.parse(process.argv)
