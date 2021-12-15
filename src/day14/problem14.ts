//https://adventofcode.com/2021/day/14

import * as fs from 'fs';

let inputFile = "input.txt"
// inputFile = "test.txt"

//Clean up input file and seperate into template and rules
function openFile(input: string) : string[] {
    const file = fs.readFileSync(input, {encoding: 'utf8'}).split('\n').map(x=>x.trim()).join('\n')
    const rawData = file.split('\n\n')
    return rawData
}

//Just a wrapper around our map setting, Typescript maps have some quirks that make this longer than a line.
//Set the key and value into our map, or add the value to existing mapping.  Defaults value of 1.
function mapSetter(map: Map<string, number>, key: string, value:number=1){
    let count = map.get(key)
    if(!count) count = 0
    map.set(key, value + count)
}

//Seperate the base template into its base pairs, count them up in a map.
function makeTemplate(polymer: string){

    let counts = new Map<string, number>()
    
    for(let i = 0; i < polymer.length - 1; i++){
        let pair = polymer.substring(i, i+2)
        mapSetter(counts, pair) // Set or increase the value of pair in counts
    }

    return counts
}

//Seperate the rults into a bunch of map entries.  Maps an input pair into the two pairs it creates.
//Input line "AB -> C"
//Set into rules  "AB" -> ["AC", "CB"]
function makeRules(rulesText: string){

    let rules = new Map<string, string[]>()
    
    for(let line of rulesText.split('\n')){
        let details = line.split(" -> ")
        let split = [details[0].charAt(0) + details[1], details[1] + details[0].charAt(1)]
        rules.set(details[0], split)
    }
    
    return rules
}

//Loop through insertions into the polymer.
//input: mapping of pairs of polymers to the counts of times they appear
//rules: map of what every pair of polymers becomes after insertion
//iterations: times to run
function runInsertions(input: Map<string, number>, rules:  Map<string, string[]>, iterations: number){
    let pairCounts = input

    while(iterations > 0) {
        let nextCounts = new Map<string, number>()
        for(let pair of pairCounts.keys()){
            let amount = pairCounts.get(pair)
            let split = rules.get(pair)
            if (split){
                for(let rule of split){
                    mapSetter(nextCounts, rule, amount)
                }
            }
        }
        pairCounts = nextCounts
        iterations--
    }
    return pairCounts
}

//Calculate the difference between the most and least common element in our polymer pairs.
//original: the original polymer; the ends of which needs to be counted again.
function sumPolymer(input: Map<string, number>, original: string){

    let sums = new Map<string, number>()

    for(let pair of input.keys()){
        let amount = input.get(pair)
        for(let c = 0; c < pair.length; c++){ 
            mapSetter(sums, pair.charAt(c), amount)
        }
    }

    //Every element is double counted in the counts, except the very first and last.
    //Add them in and divide the values by two
    mapSetter(sums, original.charAt(0))
    mapSetter(sums, original.charAt(original.length - 1))
    let lowest = Math.min(...sums.values()) / 2
    let highest = Math.max(...sums.values()) / 2

    console.log(highest - lowest)
}


let file = openFile(inputFile)

let originalPolymer = file[0]
let template = makeTemplate(originalPolymer)
let rules = makeRules(file[1])

sumPolymer(runInsertions(template, rules, 10), originalPolymer)
sumPolymer(runInsertions(template, rules, 40), originalPolymer)

