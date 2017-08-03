#!/usr/bin/env node

//IGNORE THIS NOT ACTIVE

const commander = require('commander')
const inquirer = require('inquirer')

const program = require('commander')

const pkg = require('./package.json')
const updateJira = require('./lib/update_jira')

program
    .version(pkg.version)
    .description('directly log time against a ticket')
    .option('-j, --jira <ticket>', 'ticket number to log time against')
    .option('-t, --time <phrase>', 'time in jira format to be logged')


    let questions = [];
    if (!program.jira) {
        let jiraQ = {
            type: 'input',
            name: 'jira',
            message: "Please enter the ticket number you want to log time against"
        }
        questions.push(jiraQ)
    }
    if (!program.time) {
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
                let jira = program.jira || answers.jira
                let time = program.time || answers.time
                updateJira(time, jira)
            })
            .catch(err=>console.log(err))
    } else {
        updateJira(program.time, program.jira)
    }

program.parse(process.argv)
