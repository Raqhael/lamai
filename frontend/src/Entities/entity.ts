import P5, { Vector } from "p5";
import { Coordinates } from './../types/maps';

export interface EntityInterface {
    pos: Vector;
    toJSON(): any;
    onCollision(other: Entity): void;
    isColliding(pos:Vector, size:number, dir:Vector): boolean;
    draw(p5: P5): void;
    drawDebug(p5: P5): void;
    deserializeCoords(): Coordinates;
}

class Entity implements EntityInterface {
    pos: Vector;
    constructor(x: number, y: number){
        this.pos = new Vector(x,y);
    }
    drawDebug(p5: P5): void {
        
    }

    draw(p5: P5){

    }  

    deserializeCoords(){
        return {
            x: this.pos.x,
            y: this.pos.y
        }
    }

    onCollision(other:Entity){
        // ("Collision", other)
    }

    isColliding(pos: Vector, size: number, dir: Vector){
        return pos.x + dir.x < this.pos.x + size && pos.x + dir.x + size > this.pos.x && pos.y + dir.y < this.pos.y + size && pos.y + dir.y + size > this.pos.y;
    }

    toJSON(){
        return {
            x: this.pos.x,
            y: this.pos.y
        }
    }

}

export default Entity;