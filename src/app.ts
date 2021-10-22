import { Application } from 'pixi.js';
import { Cell } from './board/cell';
import { GameView } from './game-view';
import { Queue } from './queue';

export class App extends Application {
    que:Queue
    queCell:Queue
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
        this.stage.addChild(new GameView());
        this.buildQueue()
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

    buildQueue() :void{
        
        const que = new Queue()
        que.buildQueueCell()
        console.log(que.buildQueueCell());
        this.stage.addChild(que);
        console.log(7);
    }
}
