module.exports = function getElapsedTime(milliseconds) {
    let elapsed;
    if (milliseconds < 3600000) {
        elapsed = `${ ( milliseconds / 60000 ).toFixed() } m`
    } else if (milliseconds >= 3600000) {
        let hours = milliseconds / 3600000
        let minutes = ( milliseconds % 3600000 ) / 60000
        elapsed = `${ hours.toFixed() } h ${minutes.toFixed()} m`
    }
    return elapsed;
}
