import P5, { Color, Vector } from "p5";
import { LAMA_SMOOTHNESS } from "..";
import { config, globals } from "../utils/singletons";
import Entity, { EntityInterface } from "./entity";
import { LamaInterface } from "./lama";

interface CollectibleInterface extends EntityInterface {
    width: number;
    height: number;
    color: string;
}

class Collectible extends Entity implements CollectibleInterface {
    width: number;
    height: number;
    color: string;
    constructor(x:number, y:number, width:number, height:number, color: string){
        super(x,y);
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw(p5: P5){
        p5.push();
        p5.translate(this.pos.x * config.gridSize, this.pos.y * config.gridSize);
        p5.fill(this.color);
        p5.ellipse(config.gridSize/2, config.gridSize/2 , this.width, this.height);
        p5.pop();
    }



    isColliding(pos: Vector, size: number, dir: Vector) {
        const actualPosition = new Vector(this.pos.x + config.gridSize/2, this.pos.y + config.gridSize/2);
        const actualOtherPosition = new Vector(pos.x + config.gridSize/2, pos.y + config.gridSize/2);
        const radius = this.width/2;
        const distance = actualPosition.dist(actualOtherPosition);
        return distance < radius+config.gridSize/2+LAMA_SMOOTHNESS.toFloat();
    }
}

Collectible.prototype.toJSON = function(){
    return {
        x: this.pos.x,
        y: this.pos.y,
        width: this.width,
        height: this.height,
        color: this.color
    }
}

export class Cookie extends Collectible{
    constructor(x: number, y:number){
        super(x, y,10, 10, "orange" );
    }

        onCollision(other: EntityInterface) {
            if (other.constructor.name == "Lama" || other.constructor.name == "LamaAgent") {
                (other as LamaInterface).points++;
                globals.game.getInstance().map[this.pos.x][this.pos.y] = null;
                globals.game.getInstance().cookies--;
            }
        }
}

export class Power extends Collectible{
    constructor(x:number, y:number){
        super(x, y, 20,20 ,"purple");
    }

        onCollision(other: EntityInterface) {
            if (other.constructor.name == "Lama" || other.constructor.name == "LamaAgent") {
                (other as LamaInterface).points+= 50;
                globals.game.getInstance().map[this.pos.x][this.pos.y] = null;
                globals.game.getInstance().lama.powerUp();
                globals.game.getInstance().pinky && globals.game.getInstance().pinky.flee()
                globals.game.getInstance().inky && globals.game.getInstance().inky.flee()
                globals.game.getInstance().clyde && globals.game.getInstance().clyde.flee()
                globals.game.getInstance().blinky && globals.game.getInstance().blinky.flee()
            }
        }
}

export default Collectible;