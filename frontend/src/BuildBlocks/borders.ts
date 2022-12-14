
import P5, { Vector } from 'p5';
import HALF_PI from 'p5';
import Entity, { EntityInterface } from '../Entities/entity';
import { config, globals } from '../utils/singletons';


type check_type = 'void' | 'empty' | 'empty_or_void';

interface BorderInterface extends EntityInterface{
    size: number;
    _neighbors: Array<number>;
    _top: boolean;
    _bottom: boolean;
    _left: boolean;
    _right: boolean;
    _outer_tr: boolean;
    _outer_br: boolean;
    _outer_bl: boolean;
    _outer_tl: boolean;
    _inner_tr: boolean;
    _inner_br: boolean;
    _inner_bl: boolean;
    _inner_tl: boolean;
    _horizontal_left: boolean;
    _horizontal_right: boolean;
    _vertical_top: boolean;
    _vertical_bottom: boolean;
    _single: boolean;
    _tr: boolean;
    _br: boolean;
    _bl: boolean;
    _tl: boolean;
    _horizontal: boolean;
    _horizontal_top: boolean;
    _horizontal_bottom: boolean;
    _vertical: boolean;
    _vertical_right: boolean;
    _vertical_left: boolean;
    _void_top: boolean;
    _void_bottom: boolean;
    _void_right: boolean;
    _void_left: boolean;
    _void_outer_tr: boolean;
    _void_outer_br: boolean;
    _void_outer_bl: boolean;
    _void_outer_tl: boolean;
    _void_inner_tr: boolean;
    _void_inner_br: boolean;
    _void_inner_bl: boolean;
    _void_inner_tl: boolean;
    isSat(border: Array<number>, no_border: Array<number>, check: check_type) : boolean;
    setNeighbors(neighbors: Array<number>) : void;
}

class Border extends Entity implements BorderInterface {
    size: number;
    _top: boolean = false;
    _bottom: boolean = false;
    _left: boolean = false;
    _right: boolean = false;
    _neighbors: Array<number> = [];
    _outer_tr: boolean;
    _outer_br: boolean;
    _outer_bl: boolean;
    _outer_tl: boolean;
    _inner_tr: boolean;
    _inner_br: boolean;
    _inner_bl: boolean;
    _inner_tl: boolean;
    _horizontal_left: boolean;
    _horizontal_right: boolean;
    _vertical_top: boolean;
    _vertical_bottom: boolean;
    _single: boolean;
    _tr: boolean;
    _br: boolean;
    _bl: boolean;
    _tl: boolean;
    _horizontal: boolean;
    _horizontal_top: boolean;
    _horizontal_bottom: boolean;
    _vertical: boolean;
    _vertical_right: boolean;
    _vertical_left: boolean;
    _void_top: boolean;
    _void_bottom: boolean;
    _void_right: boolean;
    _void_left: boolean;
    _void_outer_tr: boolean;
    _void_outer_br: boolean;
    _void_outer_bl: boolean;
    _void_outer_tl: boolean;
    _void_inner_tr: boolean;
    _void_inner_br: boolean;
    _void_inner_bl: boolean;
    _void_inner_tl: boolean;
    constructor(atPosition: Vector) {
        super(atPosition.x, atPosition.y);
        this.size = config.gridSize;
    }

    isSat(border: Array<number>, no_border: Array<number>, check: check_type) {
        for (let i of border) {
            if (this._neighbors[i] != 1) {
                return false;
            }
        }
        if (check === 'empty_or_void') {
            for (let i of  no_border) {
                if (this._neighbors[i] == 1) {
                    return false;
                }
            }
        } else if (check === 'void') {
            for (let i of  no_border) {
                if (this._neighbors[i] != -1) {
                    return false;
                }
            }
        } else if (check === 'empty') {
            for (let i of  no_border) {
                if (this._neighbors[i] != 0) {
                    return false;
                }
            }
        }
        return true;
    }

    //   7  0  4
    //   3     1
    //   6  2  5
    setNeighbors(neighbors : Array<number>) {
        this._neighbors = neighbors;

        if (globals.borderDrawing == 'simple') {
            this._top = this.isSat([3, 1], [0], 'empty_or_void');
            this._bottom = this.isSat([3, 1], [2], 'empty_or_void');
            this._right = this.isSat([0, 2], [1], 'empty_or_void');
            this._left = this.isSat([0, 2], [3], 'empty_or_void');

            this._outer_tr = this.isSat([2, 3],[0, 1], 'empty_or_void');
            this._outer_br = this.isSat([0, 3],[1, 2], 'empty_or_void');
            this._outer_bl = this.isSat([0, 1],[2, 3], 'empty_or_void');
            this._outer_tl = this.isSat([1, 2],[3, 0], 'empty_or_void');

            this._inner_tr = this.isSat([0, 1],[4], 'empty_or_void');
            this._inner_br = this.isSat([1, 2],[5], 'empty_or_void');
            this._inner_bl = this.isSat([3, 2],[6], 'empty_or_void');
            this._inner_tl = this.isSat([0, 3],[7], 'empty_or_void');

            this._horizontal_left = this.isSat([3], [0, 1, 2], 'empty_or_void') || (this.isSat([1], [0, 2], 'empty_or_void') && this.isSat([], [3], 'void'));
            this._horizontal_right = this.isSat([1], [0, 3, 2], 'empty_or_void') || (this.isSat([3], [0, 2], 'empty_or_void') && this.isSat([], [1], 'void'));

            this._vertical_top = this.isSat([0], [1, 2, 3], 'empty_or_void') || (this.isSat([2], [1, 3], 'empty_or_void') && this.isSat([], [0], 'void'));
            this._vertical_bottom = this.isSat([2], [1, 0, 3], 'empty_or_void') || (this.isSat([0], [1, 3], 'empty_or_void') && this.isSat([], [2], 'void'));

            this._single = this.isSat([], [0, 1, 2, 3], 'empty_or_void');
        } else if (globals.borderDrawing == 'original') {
            this._tr = this.isSat([3, 2],[6], 'empty') || this.isSat([2, 3],[0, 1], 'empty');
            this._br = this.isSat([0, 3],[7], 'empty') || this.isSat([0, 3],[1, 2], 'empty');
            this._bl = this.isSat([0, 1],[4], 'empty') || this.isSat([0, 1],[2, 3], 'empty');
            this._tl = this.isSat([1, 2],[5], 'empty') || this.isSat([1, 2],[3, 0], 'empty');
    
            this._horizontal = this.isSat([1], [0, 3, 2], 'empty_or_void') || this.isSat([3], [0, 1, 2], 'empty_or_void') || this.isSat([3, 1], [0], 'empty') || this.isSat([3, 1], [2], 'empty');
            this._horizontal_top = this._horizontal && this.isSat([], [0], 'void');
            this._horizontal_bottom = this._horizontal && this.isSat([], [2], 'void');
            if (this._horizontal_top && this._horizontal_bottom) this._horizontal = false;
            this._horizontal_left = this._horizontal && (this.isSat([3], [], 'empty_or_void') || this.isSat([], [3], 'void'));
            this._horizontal_right = this._horizontal && (this.isSat([1], [], 'empty_or_void') || this.isSat([], [1], 'void'));
    
            this._vertical = this.isSat([0], [1, 2, 3], 'empty_or_void') || this.isSat([2], [1, 0, 3], 'empty_or_void') || this.isSat([0, 2], [1], 'empty') || this.isSat([0, 2], [3], 'empty');
            this._vertical_right = this._vertical && this.isSat([], [1], 'void');
            this._vertical_left = this._vertical && this.isSat([], [3], 'void');
            if (this._vertical_right && this._vertical_left) this._vertical = false;
            this._vertical_top = this._vertical && (this.isSat([0], [], 'empty_or_void') || this.isSat([], [0], 'void'));
            this._vertical_bottom = this._vertical && (this.isSat([2], [], 'empty_or_void') || this.isSat([], [2], 'void'));
    
            this._single = this.isSat([], [0, 1, 2, 3], 'empty_or_void');
    
            this._void_top = this.isSat([3, 1], [0], 'void');
            this._void_bottom = this.isSat([3, 1], [2], 'void');
            this._void_right = this.isSat([0, 2], [1], 'void');
            this._void_left = this.isSat([0, 2], [3], 'void');
    
            this._void_outer_tr = this.isSat([2, 3],[0, 1], 'void');
            this._void_outer_br = this.isSat([0, 3],[1, 2], 'void');
            this._void_outer_bl = this.isSat([0, 1],[2, 3], 'void');
            this._void_outer_tl = this.isSat([1, 2],[3, 0], 'void');
    
            this._void_inner_tr = this.isSat([0, 1],[4], 'void');
            this._void_inner_br = this.isSat([1, 2],[5], 'void');
            this._void_inner_bl = this.isSat([3, 2],[6], 'void');
            this._void_inner_tl = this.isSat([0, 3],[7], 'void');
        }
    }
    

    draw(p5: P5) {

        p5.push();

        p5.translate(this.pos.x * config.gridSize, this.pos.y * config.gridSize);
        if (globals.debug) {
            p5.noStroke();
            p5.fill(64, 64, 255, 64);
            p5.rect(0, 0, this.size, this.size);
        }
        p5.noFill();
        p5.strokeWeight(4);
        p5.stroke(64, 64, 255);

        let size = this.size;

        if (globals.borderDrawing == 'simple') {
            let padding = size / 3;

            if (this._top) {
                p5.line(0, padding, size, padding);
            }
            if (this._bottom) {
                p5.line(0, size - padding, size, size - padding);
            }
            if (this._right) {
                p5.line(size - padding, 0, size - padding, size);
            }
            if (this._left) {
                p5.line(padding, 0, padding, size);
            }

            if (this._horizontal_left) {
                p5.line(0, padding, size / 2, padding);
                p5.line(0, size - padding, size / 2, size - padding);
                if (!this._horizontal_right) {
                    p5.arc(size / 2, size / 2, size - padding * 2, size - padding * 2, 3 * p5.HALF_PI, p5.HALF_PI)
                }
            }
            if (this._horizontal_right) {
                p5.line(size / 2, padding, size, padding);
                p5.line(size / 2, size - padding, size, size - padding);
                if (!this._horizontal_left) {
                    p5.arc(size / 2, size / 2, size - padding * 2, size - padding * 2, p5.HALF_PI, 3 * p5.HALF_PI)
                }
            }
            if (this._vertical_top) {
                p5.line(size - padding, 0, size - padding, size / 2);
                p5.line(padding, 0, padding, size / 2);
                if (!this._vertical_bottom) {
                    p5.arc(size / 2, size / 2, size - padding * 2, size - padding * 2, 0, 2 * p5.HALF_PI)
                }
            }
            if (this._vertical_bottom) {
                p5.line(size - padding, size / 2, size - padding, size);
                p5.line(padding, size / 2, padding, size);
                if (!this._vertical_top) {
                    p5.arc(size / 2, size / 2, size - padding * 2, size - padding * 2, 2 * p5.HALF_PI, 0)
                }
            }

            p5.noFill();

            if (this._outer_tr) {
                p5.arc(0, size, (size - padding) * 2, (size - padding) * 2, 3 * p5.HALF_PI, 0);
            }
            if (this._outer_br) {
                p5.arc(0, 0, (size - padding) * 2, (size - padding) * 2, 0, p5.HALF_PI);
            }
            if (this._outer_bl) {
                p5.arc(size, 0, (size - padding) * 2, (size - padding) * 2, p5.HALF_PI, 2 * p5.HALF_PI);
            }
            if (this._outer_tl) {
                p5.arc(size, size, (size - padding) * 2, (size - padding) * 2, 2 * p5.HALF_PI, 3 * p5.HALF_PI);
            }


            if (this._inner_tr) {
                p5.arc(size, 0, padding * 2, padding * 2, p5.HALF_PI, 2 * p5.HALF_PI);
            }
            if (this._inner_br) {
                p5.arc(size, size, padding * 2, padding * 2, 2 * p5.HALF_PI, 3 * p5.HALF_PI);
            }
            if (this._inner_bl) {
                p5.arc(0, size, padding * 2, padding * 2, 3 * p5.HALF_PI, 0);
            }
            if (this._inner_tl) {
                p5.arc(0, 0, padding * 2, padding * 2, 0, p5.HALF_PI);
            }

            if (this._single) {
                p5.arc(size / 2, size / 2, size - padding * 2, size - padding * 2, 0, p5.TWO_PI)
            }
        } else if (globals.borderDrawing == 'original') {
            let padding = size / 2;
    
            if (this._horizontal_left) {
                p5.line(0, padding, size / 2, padding);
            }
            if (this._horizontal_right) {
                p5.line(size / 2, padding, size, padding);
            }
            if (this._vertical_top) {
                p5.line(size - padding, 0, size - padding, size / 2);
            }
            if (this._vertical_bottom) {
                p5.line(size - padding, size / 2, size - padding, size);
            }
    
            if (this._tr) {
                p5.arc(0, size, padding * 2, padding * 2, 3 * p5.HALF_PI, 0);
            }
            if (this._br) {
                p5.arc(0, 0, padding * 2, padding * 2, 0, p5.HALF_PI);
            }
            if (this._bl) {
                p5.arc(size, 0, padding * 2, padding * 2, p5.HALF_PI, 2 * p5.HALF_PI);
            }
            if (this._tl) {
                p5.arc(size, size, padding * 2, padding * 2, 2 * p5.HALF_PI, 3 * p5.HALF_PI);
            }
    
    
            padding = this.size / 3;
    
            if (this._single) {
                p5.arc(size / 2, size / 2, size - padding * 2, size - padding * 2, 0, p5.TWO_PI);
            }
    
    
            padding = 2;
    
            if (this._void_top || this._horizontal_top) {
                p5.line(0, padding, size, padding);
            }
            if (this._void_bottom || this._horizontal_bottom) {
                p5.line(0, size - padding, size, size - padding);
            }
            if (this._void_right || this._vertical_right) {
                p5.line(size - padding, 0, size - padding, size);
            }
            if (this._void_left || this._vertical_left) {
                p5.line(padding, 0, padding, size);
            }
    
            if (this._void_outer_tr) {
                p5.arc(0, size, (size - padding) * 2, (size - padding) * 2, 3 * p5.HALF_PI, 0);
            }
            if (this._void_outer_br) {
                p5.arc(0, 0, (size - padding) * 2, (size - padding) * 2, 0, p5.HALF_PI);
            }
            if (this._void_outer_bl) {
                p5.arc(size, 0, (size - padding) * 2, (size - padding) * 2, p5.HALF_PI, 2 * p5.HALF_PI);
            }
            if (this._void_outer_tl) {
                p5.arc(size, size, (size - padding) * 2, (size - padding) * 2, 2 * p5.HALF_PI, 3 * p5.HALF_PI);
            }
    
            if (this._void_inner_tr) {
                p5.arc(size, 0, padding * 2, padding * 2, p5.HALF_PI, 2 * p5.HALF_PI);
            }
            if (this._void_inner_br) {
                p5.arc(size, size, padding * 2, padding * 2, 2 * p5.HALF_PI, 3 * p5.HALF_PI);
            }
            if (this._void_inner_bl) {
                p5.arc(0, size, padding * 2, padding * 2, 3 * p5.HALF_PI, 0);
            }
            if (this._void_inner_tl) {
                p5.arc(0, 0, padding * 2, padding * 2, 0, p5.HALF_PI);
            }
        }
        p5.pop();
    }
}

export default Border;