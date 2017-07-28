var request = require('request')
var logger = require('./logger.js')

module.exports = function updateJira (elapsedTime, ticket) {
    request.post({
        url:`https://jira.hotschedules.com/rest/api/2/issue/${ticket}/worklog`,
        method: 'POST',
        body: JSON.stringify( {timeSpent: elapsedTime} ),
        headers: {
            'content-type': 'application/json'
        },
        auth: {
            //ENTER JIRA USERNAME AND PASSWORD HERE
        }
    }, (err, response, body) => {
        if(err) {
            logger('ERR')
            logger(err)
        } else {
            logger("NO ERROR")
            logger(response.statusCode)
            logger(body)
        }
    })
}
