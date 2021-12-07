// https://adventofcode.com/2021/day/4

import fs = require("fs");
import BingoBoard from "./BingoBoard";

let bingoFile = "input.txt"
//bingoFile = "test.txt"

function openFile(diagnosticFile: string){
    const file = fs.readFileSync(diagnosticFile, {encoding: 'utf8'})
    return file.split('\n\n').map((line) => line.trim())
}

function makeBoards(inputs: Array<string>){
    let results = []
    for(let input of inputs){
        results.push(new BingoBoard(input))
    }
    return results
}

function makeSelections(values: Array<number>, boards: Array<BingoBoard>){
    for (let value of values){
        for (let board of boards) {
            board.selectNumber(value)
            if (board.winner()){
                return board.getScore()
            }
        }
    }
}

function getWorstBoard(values: Array<number>, boards: Array<BingoBoard>){
    for (let value of values){
        for (let board of boards) {
            board.selectNumber(value)
        }
        if(boards.length == 1 && boards[0].winner()){
            return boards[0].getScore()
        }
        boards = boards.filter(board => !board.winner())
    }
    return -1
}


let inputs = openFile(bingoFile)
let values = inputs[0].split(",").map(Number)

let boards = makeBoards(inputs.slice(1))
console.log(makeSelections(values, boards))

//Could probably use the old boards here but :shrug:
let worstBoards = makeBoards(inputs.splice(1))
console.log(getWorstBoard(values, worstBoards))