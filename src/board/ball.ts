import { Graphics } from 'pixi.js';
import { BoardConfig } from '../config';

export class Ball extends Graphics {
    constructor() {
        super();
    }

    buildBall() {
        const { ball_width } = BoardConfig;

        this.beginFill(0xffffff);
        this.drawCircle(0, 0, ball_width);
        this.endFill();
    }
}
