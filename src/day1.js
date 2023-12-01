/**
 * DAY 1 - PART 1
 * The newly-improved calibration document consists of lines of text; 
 * each line originally contained a specific calibration value that the Elves now need to recover. 
 * On each line, the calibration value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number.
 * 
 * Consider your entire calibration document. What is the sum of all of the calibration values?
 */
import { getPath } from './utils/index.js'
import fs from 'fs'

// Read input file into a buffer
const textBuf = fs.readFileSync(getPath('../data/day1.txt'))
// Split the text string after each new line to make an array of lines of text
const textLines = textBuf.toString().split('\n')
// Calibration values are just first and last digit together => if a textLine is 2386, the value will be 26, if a line is 5, the value will be 55, and so on...
const calibrationValues = textLines.map(line => {
    // Remove non decimal chars from the string first
    const digitsStr = line.replace(/\D/g, '')
    // Then, concat first and last digit of the string and return them as an int
    return parseInt(`${digitsStr.charAt(0)}${digitsStr.charAt(digitsStr.length - 1)}`)
})

console.log(`The sum of the values from the calibration document is : ${calibrationValues.reduce((acc, val) => acc + val, 0)}`)