export class Cell {
    constructor(r, c) {
        this.r = r;
        this.c = c;

        // 注意canvas坐标系，这是单元格中心点坐标
        this.x = c + 0.5;
        this.y = r + 0.5;
    }
}