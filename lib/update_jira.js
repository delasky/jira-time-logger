var request = require('request')
var logger = require('./logger.js')
var fs = require('fs')
const os = require('os')
const HOME_DIR = os.homedir()
let config;


module.exports = function updateJira (elapsedTime, ticket) {

    fs.stat(`${HOME_DIR}/.log-time.json`, (err, stats) => {
        if (err) {
            throw new Error('No config file, run log-time config to create')
        } else {
            config = require(`${HOME_DIR}/.log-time.json`)

            request.post({
                url:`https://jira.hotschedules.com/rest/api/2/issue/${ticket}/worklog`,
                method: 'POST',
                body: JSON.stringify( {timeSpent: elapsedTime} ),
                headers: {
                    'content-type': 'application/json'
                },
                auth: {
                    username: config.username,
                    pass: config.pass
                }
            }, (err, response, body) => {
                if(err) {
                    logger('ERR')
                    logger(err)
                } else {
                    logger("Time Logged")
                    logger(response.statusCode)
                    logger(response.body)
                }
            })
        }
    })

}
