//https://adventofcode.com/2021/day/5
import * as fs from 'fs';
import Line from './Line'

const gridSize = 1000
let inputFile = "input.txt"
// inputFile = "test.txt"

function openFile(diagnosticFile: string){
    const file = fs.readFileSync(diagnosticFile, {encoding: 'utf8'})
    return file.split('\n')
                .map((line) => 
                    new Line(line.trim()))
}

function findIntersections(lines: Line[], includeDiagonals: boolean){

    let grid: number[][] = new Array(gridSize).fill(0).map(()=>(new Array(gridSize).fill(0)))
    let count = 0
    
    for (let i = 0; i < lines.length; i++) {

        let line = lines[i]

        if(line.slope == 0){

            for(let x = line.p1.x; x <= line.p2.x; x++){
                grid[x][line.p1.y]++
                if (grid[x][line.p1.y] == 2){
                    count++
                }
            }

        } else if(Math.abs(line.slope) == Infinity){

            let low = Math.min(line.p1.y, line.p2.y)
            let high = Math.max(line.p1.y, line.p2.y)
            for(let y = low; y <= high; y++){
                grid[line.p1.x][y]++
                if(grid[line.p1.x][y] == 2){
                    count++
                }
            }

        } else if (includeDiagonals) {

            let length = Math.abs(line.p1.y - line.p2.y)

            for(let i = 0; i <= length; i++){

                grid[line.p1.x + i][line.p1.y + i * line.slope]++

                if ( grid[line.p1.x + i][line.p1.y + i * line.slope] == 2 ) {
                    count++
                }

            }

        }
    }
    console.log(count)
    return count
}

let lines = openFile(inputFile)
findIntersections(lines, false)
findIntersections(lines, true)