// https://adventofcode.com/2021/day/3
import * as fs from 'fs';

let diagnosticFile = "input3.txt"
//diagnosticFile = "test3.txt"

function openFile(diagnosticFile: string){
    const file = fs.readFileSync(diagnosticFile, {encoding: 'utf8'})
    return file.split('\n').map((line) => line.trim())
}

function calcPowerConsumption(report: Array<string>){

    const bitLength = report[0].length
    const sums = Array(bitLength).fill(0)

    for(let sample of report){
        for (let i = 0; i < bitLength; i++){
            sums[i] += +sample.charAt(i)
        }
    }

    const half = report.length / 2
    let gamma = 0
    let epsilon = 0

    for(let i = 0; i < bitLength; i++){
        gamma *= 2
        epsilon *= 2

        if (sums[i] > half){
            gamma += 1
        } else{
            epsilon += 1
        }
    }
    console.log(gamma * epsilon)
    return gamma * epsilon
}

function getRating(report: Array<string>, comparator: Function){

    const bitLength = report[0].length
    let reportPool = report

    for(let i = 0; i < bitLength; i++){
        let higherPool = []
        let lowerPool = []

        for(let sample of reportPool){
            if(+sample.charAt(i)){
                higherPool.push(sample)
            }else{
                lowerPool.push(sample)
            }
        }

        if(comparator(higherPool.length, lowerPool.length)){
            reportPool = higherPool
        } else {
            reportPool = lowerPool
        }

        if(reportPool.length == 1){
            return parseInt(reportPool[0], 2)
        }
    }
    return 0
}

function calcOxygenRating(diagnostic: Array<string>){

    const oxygenComparator = (x: number, y: number) => x >= y
    let oxygenRating = getRating(diagnostic, oxygenComparator)

    const carbonComparator = (x: number, y: number) => x < y
    let carbonRating = getRating(diagnostic, carbonComparator)

    console.log(oxygenRating * carbonRating)
    return oxygenRating * carbonRating
}

let diagnostic = openFile(diagnosticFile)
calcPowerConsumption(diagnostic)
calcOxygenRating(diagnostic)
