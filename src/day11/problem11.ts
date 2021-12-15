//https://adventofcode.com/2021/day/11

import * as fs from 'fs';

let inputFile = "input.txt"
// inputFile = "test.txt"

const offsets = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]]

function openFile(input: string) {
    const file = fs.readFileSync(input, {encoding: 'utf8'})
    const rawData = file.split('\n').map(x => x.trim())
    const rawerData = rawData.map(line => Array.from(line, Number))
    return rawerData
}

function calcFlashes(octopi:number[][], findSyncronized:boolean){
    let total = 0
    let octopuses = 0
    octopi.forEach((x) => octopuses += x.length )
    let iterations = 0
    while(true){  //ok i got a little lazy between part 1 and part 2
        let found = new Set<string>()
        let toProcess = []
        for(let x = 0; x < octopi.length; x++){
            let row = octopi[x]
            for(let y = 0; y < row.length; y++){
                row[y]++
                if(row[y] > 9){
                    toProcess.push([x,y])
                    found.add([x,y].join())
                }
            }
        }
        let next;
        while(next = toProcess.pop()){
            for(let o of offsets){
                let x : number = next[0] + o[0]
                let y : number = next[1] + o[1]
                if(x >= 0 && x < octopi.length && y >= 0 && y < octopi[0].length){
                    octopi[x][y]++
                    if(octopi[x][y] > 9 && !found.has([x, y].join())){
                        toProcess.push([x, y])
                        found.add([x, y].join())
                    }
                }
            }
        }
        for(let flashed of found){
            let location = flashed.split(',').map(Number)
            octopi[location[0]][location[1]] = 0
        }
        total += found.size
        iterations++
        if(found.size == octopuses){
            console.log(iterations)
            return iterations
        }
    }

}

let data = openFile(inputFile)
// calcFlashes(data, 10, false)
calcFlashes(data, true)