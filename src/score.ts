import {Text } from 'pixi.js';

export class Score extends Text {
    constructor(){
        super();
    }
    
    getScore(){
        console.warn(7);
        let score = 0
        // const style = new TextStyle({
        //     fontSize: 36
        // })
        console.log(Score);
        
        const basicText = new Text(`High score: ${score}`);
        console.log(basicText);
        

        basicText.pivot.x =  basicText.width/2;
        basicText.pivot.y =  basicText.height/2;

        this.addChild(basicText);
        

        buildScore():void{
            const { queue_balls_count, cell_width, cell_line_style } = BoardConfig;
    
            const score = new Score();
            score.position.set(this.screen.width * 0.5, this.screen.height * 0.15);
            console.log(score.getScore());
            
            this.stage.addChild(score);
        }
    }
}