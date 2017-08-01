var request = require('request')
var logger = require('./logger.js')
const os = require('os')
const HOME_DIR = os.homedir()
const config = require(`${HOME_DIR}/.time_logger.json`)

module.exports = function updateJira (elapsedTime, ticket) {
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
