//import PF from 'pathfinding';
import { sampleSize } from 'lodash';
import { Container } from 'pixi.js';
import { BoardConfig } from '../config';
import { colors } from '../const';
import { getRandomInRange } from '../utils';
import { Ball } from './ball';
import { Cell } from './cell';

export class Board extends Container {
    cells: Cell[];
    // balls: Ball[];
    matrixCells: number[];
    circleBall: boolean;
    arr: number[];
    ball: Ball;
    balls: Ball[];
    cell: Cell;
    constructor() {
        super();
        this.cells = [];
        this.balls = [];
        this.matrixCells = [];
        this.circleBall = null;
        this.arr = [];
    }
    buildBoard() {
        const { cell_count, cell_width, initial_balls_count } = BoardConfig;

        for (let i = 0; i < cell_count; i++) {
            for (let j = 0; j < cell_count; j++) {
                this.arr.push(0);
                this.cell = new Cell(i, j);

                this.cell.i = j;
                this.cell.ball = null;
                this.cell.j = i;
                this.cell.buildCell(0);
                this.cell.position.set(j * (cell_width + 1), i * (cell_width + 1));
                this.cell.tint = (i + j) % 2 === 0 ? 0x888888 : 0xbbbbbb;
                this.cells.push(this.cell);
                this.addChild(this.cell);
                //console.log(this.cells);
            }
            //this.matrixCells.push(this.arr);
        }
        this.buildBalls(initial_balls_count);
    }

    buildBalls(ballCount) {
        const { cell_width } = BoardConfig;
        const emptyCells = this.cells.filter((cell) => {
            return cell.ball === null;
        });
        const initial_cell = sampleSize(emptyCells, ballCount);
        for (let i = 0; i < ballCount; i++) {
            this.ball = new Ball();
            this.ball.buildBall();
            this.ball.IsActive = false;
            //this.ball.circle = null;
            this.ball.i = null;
            this.ball.j = null;
            initial_cell[i].ball = this.ball;
            const color = Math.floor(getRandomInRange(0, 5));
            initial_cell[i].ball.tint = colors[color];
            this.balls.push(initial_cell[i].ball);
            initial_cell[i].addChild(this.ball);
            this.cell.setBall(initial_cell[i], this.ball);
            // this.matrixCells[initial_cell[i].j][initial_cell[i].i] = 1;
        }
    }

    // buildCircle(cell) {
    //     if (this.circleBall) {
    //         this.circleBall.circle.destroy();
    //         this.circleBall.circle = null;
    //         this.circleBall.IsActive = false;
    //     }

    //     if (cell.ball !== null) {
    //         this.circleBall = cell.ball;
    //         const circle = new Circle();
    //         this.circleBall.circle = circle;
    //         this.circleBall.i = cell.i;
    //         this.circleBall.j = cell.j;

    //         this.circleBall.IsActive = true;
    //         this.circleBall.addChild(circle);
    //     } else {
    //         if (this.circleBall) {
    //             this._phathfinder(this.circleBall.i, this.circleBall.j, cell.i, cell.j);
    //         }
    //         this.circleBall = null;
    //     }
    // }

    // _phathfinder(xStart, yStart, xEnd, yEnd) {
    //     const grid = new PF.Grid(this.matrixCells);
    //     const finder = new PF.AStarFinder();
    //     const path = finder.findPath(xStart, yStart, xEnd, yEnd, grid);
    //     this._moveBall(path);
    // }

    // _moveBall(paths) {
    //     const { cell_count } = BoardConfig;
    //     console.log(this.matrixCells);
    //     this.matrixCells[paths[0][1]][paths[0][0]] = 0;
    //     this.matrixCells[paths[paths.length - 1][1]][paths[paths.length - 1][0]] = 1;

    //     let indexStart = paths[0][1] * cell_count + paths[0][0];
    //     let indexEnd = paths[paths.length - 1][1] * cell_count + paths[paths.length - 1][0];

    //     this.cells[indexEnd].ball = this.cells[indexStart].ball;
    //     this.cells[indexEnd].addChild(this.cells[indexStart].ball);
    //     this.cells[indexStart].ball = null;
    //     this.buildBalls(3);
    //}
}
