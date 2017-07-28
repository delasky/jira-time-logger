const assert = require('assert')
const getElapsedTime = require('../lib/elapsed_time.js')

describe('getElapsedTime', function() {
    describe('given milliseconds less than an hour', function() {
        it('returns a rounded value in minutes', function() {
            let result = getElapsedTime(61000)
            assert.equal(result, '1 m')
        })
    })
    describe('given milliseconds greater than an hour', function() {
        it('returns a value in hours and minutes', function() {
            let result = getElapsedTime(12000000)
            assert.equal(result, '3 h 20 m')
        })
    })
})
