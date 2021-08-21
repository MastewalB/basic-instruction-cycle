export class Cell {
    constructor(index, value) {
        this.index = index;
        this.value = value;
        this.top = 0;
        this.right = 0;
    }

    create(class_name = " ") {
        const html = `
        <div class="divRow">
            <div class="divCellNums">${this.index}</div>
            <div class="divCell _${this.index}">${this.value}</div>
        </div>
    `
        if (class_name != " ") {
            newElement.setAttribute('class', class_name);
        }
        return html;
    }

    setPositions(x, y) {
        this.top = top;
        this.right = right;
    }
}