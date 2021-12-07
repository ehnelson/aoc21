//https://adventofcode.com/2021/day/1
import * as fs from 'fs';

const depthsFile = "input.txt"

function p1(readings: Array<number>){
    var count = 0;
    
    for (let i = 1; i < depths.length; i++) {
        if (depths[i] > depths[i-1]){
            count++;
        }
    }

    console.log(count)
    return count
}

function p2(readings: Array<number>){
    var count = 0;
    
    for (let i = 3; i < depths.length; i++) {
        if( depths[i] > depths[i-3]){
            count++;
        }
    }
    console.log(count)
    return count
}


var file = fs.readFileSync(depthsFile, {encoding: 'utf8'})
//file = "199\n200\n208\n210\n200\n207\n240\n269\n260\n263" //test data
const depths = file.split('\n').map(Number)

p1(depths)
p2(depths)