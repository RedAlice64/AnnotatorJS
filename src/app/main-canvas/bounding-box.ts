import {CanvasPoint} from './canvas-point';
import {MainCanvasComponent} from './main-canvas.component';

export class BoundingBox {
  public max_point: CanvasPoint;
  public min_point: CanvasPoint;

  public start_point: CanvasPoint;
  public end_point: CanvasPoint;

  private canvas_range: CanvasPoint;

  private is_reshape: boolean;

  private threshold = 9;

  private last_point: CanvasPoint;

  label: string;

  static getDistance(p1: CanvasPoint, p2: CanvasPoint) {
    return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
  }

  get posX() {
    return Math.min(this.end_point.x, this.start_point.x);
  }

  get posY() {
    return Math.min(this.end_point.y, this.start_point.y);
  }

  get width() {
    return Math.abs(this.end_point.x - this.start_point.x);
    // return 100;
  }

  get height() {
    return Math.abs(this.end_point.y - this.start_point.y);
    // return 100;
  }

  get style(){
    // const style = new Style();
    return 'fill:blue;stroke:pink;stroke-width:5;opacity:0.5';
  }

  constructor(private parent_canvas: MainCanvasComponent) {
    this.max_point = new CanvasPoint(100, 100);
    this.min_point = new CanvasPoint(0, 0);
    this.last_point = new CanvasPoint(-1, -1);
    this.start_point = new CanvasPoint(100, 100);
    this.end_point = new CanvasPoint(0, 0);
    this.canvas_range = new CanvasPoint(10000, 10000);
    this.label = parent_canvas.label;
    this.is_reshape = false;
  }

  onMouseDown(event: MouseEvent) {
    if (this.parent_canvas.is_drawbox) {return; }
    const p = new CanvasPoint(event.pageX, event.pageY);
    this.parent_canvas.is_mousedown = true;
    if (this.isUpperLeft(p)) {
      this.is_reshape = true;
      const neo_start = new CanvasPoint(Math.max(this.start_point.x, this.end_point.x),
        Math.max(this.start_point.y, this.end_point.y));
      const neo_end = new CanvasPoint(Math.min(this.start_point.x, this.end_point.x),
        Math.min(this.start_point.y, this.end_point.y));
      this.start_point = neo_start;
      this.end_point = neo_end;
      this.parent_canvas.current_box = this;
      this.parent_canvas.is_mousedown = true;
      this.parent_canvas.is_resize = true;
    } else if (this.isUpperRight(p)) {
      this.is_reshape = true;
      const neo_start = new CanvasPoint(Math.min(this.start_point.x, this.end_point.x),
        Math.max(this.start_point.y, this.end_point.y));
      const neo_end = new CanvasPoint(Math.max(this.start_point.x, this.end_point.x),
        Math.min(this.start_point.y, this.end_point.y));
      this.start_point = neo_start;
      this.end_point = neo_end;
      this.parent_canvas.current_box = this;
      this.parent_canvas.is_mousedown = true;
      this.parent_canvas.is_resize = true;
    } else if (this.isLowerLeft(p)) {
      this.is_reshape = true;
      const neo_start = new CanvasPoint(Math.max(this.start_point.x, this.end_point.x),
        Math.min(this.start_point.y, this.end_point.y));
      const neo_end = new CanvasPoint(Math.min(this.start_point.x, this.end_point.x),
        Math.max(this.start_point.y, this.end_point.y));
      this.start_point = neo_start;
      this.end_point = neo_end;
      this.parent_canvas.current_box = this;
      this.parent_canvas.is_mousedown = true;
      this.parent_canvas.is_resize = true;
    } else if (this.isLowerRight(p)) {
      this.is_reshape = true;
      const neo_start = new CanvasPoint(Math.min(this.start_point.x, this.end_point.x),
        Math.min(this.start_point.y, this.end_point.y));
      const neo_end = new CanvasPoint(Math.max(this.start_point.x, this.end_point.x),
        Math.max(this.start_point.y, this.end_point.y));
      this.start_point = neo_start;
      this.end_point = neo_end;
      this.parent_canvas.current_box = this;
      this.parent_canvas.is_mousedown = true;
      this.parent_canvas.is_resize = true;
    } else {
      this.is_reshape = false;
      this.last_point.x = event.pageX;
      this.last_point.y = event.pageY;
      this.parent_canvas.current_box = this;
    }
    return;
  }

  private isUpperLeft(p: CanvasPoint): boolean {
    return BoundingBox.getDistance(p, new CanvasPoint(this.posX, this.posY)) < this.threshold;
  }

  private isUpperRight(p: CanvasPoint): boolean {
    return BoundingBox.getDistance(p, new CanvasPoint(this.posX + this.width, this.posY)) < this.threshold;
  }

  private isLowerLeft(p: CanvasPoint): boolean {
    return BoundingBox.getDistance(p, new CanvasPoint(this.posX, this.posY + this.height)) < this.threshold;
  }

  private isLowerRight(p: CanvasPoint): boolean {
    return BoundingBox.getDistance(p, new CanvasPoint(this.posX + this.width, this.posY + this.height)) < this.threshold;
  }

  private validateCoords() {
    if (this.end_point.x > this.canvas_range.x) {this.end_point.x = this.canvas_range.x; }
    if (this.end_point.y > this.canvas_range.y) {this.end_point.y = this.canvas_range.y; }
    if (this.start_point.x > this.canvas_range.x) {this.start_point.x = this.canvas_range.x; }
    if (this.start_point.y > this.canvas_range.y) {this.start_point.y = this.canvas_range.y; }
    if (this.end_point.x < 0) {this.end_point.x = 0; }
    if (this.end_point.y < 0) {this.end_point.y = 0; }
    if (this.start_point.x < 0) {this.start_point.x = 0; }
    if (this.start_point.y < 0) {this.start_point.y = 0; }
  }

  onMouseMove(event: MouseEvent) {
    if (this.parent_canvas.is_drawbox) {return; }
    if (this.parent_canvas.is_mousedown) {
      if (this.is_reshape) {
        this.end_point.x = event.pageX;
        this.end_point.y = event.pageY;
      } else {
        this.end_point.x += event.pageX - this.last_point.x;
        this.end_point.y += event.pageY - this.last_point.y;
        this.start_point.x += event.pageX - this.last_point.x;
        this.start_point.y += event.pageY - this.last_point.y;
        this.last_point.x = event.pageX;
        this.last_point.y = event.pageY;
      }
    }
  }

  onMouseUp() {
    this.parent_canvas.is_mousedown = false;
    this.is_reshape = false;
    this.parent_canvas.is_mousedown = false;
    return;
  }
}
