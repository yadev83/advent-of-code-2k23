import { getPath } from './utils/index.js'
import fs from 'fs'

/* PART 1 */

console.log(`
PART 1 CHALLENGE : The newly-improved calibration document consists of lines of text; 
each line originally contained a specific calibration value that the Elves now need to recover. 
On each line, the calibration value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number.
Consider your entire calibration document. What is the sum of all of the calibration values?
`)

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

console.log(`PART 1 SOLUTION : ${calibrationValues.reduce((acc, val) => acc + val, 0)}`)

/* PART 2 */

console.log(`
PART 2 CHALLENGE : Your calculation isn't quite right. It looks like some of the digits are actually spelled out with letters: 
one, two, three, four, five, six, seven, eight, and nine also count as valid "digits".
Equipped with this new information, you now need to find the real first and last digit on each line.
`)

// Now we want to read one, two, three..., up to nine as digits.  So we build a conversion map
const str2nb = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9'
}

// Grab the full text string and replace occurences of one, two, etc... by their number counter part.
// CAREFUL : if there is : "sevenine", it must become : "79" and not "7ine". 
// This is why, in the replace, I brought back first and last char of the string, to maintain compatibility with this cases,
// The non-digits chars are removed later anyways, so it doesn't matter.
let textString = textBuf.toString()
Object.keys(str2nb).forEach(string => {
    textString = textString.replaceAll(string, `${string.charAt(0)}${str2nb[string]}${string.charAt(string.length - 1)}`)
})

// Now, do basically the same thing as we did for Part 1, but with an edited textString that has all written numbers replaced by digits.
const textLinesP2 = textString.split('\n')
const calibrationValuesP2 = textLinesP2.map(line => {
    const digitsStr = line.replace(/\D/g, '')
    return parseInt(`${digitsStr.charAt(0)}${digitsStr.charAt(digitsStr.length - 1)}`)
})


console.log(`PART 2 SOLUTION : ${calibrationValuesP2.reduce((acc, val) => acc + val, 0)}`)