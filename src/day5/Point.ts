// This didn't really need to be its own class :) 
class Point{
    x: number
    y: number

    constructor (str: string) {
        let vals = str.split(",").map(Number)
        this.x = vals[0]
        this.y = vals[1]
    }
}

export default Point