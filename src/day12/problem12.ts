//https://adventofcode.com/2021/day/12

import * as fs from 'fs';
import Cave from './Cave';

let inputFile = "input.txt"
// inputFile = "test.txt"


function openFile(input: string) : string[][] {
    const file = fs.readFileSync(input, {encoding: 'utf8'})
    const rawData = file.split('\n').map(x => x.trim().split("-"))
    return rawData
}

//Get or create a new cave with the given name.
function getCave(name: string, caves: Map<String, Cave>) : Cave{
    let cave = caves.get(name)
    if (!cave){
        cave = new Cave(name)
        caves.set(name, cave)
    }
    return cave
}

//Make and join all the caves from a list of connections.
//Returns the start cave.
function makeCaves(caveList: string[][]) : Cave {

    let start 
    let caves = new Map<String, Cave>()
    
    for(let connection of caveList){
        let c1 = getCave(connection[0], caves)
        let c2 = getCave(connection[1], caves)

        c1.link(c2)
        c2.link(c1)
        if (!start && c1.name == "start") start = c1
        if (!start && c2.name == "start") start = c2
    }
    
    if(!start){
        throw new Error("No starter cave included in cave list")
    }

    return start
}


//Recursive cave exploring function
//multivisit denotes if we've used the second visit from part 2.
function travel(current: Cave, path: string[], results: Set<string>, multiVisit: boolean){

    path.push(current.name)
    
    if(current.isEnd()){
    
        results.add(path.join(","))
    
    } else {

        current.visit()

        for(let neighbor of current.neighbors){
            if(neighbor.isVisitable()){
                travel(neighbor, path, results, multiVisit)    
            }
        }

        current.unvisit()

        if(multiVisit && !current.bigCave && current.name != "start"){
            for(let neighbor of current.neighbors){
                if(neighbor.isVisitable()){
                    travel(neighbor, path, results, false)    
                }
            }        
        }
    }

    path.pop()
}

//Base cave exploring function
//multivisit denotes if we've used the second visit from part 2.
function findPaths(caveList: string[][], multiVisit: boolean){

    let start = makeCaves(caveList)
    let path : string[] = []
    let results : Set<string> = new Set<string>()

    travel(start, path, results, multiVisit)

    console.log(results.size)
}

let caveList = openFile(inputFile)
findPaths(caveList, false)
findPaths(caveList, true)