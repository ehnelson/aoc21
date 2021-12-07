//https://adventofcode.com/2021/day/6
import * as fs from 'fs';

let inputFile = "input.txt"
//inputFile = "test.txt"

function openFile(fishyFile: string) : number[]{
    const file = fs.readFileSync(fishyFile, {encoding: 'utf8'})
    const rawData = file.split(',').map(Number)
    const fish = Array(9).fill(0)
    for (let value of rawData) {
        fish[value]++
    }
    return fish
}

function simulateBreeding(fish: number[], days: number){
    for(let day = 1; day <= days; day++) {
        let breeding = fish[0]
        fish = fish.slice(1)
        fish[6] += breeding
        fish[8] = breeding
    }
    let sum = fish.reduce((a, b) => a+b)
    console.log(sum)
    return sum
}

let fish = openFile(inputFile)
simulateBreeding(fish, 80)
simulateBreeding(fish, 256)