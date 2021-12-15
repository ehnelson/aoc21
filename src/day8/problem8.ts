//https://adventofcode.com/2021/day/8
import * as fs from 'fs';

let inputFile = "input.txt"
// inputFile = "test.txt"
let timeResult = true

const simpleNumsLengths = [2,3,4,7]
const segmentBitmappedNumbers = [1110111, 10010, 1011101, 1011011, 111010, 1101011, 1101111, 1010010, 1111111, 1111011]
//[1110111, 0010010, 1011101, 1011011, 0111010, 1101011, 1101111, 1010010, 1111111, 1111011] couple zeros removed

function openFile(input: string) {
    const file = fs.readFileSync(input, {encoding: 'utf8'})
    const rawData = file.split('\n').map(x => x.trim())
    const rawerData = rawData.map(reading => reading.split('|').map(x => x.trim().split(" ")))
    return rawerData
}

// Problem one, find all the easily known signals
function findSimpleNumbers(signaldata: string[][][]){
    let count = 0
    for (let entry of signalData) {
        for (let output of entry[1]){
            if(simpleNumsLengths.includes(output.length)){
                count++
            }
        }
    }
    console.log(count)
}

/* Problem 2, take one, funny solution counting up how often a wire is seen */

// Return the character/wire in the signal we haven't yet found the location of
function findUnkownWire(signal: String, segmentsToWire: string[]) : String{
    for(let i = 0; i < signal.length; i++){
        let c = signal.charAt(i)
        if(!segmentsToWire.includes(c)){
            return c
        }
    }
    console.log("Realistically I'd throw an error here")
    return ""
}

// Transform a single digit from its wire names -> segment bitmap -> actual digit
function outputToLegibleDigit(output: String, segmentsToWire: string[]){
    let sum = 0
    for(let i = 0; i < segmentsToWire.length; i++){
        sum *= 10
        let nextChar = segmentsToWire[i]
        if (output.indexOf(nextChar) >= 0){
            sum++
        }
    }
    return segmentBitmappedNumbers.indexOf(sum)
}

// Problem two, do the rest.
function solveSignalData(signalData: string[][][]){
    let count = 0
    for (let entry of signalData) {

        //Count how often each segment  new (wrong) character appears in the whole unique signal pattern
        let signalValues = entry[0].sort((a,b) => a.length - b.length)
        let segmentSums = Array(7).fill(0)
        for (let unique of signalValues){
            for (let i = 0; i < unique.length; i++){
                let val = unique.charCodeAt(i) - 97
                segmentSums[val]++
            }
        }

        //Array mapping segment index to new wire name
        let segmentsToWire = Array(7).fill("")

        //the wire that shows up 4 times is the 5th segment, per diagram below, and so on.
        segmentsToWire[4] = String.fromCharCode(97 + segmentSums.indexOf(4))
        segmentsToWire[1] = String.fromCharCode(97 + segmentSums.indexOf(6))
        segmentsToWire[5] = String.fromCharCode(97 + segmentSums.indexOf(9))

        //Shortest input value is 1, and contains the 3rd / c segment (as well as 6th, which we already know)
        segmentsToWire[2] = findUnkownWire(signalValues[0], segmentsToWire) // 1 -> 3rd / c
        segmentsToWire[0] = findUnkownWire(signalValues[1], segmentsToWire) // 7 -> 1st / a
        segmentsToWire[3] = findUnkownWire(signalValues[2], segmentsToWire) // 4 -> 4th / d
        segmentsToWire[6] = findUnkownWire(signalValues[6], segmentsToWire) // 8 -> 7th / g
        
        let result = 0
        for ( let ouput of entry[1] ){
            result *= 10
            result += outputToLegibleDigit(ouput, segmentsToWire)
        }
        count += result

    }
    console.log(count)
}

/* Problem 2, take 2, smarter (but slower?) solution, not looking at wires, doing some process of elim */

function strContainsStr(s1: String, s2: String) : boolean {
    let short = s1.length < s2.length ? s1 : s2
    let long = s1.length > s2.length ? s1 : s2
    for(let i = 0; i < short.length; i++){
        let c = short.charAt(i)
        if(long.indexOf(c) < 0){
            return false
        }
    } 
    return true
}

function alphabetize(str: string) : string {
    return str.split('').sort().join('')
}

function finder(signalValues: string[], found: string[], length: number, comparingStringIndex?: number) {
    for(let signal of signalValues) {
        if(signal.length == length && !found.includes(signal)) {
            if(!comparingStringIndex || strContainsStr(signal, found[comparingStringIndex])){
                return signal
            }
        }
    }
    console.log("Bad")
    return ""
}

// Problem two v2
function solveSignalDataV2(signalData: string[][][]){
    let count = 0
    for (let entry of signalData) {

        let signalValues = entry[0].sort((a,b) => a.length - b.length)
        let wireNames = Array(10)

        wireNames[1] = signalValues[0]
        wireNames[7] = signalValues[1]
        wireNames[4] = signalValues[2]
        wireNames[8] = signalValues[9]
        signalValues = signalValues.slice(3, 9)

        wireNames[9] = finder(signalValues, wireNames, 6, 4)
        wireNames[0] = finder(signalValues, wireNames, 6, 7)
        wireNames[6] = finder(signalValues, wireNames, 6)
        wireNames[3] = finder(signalValues, wireNames, 5, 7)
        wireNames[5] = finder(signalValues, wireNames, 5, 9)
        wireNames[2] = finder(signalValues, wireNames, 5)

        wireNames = wireNames.map(wire => alphabetize(wire))

        let result = 0
        for ( let output of entry[1]){
            result *= 10
            result += wireNames.indexOf(alphabetize(output))
        }
        count += result

    }
    console.log(count)
}

let signalData = openFile(inputFile)
findSimpleNumbers(signalData)

let t1 = new Date().getTime() 
solveSignalData(signalData)
let t2 = new Date().getTime()
if (timeResult) console.log("Time old ", t2 - t1)

solveSignalDataV2(signalData)
let t3 = new Date().getTime()
if (timeResult) console.log("Time new ", t3 - t2)
