const fse = require('fs-extra')
const os = require('os')
const HOME_DIR = os.homedir()

const config_path = `${HOME_DIR}/.log-time.json`

module.exports = function writeToConfig(answers) {
    const config_obj = {
        "username": answers.username,
        "pass": answers.password
    }
    fse.writeJson(config_path, config_obj, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('config saved')
        }
    })
}
