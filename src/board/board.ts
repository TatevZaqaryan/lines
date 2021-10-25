import { sampleSize } from 'lodash';
import * as PF from 'pathfinding';
import { Container } from 'pixi.js';
import { BoardConfig } from '../config';
import { colors } from '../const';
import { getRandomInRange } from '../utils';
import { App } from '../app';
import { Ball } from './ball';
import { Cell } from './cell';
import { Circle } from './circle';
export class Board extends Container {
    cells: Cell[];
    matrixCells: number[][];
    circleBall: Ball;
    arr: number[];
    ball: Ball;
    balls: Ball[];
    cell: Cell;
    queCollor: number[];
    count: number;
    constructor() {
        super();
        this.cells = [];
        this.balls = [];
        this.matrixCells = [];
        this.arr = [];
        this.circleBall = null;
        this.queCollor = [0];
        this.count = 0;
    }
    buildBoard() {
        const { cell_count, cell_width, initial_balls_count } = BoardConfig;

        for (let i = 0; i < cell_count; i++) {
            const arr = [];
            for (let j = 0; j < cell_count; j++) {
                arr.push(0);
                this.cell = new Cell(i, j);
                this.cell.on('onClick', (cell) => {
                    this.buildCircle(cell);
                });

                this.cell.ball = null;
                this.cell.i = j;
                this.cell.j = i;
                this.cell.buildCell(0);
                this.cell.position.set(j * (cell_width + 1), i * (cell_width + 1));
                this.cell.tint = (i + j) % 2 === 0 ? 0x888888 : 0xbbbbbb;
                this.cells.push(this.cell);
                this.addChild(this.cell);
            }

            this.matrixCells.push([...arr]);
            this.arr.push(...arr);
        }
    }

    buildBalls(ballCount) {
        let color = 0;
        const { cell_width, queue_balls_count } = BoardConfig;
        const emptyCells = this.cells.filter((cell) => {
            return cell.ball === null;
        });
        const initial_cell = sampleSize(emptyCells, ballCount);

        for (let i = 0; i < ballCount; i++) {
            this.ball = new Ball();
            this.ball.buildBall();
            this.ball.IsActive = false;
            this.ball.circle = null;
            this.ball.j = null;
            this.ball.i = null;
            initial_cell[i].ball = this.ball;
            if (this.count >= 1) {
                color = this.queCollor[i];
            } else {
                color = Math.floor(getRandomInRange(0, 5));
            }

            initial_cell[i].ball.tint = colors[color];
            this.ball.collor = colors[color];
            this.balls.push(initial_cell[i].ball);
            initial_cell[i].addChild(this.ball);
            this.cell.setBall(initial_cell[i], this.ball);

            this.matrixCells[initial_cell[i].j][initial_cell[i].i] = 1;
        }

        this.count += 1;
    }

    buildCircle(cell) {
        if (this.circleBall) {
            this.circleBall.circle.destroy();
            this.circleBall.circle = null;
            this.circleBall.IsActive = false;
        }
        if (cell.ball !== null) {
            this.circleBall = cell.ball;
            const circle = new Circle();
            this.circleBall.circle = circle;
            this.circleBall.i = cell.i;
            this.circleBall.j = cell.j;
            this.circleBall.IsActive = true;
            this.addChild(cell);
            this.circleBall.addChild(circle);
        } else {
            if (this.circleBall) {
                this._pathfinder(this.circleBall.i, this.circleBall.j, cell.i, cell.j);
            }
            this.circleBall = null;
        }
    }

    _pathfinder(xStart, yStart, xEnd, yEnd) {
        const grid = new PF.Grid(this.matrixCells);
        const finder = new PF.AStarFinder();
        const path = finder.findPath(xStart, yStart, xEnd, yEnd, grid);
        this._moveBall(path);
    }

    _moveBall(paths) {
        const { cell_count, queue_balls_count } = BoardConfig;
        this.matrixCells[paths[0][1]][paths[0][0]] = 0;
        this.matrixCells[paths[paths.length - 1][1]][paths[paths.length - 1][0]] = 1;

        let indexStart = paths[0][1] * cell_count + paths[0][0];
        let indexEnd = paths[paths.length - 1][1] * cell_count + paths[paths.length - 1][0];

        this.cells[indexEnd].ball = this.cells[indexStart].ball;
        this.cells[indexEnd].addChild(this.cells[indexStart].ball);
        this.cells[indexStart].ball = null;
        this.buildBalls(queue_balls_count);
        this.getBoomBall();
    }

    getBoomBall() {
        let indexI = [];
        let indexJ = [];
        let indexCell = [];
        for (let i = 0; i < this.matrixCells.length; i++) {
            let boomCollor = true;
            for (let j = 0 + 9 * i; j < this.matrixCells[0].length + 9 * i; j++) {
                if (this.cells[j].ball != null && boomCollor === true) {
                    boomCollor = this.cells[j].ball.collor;
                }
                if (this.cells[j].ball != null) {
                    console.log(indexCell.length);

                    if (boomCollor === this.cells[j].ball.collor) {
                        boomCollor = this.cells[j].ball.collor;
                        indexCell.push(this.cells[j]);
                        indexI.push(i);
                        indexJ.push(j);
                    } else {
                        if (indexCell.length >= 5) {
                            console.log(7);

                            for (let i = 0; i < indexCell.length; i++) {
                                indexCell[i].ball.destroy();
                                indexCell[i].ball = null;
                                this.matrixCells[indexI[i]][indexJ[i] % 9] = 0;
                            }
                        }
                        boomCollor = this.cells[j].ball.collor;
                        indexCell = [this.cells[j]];
                        indexI = [i];
                        indexJ = [j];
                    }
                } else {
                    if (indexCell.length >= 5) {
                        console.log(2);

                        for (let i = 0; i < indexCell.length; i++) {
                            indexCell[i].ball.destroy();
                            indexCell[i].ball = null;
                            this.matrixCells[indexI[i]][indexJ[i] % 9] = 0;
                        }
                    }

                    boomCollor = true;
                    indexCell = [];
                    indexI = [];
                    indexJ = [];
                    continue;
                }
            }

            if (indexCell.length >= 5) {
                console.log(3);

                for (let i = 0; i < indexCell.length; i++) {
                    indexCell[i].ball.destroy();
                    indexCell[i].ball = null;
                    this.matrixCells[indexI[i]][indexJ[i] % 9] = 0;
                }
            }
            boomCollor = true;
            indexCell = [];
            indexI = [];
            indexJ = [];
        }

        // for (let i = 0; i < this.matrixCells.length; i++) {
        //     boomCount = 0;
        //     for (let j = 0 + 9 * i; j < this.matrixCells[0].length + 9 * i; j++) {
        //         if (this.cells[j].ball) {
        //             boomCount += 1;
        //         } else {
        //             boomCount = 0;
        //             continue;
        //         }
        //     }
        //     if (boomCount >= 5) {
        //         console.log(boomCount);
        //     }
        // }
    }
}
