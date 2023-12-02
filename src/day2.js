import { getPath } from './utils/index.js'
import fs from 'fs'

console.log(`
PART 1 CHALLENGE : Determine which games would have been possible if the bag had been loaded with only 
12 red cubes, 13 green cubes, and 14 blue cubes. 
What is the sum of the IDs of those games?

EXAMPLE INPUT : 
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
`)

// Read input file into a buffer
const textBuf = fs.readFileSync(getPath('../data/day2.txt'))

// File is : Each line is a game, after the ":" is set 1, after ";" is another set, sets are composed of ',' separated items
// Split the text string after each new line to make an array of games
const gamesTextList = textBuf.toString().split('\r\n')

// Serializes the games list into usable objects
const games = gamesTextList.map(gameTextList => {
    const [gameHeader, gameSets] = gameTextList.split(':')?.filter(str => str?.length)
    const game = {
        id: null,
        sets: []
    }

    game.id = parseInt(gameHeader?.split(' ')[1])
    game.sets = gameSets?.split(';')?.filter(str => str?.length).map(gameTextSet => {
        return gameTextSet.split(',').reduce((acc, step) => {
            const [nb, color] = step.split(' ')?.filter(str => str?.length)
            acc[color] = parseInt(nb)

            return acc
        }, {
            red: 0,
            green: 0,
            blue: 0
        })
    })

    return game
})

// Filter the games to keep only the ones where it is probable that the bag has been loaded with at most 12 red, 13 green, and 14 blue cubes
const RED_MAX = 12
const GREEN_MAX = 13
const BLUE_MAX = 14

const filteredGames = games.filter(game => {
    return !(game.sets.some(set => set.red > RED_MAX || set.green > GREEN_MAX || set.blue > BLUE_MAX))
})

// Now add up all the filteredGames Ids
const idsSum = filteredGames.reduce((acc, game) => parseInt(acc + game.id), 0)
console.log(`PART 1 SOLUTION : ${idsSum}`)

// PART 2
console.log(`
PART 2 CHALLENGE : As you continue your walk, the Elf poses a second question: 
in each game you played, what is the fewest number of cubes of each color that could have been in the bag to make the game possible?
The power of a set of cubes is equal to the numbers of red, green, and blue cubes multiplied together.
The power of the minimum set of cubes in game 1 is 48. In games 2-5 it was 12, 1560, 630, and 36, respectively.
For each game, find the minimum set of cubes that must have been present. What is the sum of the power of these sets?
`)

// Update the games objects to include a minimum set (minimum set is the max number for each color through the game's sets)
const gamesP2 = games.map(game => {
    const minSet = game.sets.reduce((acc, set) => {
        Object.entries(set).forEach(([color, nb]) => {
            if(nb > acc[color])
                acc[color] = nb
        })

        return acc
    }, {
        red: 0,
        green: 0,
        blue: 0
    })

    return {
        ...game,
        minimumSet: {
            ...minSet,
            power: Object.values(minSet).reduce((acc, nb) => {
                if(nb)
                    return acc * nb
            }, 1) 
        }
    }
})

const powerSum = gamesP2.reduce((acc, game) => {
    return acc + game.minimumSet.power
}, 0)

console.log(`PART 2 SOLUTION : ${powerSum}`)