import { Text, TextStyle } from 'pixi.js';

export class Score extends Text {
    constructor() {
        super(`High score: 0`, {
            fontSize: 20,
            fill: ['#ffffff', '#666666'],
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 3,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 5,
        });
    }

    getScore() {
        // console.warn(7);
        // let score = 0
        // const style = new TextStyle({
        //     fontSize: 20,
        //     fill: ['#ffffff', '#666666'],
        //     dropShadow: true,
        //     dropShadowColor: '#000000',
        //     dropShadowBlur: 3,
        //     dropShadowAngle: Math.PI / 6,
        //     dropShadowDistance: 5,
        //       })
        //            console.log(Score);
        // console.log(this);
        // const basicText = new Text()
        // console.log(basicText);
        // basicText.text =`High score: ${score}00`
        // basicText.style = style
        // basicText.pivot.x =  basicText.width/2;
        // basicText.pivot.y =  basicText.height/2;
        // this.addChild(basicText);
    }
}
