var moment = require('moment')
var request = require('request')
var logger = require('./logger.js')
var fs = require('fs')
var get = require('lodash.get')
var isSet = require('lodash.isset')
var pickBy = require('lodash.pickby')
var getWorklogs = require('./get_worklogs')
const os = require('os')
const HOME_DIR = os.homedir()
let config;

module.exports = function getWorklogIds (time_period = 'week') {
    const since = moment().startOf(time_period).valueOf()
    fs.stat(`${HOME_DIR}/.log-time.json`, (err, stats) => {
        if (err) {
            throw new Error('No config file, run log-time config to create')
        } else {
            config = require(`${HOME_DIR}/.log-time.json`)
            request({
                url: `https://jira.hotschedules.com/rest/api/2/worklog/updated?since=${since}`,
                method: 'GET',
                auth: {
                    username: config.username,
                    pass: config.pass
                }
            }, (err, response, body) => {
                if(err) {
                    logger('ERR')
                    logger(err)
                } else {
                    logger('RESPONSE')
                    let parsed = JSON.parse(body)
                    let logs = get(parsed, 'values').map((v) => { 
                        return v.worklogId
                    })
                    getWorklogs(logs)
                }
            }

        )}
    })
}
