import Point from "./Point"

class Line{
    p1: Point
    p2: Point
    slope: number

    constructor(str: String){
        let points = str.split(" -> ").map(point => new Point(point))
        points.sort((a,b) => (a.x - b.x))
        this.p1 = points[0]
        this.p2 = points[1]
        this.slope =(this.p1.y - this.p2.y) / (this.p1.x - this.p2.x)
    }
}

export default Line