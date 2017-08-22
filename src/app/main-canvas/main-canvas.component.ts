import {Component, Input, OnInit} from '@angular/core';
import {BoundingBox} from './bounding-box';

@Component({
  selector: 'app-main-canvas',
  templateUrl: './main-canvas.component.html',
  styleUrls: ['./main-canvas.component.css']
})
export class MainCanvasComponent implements OnInit {

  @Input() img = '';
  @Input() img_width = 0;
  @Input() img_height = 0;
  @Input() label = '';
  @Input() is_drawbox = false;

  boxes: BoundingBox[];

  current_box: BoundingBox;

  is_mousedown: boolean;
  is_resize: boolean;


  constructor() { }

  ngOnInit() {
    this.boxes = [];
    this.is_mousedown = false;
    this.is_drawbox = false;
    this.is_resize = false;
  }

  onMouseDown(event: MouseEvent) {
    if (this.is_drawbox) {
      this.current_box = new BoundingBox(this);
      this.current_box.start_point.x = this.current_box.end_point.x = event.pageX;
      this.current_box.start_point.y = this.current_box.end_point.y = event.pageY;
    }
    this.is_mousedown = true;
  }

  onMouseUp() {
    this.is_mousedown = false;
    if (this.is_drawbox) {this.boxes.push(this.current_box); }
    this.is_resize = false;
  }

  onMouseMove(event: MouseEvent) {
    if (this.is_mousedown && (this.is_resize || this.is_drawbox)) {
      this.current_box.end_point.x = event.pageX;
      this.current_box.end_point.y = event.pageY;
    }
  }

  deleteBox() {
    if (this.current_box) {
      const index = this.boxes.indexOf(this.current_box);
      if (index !== 0) {this.boxes.splice(index, index); } else {this.boxes.shift(); }
      this.current_box = null;
    }
  }

  clearBox() {
    this.boxes = [];
    this.current_box = null;
  }

  loadBoxes(big_object: any) {
    this.clearBox();
    for (const obj of big_object) {
      const tbox = new BoundingBox(this);
      tbox.start_point.x = obj.bndbox[0].xmin[0];
      tbox.start_point.y = obj.bndbox[0].ymin[0];
      tbox.end_point.x = obj.bndbox[0].xmax[0];
      tbox.end_point.y = obj.bndbox[0].ymax[0];
      tbox.label = obj.name[0];
      this.boxes.push(tbox);
    }
  }
}
