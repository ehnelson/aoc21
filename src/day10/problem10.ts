//https://adventofcode.com/2021/day/10

import * as fs from 'fs';

let inputFile = "input.txt"
// inputFile = "test.txt"

const openChars = ["(", "[", "{", "<"]
const closeChars = [")", "]", "}", ">"]
const errorVals = [3, 57, 1197, 25137]
const missingScore = [1, 2, 3, 4]

function openFile(input: string) {
    const file = fs.readFileSync(input, {encoding: 'utf8'})
    const rawData = file.split('\n').map(x => x.trim())
    const rawerData = rawData.map(line => Array.from(line))
    return rawerData
}

function calcSyntaxError(data: string[][]){
    let errorSum = 0
    for(let line of data){
        let stack = []
        for(let instruction of line){
            if(openChars.includes(instruction)){
                stack.push(instruction)
            }else{
                let charType = closeChars.indexOf(instruction)
                if(openChars[charType] == stack[stack.length - 1]){
                    stack.pop()
                } else {
                    errorSum += errorVals[charType]
                    break;
                }
            }
        }
    }
    console.log(errorSum)
}

function calcMissingCharacters(data: string[][]){

    let scores = []

    for(let line of data){

        let stack : string[] = []

        for(let instruction of line){
            if(openChars.includes(instruction)){
                stack.push(instruction)
            }else{
                let charType = closeChars.indexOf(instruction)
                if(openChars[charType] == stack[stack.length - 1]){
                    stack.pop()
                } else {
                    stack = [] //Corrupted Line, ignore it
                    break;
                }
            }
        }

        let score = 0
        if(stack.length > 0) {
            while(stack.length > 0){

                let charType = openChars.indexOf(stack.pop() as string)
                score *= 5
                score += missingScore[charType]

            }

            scores.push(score)
        }

    }
    scores.sort((a,b) => a-b)
    console.log(scores[Math.floor(scores.length / 2)])
}

let data = openFile(inputFile)
calcSyntaxError(data)
calcMissingCharacters(data)