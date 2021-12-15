//https://adventofcode.com/2021/day/13

import * as fs from 'fs';

let inputFile = "input.txt"
// inputFile = "test.txt"

//Quick holder for the fold information
class Fold {
    vertical: boolean
    pos: number
    constructor(vert: boolean, pos: number){
        this.vertical = vert
        this.pos = pos
    }
}

function openFile(input: string) : string[] {
    const file = fs.readFileSync(input, {encoding: 'utf8'}).split('\n').map(x=>x.trim()).join('\n')
    const rawData = file.split('\n\n')
    return rawData
}

//Split dots text into pairs of numbers (coords)
function getDots(data: string) {
    let dots = []
    for(let line of data.split('\n')) {
        let location = line.split(",").map(Number)
        dots.push(location)
    }
    return dots
}

//Split folds into more useful Folds
function getFolds(data: string) {
    let folds = []
    for(let line of data.split('\n')) {
        let inst = line.split(" ")[2].split("=")
        folds.push(new Fold((inst[0] == "x"), +inst[1]))
    }
    return folds
}

//Helper function for sort, sort dots by y then x
//We depend on the dots being sorted for a lot of this logic.
function dotSorter(a: number[], b: number[]){
    if(a[1] == b[1]){
        return a[0] - b[0]
    }
    return a[1] - b[1]
}

//Print a nice grid of dots / hashes 
//Will sort the dots
function printDots(dots: number[][]){

    //Find the max value in x and y direction, for sizing the grid.
    let max = dots.reduce((a,b) => [Math.max(a[0], b[0]), Math.max(a[1], b[1])])
    dots.sort(dotSorter)
    
    let output = ""
    let nextDotIndex = 0 //Going through the dots in order, 

    for(let y = 0; y <= max[1]; y++){
        for(let x = 0; x <= max[0]; x++){

            if(nextDotIndex < dots.length && x==dots[nextDotIndex][0] && y==dots[nextDotIndex][1]){
                output += "#"
                nextDotIndex++
            } else { 
                output += "."
            }
        }
        output += '\n'
    }
 
    console.log(output)
}

// Makes one fold.

function oneFold(dots: number[][], fold: Fold){
    let newDots = []

    for(let i = 0; i < dots.length; i++){
        let comparing = (fold.vertical) ? dots[i][0] : dots[i][1]
        if(comparing > fold.pos){
            let diff = comparing - fold.pos
            // #MATH
            let newDot =  (fold.vertical) ? [dots[i][0] - 2 * diff, dots[i][1]] : [dots[i][0], dots[i][1] - 2 * diff]

            let exists = false
            newDots.forEach((dot)=> exists = exists || (dot[0] == newDot[0] && dot[1] == newDot[1]))
            if(!exists){ //Only adding the new guy if it isn't a duplicate.
                newDots.push(newDot)
            }
        } else {
            newDots.push(dots[i])
        }
    }
    newDots.sort(dotSorter)
    return newDots
}

//Runs every fold against our list of dots, prints out the result.
function processFolds(dots: number[][], fold: Fold[]){
    let remainingDots = dots
    for(let fold of folds){
        remainingDots = oneFold(remainingDots, fold)
    }
    printDots(remainingDots)
}

const data = openFile(inputFile)
const dots = getDots(data[0])
const folds = getFolds(data[1])

dots.sort(dotSorter)
//oneFold(dots, folds[0]) // Part 1
processFolds(dots, folds)
