class BingoBoard { 

    board: Array<number> = []
    selected: Array<boolean> = Array(25)
    score: number = -1

    constructor(values: string) {
        this.board = values.split(/[\n ]+/).map(Number)
        this.selected.fill(false)
    }

    selectNumber(num: number){

        let index = this.board.indexOf(num)
        if(index >= 0){
            this.selected[index] = true

            let rowIndex = Math.floor(index / 5)
            let colIndex = index % 5
            let rows = true
            let cols = true
            
            for(let i = 0; i < 5; i++){
                rows = rows && this.selected[rowIndex * 5 + i]
                cols = cols && this.selected[colIndex + i * 5]
            }

            if( rows || cols){
                this.setScore(num)
            }
        }

    }

    setScore(num: number){
        if (this.score != -1) return

        let total = 0
        for (let i = 0; i < this.selected.length; i++) {
            if (!this.selected[i]){
                total += this.board[i]
            }
        }

        this.score = total * num
    }

    winner(){
        return (this.score >= 0)
    }

    getScore(){
        return this.score
    }
}

export default BingoBoard