// https://adventofcode.com/2021/day/2

import * as fs from 'fs';

const courseFile = "input.txt"

interface Instruction {
    direction: string,
    value: number
}

function readInput(file: string) : Instruction[] {
    return fs.readFileSync(courseFile, {encoding: 'utf8'})
            .split('\n')
            .map((reading) => {
                var instructions = reading.split(" ")
                return {
                    direction: instructions[0],
                    value: +instructions[1]
                } as Instruction
            })
}

function calcDirection(navFile: Array<Instruction>){
    var depth = 0;
    var distance = 0;

    for(let i = 0; i < navFile.length; i++){
        switch (navFile[i].direction) {
            case "forward":
                distance += navFile[i].value
                break;
            case "down":
                depth += navFile[i].value
                break;
            case "up":
                depth -= navFile[i].value
                break;
                            
        }
    }
    console.log(depth * distance)
    return depth * distance
}

function betterDirection(navFile: Array<Instruction>){
    var aim = 0
    var depth = 0;
    var distance = 0;

    for(let i = 0; i < navFile.length; i++){
        switch (navFile[i].direction) {
            case "forward":
                distance += navFile[i].value
                depth += navFile[i].value * aim
                break;
            case "down":
                aim += navFile[i].value
                break;
            case "up":
                aim -= navFile[i].value
                break;
                            
        }
    }
    console.log(depth * distance)
    return depth * distance
}

const navFile = readInput(courseFile)

calcDirection(navFile)
betterDirection(navFile)