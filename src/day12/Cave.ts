// Helper class for makin caves.

class Cave {

    name: string
    bigCave: boolean
    end: boolean
    neighbors: Cave[]
    visitsRemaining: number

    constructor(name: string){
        this.name = name
        this.end = (name == "end")
        this.neighbors = []

        this.visitsRemaining = 1
        this.bigCave = (name == name.toUpperCase())
    }

    link(other: Cave) {
        this.neighbors.push(other)
    }

    visit(){
        this.visitsRemaining--
    }

    unvisit(){
        this.visitsRemaining++
    }

    isVisitable(){
        return this.bigCave || this.visitsRemaining > 0
    }

    isEnd() {
        return this.end
    }


}

export default Cave