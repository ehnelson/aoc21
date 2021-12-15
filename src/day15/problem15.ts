//https://adventofcode.com/2021/day/15

import * as fs from 'fs';
import PriorityQueue from 'ts-priority-queue'

let inputFile = "input.txt"
// inputFile = "test.txt"

//Data holster
class Location{
    x: number
    y: number
    val: number
    constructor(x: number, y: number, val: number){
        this.x = x
        this.y = y
        this.val = val
    }
}


//Clean up input file and seperate into template and rules
function openFile(input: string) {
    const file = fs.readFileSync(input, {encoding: 'utf8'})
    const rawData = file.split('\n')
    return rawData
}

//Makes a grid of numbers based on our input data.
//Will extend the grid by the amount of extensions, increasing the value by ~1 every time.
function makeGrid(data: string[], extensions: number) : number[][] {
    let grid : number[][] = []
    let originalLength = data.length
    for(let line of data){
        let newLine = Array.from(line.trim(), Number)
        let result = Array.from(newLine)
        for(let i = 0; i < extensions - 1; i++){ //Extend as wide as it needs to go
            let b = newLine.map(num=> (num + i) % 9 + 1)
            result.push(...b)
        }
        grid.push(result)
    }
    for(let i = 0; i < extensions -1; i++){// Copy the extended lines down
        for(let lineIndex = 0; lineIndex < originalLength; lineIndex++){
            let line = grid[lineIndex]
            let b = line.map(num=> (num + i) % 9 + 1)
            grid.push(b)
        }
    }
    return grid
}

function isEnd(grid: number[][], loc: Location){
    return loc.x == grid.length - 1 && loc.y == grid[0].length - 1
}

const neighbors = [[0,-1], [0,1], [-1,0], [1,0]]

function pathfinder(grid: number[][]){

    let values: number[][] = Array(grid.length).fill(0).map(()=>(Array(grid[0].length).fill(Infinity)))
    
    let pq = new PriorityQueue<Location>({comparator: function(a,b) {return a.val - b.val}})
    pq.queue(new Location (0,0,0)) //Start at 0,0 ; pretend it's value is 0
    
    while(pq.length > 0) {

        let next = pq.dequeue()
        if(next.val <= values[next.x][next.y]){ // If this is still the cheapest value for this Location

            if(isEnd(grid, next)){ //The first time we see the end is defacto the cheapest, because of the Priority Queue
                console.log("Shortest path: ", next.val)
                return next.val
            }

            for(let n of neighbors){
                let x0 = next.x + n[0]
                let y0 = next.y + n[1]

                if(x0 >= 0 && x0 < grid.length && y0 >= 0 && y0 < grid[0].length){ //In bounds
                    let val = next.val + grid[x0][y0]
                    if(val < values[x0][y0]){
                        values[x0][y0] = val //Presave it into value, just so we don't check more expensive paths
                        pq.queue(new Location(x0,y0,val)) //Process the neighbor when it is cheapest
                    }
                }

            }
        }
    }
    console.log("We never got to the end?  Seems unpossible")
}

let data = openFile(inputFile)
let grid = makeGrid(data, 5)
pathfinder(grid)