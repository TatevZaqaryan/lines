//import PF from 'pathfinding';
import { Container } from 'pixi.js';
import { BoardConfig } from '../config';
// import { Ball } from "./ball";
import { Cell } from './cell';

export class Board extends Container {
    cells: Cell[];
    // balls: Ball[];
    matrixCells: number[];
    circleBall: boolean;
    arr: number[];

    constructor() {
        super();
        this.cells = [];
        // this.balls = [];
        this.matrixCells = [];
        this.circleBall = null;
        this.arr = [];
    }
    buildBoard() {
        const { cell_count, cell_width } = BoardConfig;

        for (let i = 0; i < cell_count; i++) {
            for (let j = 0; j < cell_count; j++) {
                this.arr.push(0);
                const cell = new Cell(i, j);
                // cell.on('onClick', (cell) => {
                //     this.buildCircle(cell);
                //});
                //cell.ball = null;
                cell.i = j;
                cell.j = i;
                cell.buildCell(0);
                cell.position.set(j * (cell_width + 1), i * (cell_width + 1));
                cell.tint = (i + j) % 2 === 0 ? 0x888888 : 0xbbbbbb;
                this.cells.push(cell);
                this.addChild(cell);
            }
            //this.matrixCells.push(this.arr);
        }
    }

    // buildBalls(ballCount, collors) {
    //     const { cell_width } = BoardConfig;
    //     // console.log(this.cells);
    //     const emtyCells = this.cells.filter((cell) => {
    //         return cell.ball === null;
    //     });
    //     //console.warn(emtyCells);
    //     const initial_cell = sampleSize(emtyCells, ballCount);
    //     for (let i = 0; i < ballCount; i++) {
    //         this.ball = new Ball();
    //         this.ball.buildBall();
    //         this.ball.IsActive = false;
    //         this.ball.circle = null;
    //         this.ball.i = null;
    //         this.ball.j = null;

    //         initial_cell[i].ball = this.ball;
    //         let color = Math.floor(getRandomInRange(0, 5));
    //         initial_cell[i].ball.tint = colors[color];
    //         this.balls.push(initial_cell[i].ball);
    //         const cell = new Cell();
    //         initial_cell[i].addChild(this.ball);
    //         cell.setBall(initial_cell[i], this.ball);
    //         this.matrixCells[initial_cell[i].j][initial_cell[i].i] = 1;
    //     }
    // }

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
