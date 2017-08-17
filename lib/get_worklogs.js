var moment = require('moment')
var request = require('request')
var logger = require('./logger.js')
var fs = require('fs')
var get = require('lodash.get')
var isSet = require('lodash.isset')
var pickBy = require('lodash.pickby')
var filter = require('lodash.filter')
const os = require('os')
const HOME_DIR = os.homedir()
const config = require(`${HOME_DIR}/.log-time.json`)

module.exports = function getWorklogs (logs) {

    request({
        url: `https://jira.hotschedules.com/rest/api/2/worklog/list`,
        method: 'POST',
        auth: {
            username: config.username,
            pass: config.pass
        },
        body: JSON.stringify({'ids': logs}),
        headers: {
            'content-type': 'application/json'
        }
    }, (err, response, body) => {
        if(err) {
            logger('ERR')
            logger(err)
        } else {
            let output = JSON.parse(body)
            let mine = filter(output,(v)=>{
                return get(v,'author.key') === config.usernamej
            })
            logger(mine)
        }
    })
}
