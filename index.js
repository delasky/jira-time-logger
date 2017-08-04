#!/usr/bin/env node

const blessed = require('blessed')
const commander = require('commander')
const inquirer = require('inquirer')

const program = require('commander')

const pkg = require('./package.json')
const track = require('./lib/track.js')
const updateJira = require('./lib/update_jira')
const writeToConfig = require('./lib/write_to_config')

program
    .version(pkg.version)
    .command('config')
    .description('configure your jira intergration, you should only need to run this once')
    .action(() => {
        let questions = [
            {
                type: 'input',
                name: 'username',
                message: "Please enter your jira username"
            },
            {
                type: 'password',
                name: 'password',
                message: "Please enter your jira password"
            }
        ]

        inquirer.prompt(questions)
            .then((answers) => {
                writeToConfig(answers)
            })
    })


program
    .version(pkg.version)
    .command('track')
    .description('keeps track of time')
    .option('-j, --jira <jira>', 'ticket number to log time against')
    .action(options => {
        if (options.jira) {
            track(options.jira)
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
    })

program
    .version(pkg.version)
    .command('log')
    .description('directly log time against a ticket')
    .option('-j, --jira <ticket>', 'ticket number to log time against')
    .option('-t, --time <phrase>', 'time in jira format to be logged')
    .action((options) => {

        let questions = [];
        if (!options.jira) {
            let jiraQ = {
                type: 'input',
                name: 'jira',
                message: "Please enter the ticket number you want to log time against"
            }
            questions.push(jiraQ)
        }
        if (!options.time) {
            let timeQ = {
                type: 'input',
                name: 'time',
                message: "Please enter the time you want to log"
            }
            questions.push(timeQ)
        }


        if (questions.length > 0) {
            inquirer.prompt(questions)
                .then((answers) => {
                    let jira = options.jira || answers.jira
                    let time = options.time || answers.time
                    updateJira(time, jira)
                })
                .catch(err=>console.log(err))
        } else {
            updateJira(options.time, options.jira)
        }
    })

program.parse(process.argv)
