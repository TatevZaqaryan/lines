import { Application } from 'pixi.js';
import { Board } from './board/board';
import { BoardConfig } from './config';
import { GameView } from './game-view';

export class App extends Application {
    _board: Board;
    constructor() {
        super({
            backgroundColor: 0x626262,
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
    }
    _buildBoard() {
        const { initial_balls_count, cell_width, cell_line_style } = BoardConfig;
        this._board = new Board();
        this._board.buildBoard();
        //this._board.buildBalls(initial_balls_count);
        this._board.position.set(
            this.screen.width * 0.5 + (cell_width + cell_line_style) / 2,
            this.screen.height * 0.6,
        );
        this._board.pivot.set(this._board.width * 0.5, this._board.height * 0.5);
        this.stage.addChild(this._board);
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
}
