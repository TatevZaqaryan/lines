import { Application } from 'pixi.js';
import { Board } from './board/board';
import { BoardConfig } from './config';
import { GameView } from './game-view';
import { Queue } from './queue';

export class App extends Application {
    que: Queue;
    queCell: Queue;
    _board: Board;

    constructor() {
        super({
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0x333333,
            resolution: window.devicePixelRatio || 1,
        });

        document.body.appendChild(this.view);

        window.addEventListener('resize', this._onResize.bind(this));
        window.addEventListener('orientationchange', this._onOrientationChange.bind(this));

        this.loader.onComplete.add(this._onLoadComplete, this);
        this.loader.load();

        this._resize();
    }

    _onResize() {
        this._resize();
    }

    _onOrientationChange() {
        this._resize();
    }

    _onLoadComplete(): void {
        this._buildBoard();
        this.stage.addChild(new GameView());
        this.buildQueue();
    }

    _resize(width?, height?) {
        width = width || window.innerWidth;
        height = height || window.innerHeight;

        this._resizeCanvas(width, height);
        this._resizeRenderer(width, height);
    }

    _resizeCanvas(width, height) {
        const { style } = this.renderer.view;

        style.width = width + 'px';
        style.height = height + 'px';
    }

    _resizeRenderer(width, height) {
        this.renderer.resize(width, height);
    }

    _buildBoard() {
        const { initial_balls_count, cell_width, cell_line_style } = BoardConfig;
        this._board = new Board();
        this._board.buildBoard();
        //this._board.buildBalls(initial_balls_count);
        this._board.pivot.set(this._board.width * 0.5, this._board.height * 0.5);
        console.log(this.screen.width);
        console.log(this.screen.height);

        this._board.position.set(
            this.screen.width * 0.5 + (cell_width + cell_line_style) / 2,
            this.screen.height * 0.6,
        );
        this.stage.addChild(this._board);
    }

    buildQueue(): void {
        const { queue_balls_count, cell_width, cell_line_style } = BoardConfig;

        const que = new Queue();
        que.buildQueueCell();
        console.log(que.buildQueueCell());
        que.position.set(this.screen.width * 0.5 + (cell_width + cell_line_style) / 2, this.screen.height * 0.05);
        que.pivot.set(que.width * 0.5, que.height * 0.5);
        this.stage.addChild(que);
        console.log(7);
    }
}
