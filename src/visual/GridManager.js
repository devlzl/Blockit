export class GridManager {
  constructor() {
    this.grids = {}
  }

  addElement(element) {
    const minRow = element.get('top')
    const maxRow = element.get('bottom')
    const minCol = element.get('left')
    const maxCol = element.get('right')
    for (let i = minRow; i <= maxRow; i++) {
      for (let j = minCol; j <= maxCol; j++) {
        const id = `${i}-${j}`
        let grid = this.grids[id]
        if (!grid) {
          grid = []
          this.grids[id] = grid
        }
        grid.push(element)
      }
    }
  }

  pick(x, y) {
    // x(col), y(row) !
    return this.grids[`${y}-${x}`]?.slice(-1)[0]
  }
}
