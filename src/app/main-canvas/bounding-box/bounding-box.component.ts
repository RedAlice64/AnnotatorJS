import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bounding-box',
  templateUrl: './bounding-box.component.html',
  styleUrls: ['./bounding-box.component.css']
})
export class BoundingBoxComponent implements OnInit {

  private min_point: SVGPoint;
  private max_point: SVGPoint;
  private canvas_range: SVGPoint;

  private is_reshape: boolean;
  private is_mousedown: boolean;

  private threshold = 0.1;

  private last_point: SVGPoint;

  static getDistance(p1, p2: SVGPoint) {
    return Math.sqrt((p1.x - p2.x) * (p1.x * p2.x) + (p1.y - p2.y) * (p1.y * p2.y));
  }

  get posX() {
    return this.min_point.x;
  }

  get posY() {
    return this.min_point.y;
  }

  get width() {
    return this.max_point.x - this.min_point.x;
  }

  get height() {
    return this.max_point.y - this.min_point.y;
  }

  constructor() {
    this.max_point = new SVGPoint();
    this.min_point = new SVGPoint();
  }

  test() {
    this.max_point.x = this.max_point.y = 100;
    this.min_point.x = this.min_point.y = 10;
  }

  ngOnInit() {
  }

  onMouseDown(event: MouseEvent) {
    const p = new SVGPoint();
    p.x = event.clientX;
    p.y = event.clientY;
    this.is_mousedown = true;
    if (this.isCorner(p)) {
      this.is_reshape = true;
      this.last_point.x = event.clientX;
      this.last_point.y = event.clientY;
    } else {
      this.is_reshape = false;
    }
    return;
  }

  private isCorner(p: SVGPoint): boolean {
    if (BoundingBoxComponent.getDistance(p, this.min_point) < this.threshold) {return true; }
    if (BoundingBoxComponent.getDistance(p, this.max_point) < this.threshold) {return true; }
    const bottom_left = new SVGPoint();
    bottom_left.x = this.min_point.x;
    bottom_left.y = this.max_point.y;
    const upper_right = new SVGPoint();
    upper_right.x = this.max_point.x;
    upper_right.y = this.min_point.y;
    if (BoundingBoxComponent.getDistance(p, bottom_left) < this.threshold) {return true; }
    return BoundingBoxComponent.getDistance(p, upper_right) < this.threshold;
  }

  private validateCoords() {
    if (this.max_point.x > this.canvas_range.x) {this.max_point.x = this.canvas_range.x; }
    if (this.max_point.y > this.canvas_range.y) {this.max_point.y = this.canvas_range.y; }
    if (this.min_point.x < 0) {this.min_point.x = 0; }
    if (this.min_point.y < 0) {this.min_point.y = 0; }
  }

  onMouseMove(event: MouseEvent) {
    if (this.is_mousedown) {
      if (this.is_reshape) {
        // TODO Change the reshape scheme!!!
        this.max_point.x = Math.max(this.max_point.x, event.clientX);
        this.max_point.y = Math.max(this.max_point.y, event.clientY);
        this.min_point.x = Math.min(this.min_point.x, event.clientX);
        this.min_point.y = Math.max(this.min_point.y, event.clientY);
      } else {
        this.max_point.x += event.clientX - this.last_point.x;
        this.max_point.y += event.clientY - this.last_point.y;
        this.min_point.x += event.clientX - this.last_point.x;
        this.min_point.y += event.clientY - this.last_point.y;
        this.last_point.x = event.clientX;
        this.last_point.y = event.clientY;
      }
      this.validateCoords();
    }
    return;
  }

  onMouseUp() {
    this.is_mousedown = false;
    this.is_reshape = false;
    return;
  }
}
