export class GridManager {
  constructor() {
    this.grids = new Map()
    this.elementGridsMap = new Map()
  }

  addElement(element) {
    const minRow = element.get('top')
    const maxRow = element.get('bottom')
    const minCol = element.get('left')
    const maxCol = element.get('right')
    const relatedGrips = this.elementGridsMap.get(element) ?? new Set()
    if (relatedGrips.size > 0) {
      relatedGrips.forEach(grid => grid.delete(element))
    }
    for (let i = minRow; i <= maxRow; i++) {
      for (let j = minCol; j <= maxCol; j++) {
        const id = `${i}-${j}`
        let grid = this.grids.get(id)
        if (!grid) {
          grid = new Set()
          this.grids.set(id, grid)
        }
        grid.add(element)
        relatedGrips.add(grid)
      }
    }
    this.elementGridsMap.set(element, relatedGrips)
  }

  pick(x, y) {
    // x(col), y(row) !
    const grid = this.grids.get(`${y}-${x}`)
    if (grid) {
      return Array.from(grid)[grid.size - 1]
    }
  }
}
