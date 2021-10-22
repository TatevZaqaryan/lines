import { Container } from 'pixi.js';
import { Cell } from './board/cell';
// import { Ball } from './board/ball';
import { BoardConfig } from './config';


export class Queue extends Container {
    i:number
    queueCells:Cell[]
    constructor() {
      super();
      this.queueCells = [];
    }

    buildQueueCell():void {
        const { queue_balls_count, cell_width, cell_line_style } = BoardConfig;
    
        for (let i = 0; i < queue_balls_count; i++) {
          const queueCell = new Cell(queue_balls_count,0);
        //   queueCell.ball = null;
        console.log(queueCell);
        
          queueCell.i = i;
          queueCell.buildCell(cell_line_style);
          queueCell.position.set(queueCell.i * (cell_width + 1), cell_width);
          queueCell.tint = 0x555555;
          this.queueCells.push(queueCell);
          this.addChild(queueCell);
        }
    }
}