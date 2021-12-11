
class Basin {

    value: number
    facingSegments: number[][]
    nextRow: number[][]
    constructor(segment: number[], oldBasins?: Basin[]) {
    
        this.value =  segment.length
        this.nextRow = []
    
        if(!oldBasins){
            
            this.facingSegments = [segment]

        } else {

            this.facingSegments = []
            for(let b of oldBasins){ // Combine all our old basins into this new one.
                this.value += b.getValue()
                this.facingSegments.push(...b.facingSegments)
                this.nextRow.push(...b.nextRow)
            }
            this.nextRow.push(segment)
        }
    }

    touches(segment: number[]){
        for(let lastSegment of this.facingSegments){
            for(let y of lastSegment){
                if(segment.includes(y)){
                    return true
                }
            }
        }
        return false
    }

    append(segment: number[]){
        this.nextRow.push(segment)
        this.value += segment.length
    }

    process() {
        this.facingSegments = this.nextRow
        this.nextRow = []
    }

    getValue(){
        return this.value
    }
}

export default Basin