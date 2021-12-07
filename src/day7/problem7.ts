//https://adventofcode.com/2021/day/7
//Tried to do this one LIGHTNING FAST to get on the leaderboard :)
import * as fs from 'fs';

let inputFile = "input.txt"
//inputFile = "test.txt"

function openFile(input: string) {
    const file = fs.readFileSync(input, {encoding: 'utf8'})
    const rawData = file.split(',').map(Number)
    return rawData
}

function dumbCounter(crabs: number[], increasingCost: boolean){
    let distances = new Array(Math.max(...crabs)).fill(0)
    for(let i = 0; i < crabs.length; i++){
        let location = crabs[i]
        for(let j = 0; j < distances.length; j++){
            let distance = Math.abs(location - j)
            if(!increasingCost){
                distances[j] += distance
            } else { 
                let cost = distance * (1 + distance) / 2 
                distances[j] += cost
            }
        }
    }
    let lowest = Math.min(...distances)
    console.log(lowest)
}


let data = openFile(inputFile)
dumbCounter(data, false)
dumbCounter(data, true)