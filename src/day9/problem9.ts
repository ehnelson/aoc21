//https://adventofcode.com/2021/day/9

import * as fs from 'fs';
import Basin from './Basin';

let inputFile = "input.txt"
// inputFile = "test.txt"

function openFile(input: string) {
    const file = fs.readFileSync(input, {encoding: 'utf8'})
    const rawData = file.split('\n').map(x => x.trim())
    const rawerData = rawData.map(line => Array.from(line).map(Number))
    return rawerData
}

function findLowPoints(input: number[][]){
    let sum = 0

    for(let x = 0; x < input.length; x++){ 
        let row = input[x]

        for(let y = 0; y < row.length; y++){
            let val = row[y]

            if((y == 0 || val < row[y-1]) && (y == row.length -1 || val < row[y + 1])){

                if((x == 0 || val < input[x-1][y]) && (x == input.length - 1 || val < input[x+1][y])) {
                    sum += 1 + val
                }

            }
        }
    }
    console.log(sum)
    return sum
}

// Find all contiguous segments of non - nine values.  Any other value works
// Returns an array of segments, each is an array of the indexes they contain.
function getSegmentsForRow(row: number[]){
    let segments = []
    let currentSegment = []
    for(let y = 0; y < row.length; y++){
        let val = row[y]
        if(val == 9){
            if (currentSegment.length > 0){
                segments.push(currentSegment)
                currentSegment = []
            }
        } else {
            currentSegment.push(y)
        }
        
    }
    if(currentSegment.length > 0) {
        segments.push(currentSegment)
    }
    return segments
}

//A greedy map blob solution might be best, but I thought of this silly segment idea and went for it 
function findBasins(input: number[][]){
    let finishedBasins = []
    let activeBasins : Basin[] = []

    for(let x = 0; x < input.length; x++){

        let row = input[x]
        let segments = getSegmentsForRow(row)
        let newBasins = []

        for(let segment of segments){
            let touches : Basin[] = []
            for(let basin of activeBasins){ //Find every Basin we're working on, that this segment touches
                if(basin.touches(segment)){
                    touches.push(basin)
                }
            }

            if(touches.length == 1){ // If we just touch one, add this one into it.
                touches[0].append(segment)
            } else if (touches.length > 1) { // If we touch multiple, we combine them into a single basin
                let basin = new Basin(segment, touches)
                activeBasins = activeBasins.filter(basin => !touches.includes(basin))
                activeBasins.push(basin)
            } else { // No touching, new basin.
                let basin = new Basin(segment)
                newBasins.push(basin)
            }
        }

        for(let basin of activeBasins){
            if(basin.facingSegments.length > 0){ //Move active basins forward a row
                basin.process() 
                newBasins.push(basin)
            }else{
                finishedBasins.push(basin) // Inactive, add to finished.
            }
        }
        activeBasins = newBasins
    }
    finishedBasins.push(...activeBasins)
    let basinsLengths = finishedBasins.map(b => b.getValue()).sort((a,b)=>a-b).reverse()

    console.log(basinsLengths[0] * basinsLengths[1] * basinsLengths[2])

}
let data = openFile(inputFile)
findLowPoints(data)
findBasins(data)