import { Container } from 'pixi.js';
import { Cell } from './board/cell';
import { Ball } from './board/ball';
import { BoardConfig } from './config';
import { getRandomInRange } from './utils';
import { colors } from './const';

export class Queue extends Container {
    i: number;
    queueCells: Cell[];
    queueCell: Cell;
    queBall: Ball;
    queCollors: number[];
    constructor() {
        super();
        this.queueCells = [];
    }

    buildQueueCell(): void {
        const { queue_balls_count, cell_width, cell_line_style } = BoardConfig;

        for (let i = 0; i < queue_balls_count; i++) {
            this.queueCell = new Cell(queue_balls_count, 0);
            //   this.queueCell.ball = null;

            this.queueCell.i = i;
            this.queueCell.buildCell(cell_line_style);
            this.queueCell.position.set(this.queueCell.i * (cell_width + 1), cell_width);
            this.queueCell.tint = 0x555555;
            this.queueCells.push(this.queueCell);
            this.addChild(this.queueCell);
        }
    }

    buildQueueBalls() {
        const { queue_balls_count } = BoardConfig;
        this.queCollors = [];
        for (let i = 0; i < queue_balls_count; i++) {
            this.queBall = new Ball();
            this.queBall.buildBall();
            let collor = Math.floor(getRandomInRange(0, 5));
            this.queCollors.push(collor);
            this.queueCells[i].ball = this.queBall;
            this.queueCells[i].ball.tint = colors[collor];
            this.queueCells[i].addChild(this.queBall);
            this.queueCell.setBall(this.queueCells[i], this.queBall);
        }

        this.buildQueBall();
    }

    buildQueBall() {
        this.parent.children[1].queCollor = this.queCollors;
    }
}
