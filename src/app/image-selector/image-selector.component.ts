import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css']
})
export class ImageSelectorComponent implements OnInit {

  @Input() img_list: string[];
  @Output() onSelect = new EventEmitter<string>();
  @Output() onSwitchDraw = new EventEmitter<boolean>();
  @Output() onDelete = new EventEmitter();
  @Output() onSave = new EventEmitter();

  @ViewChild('select') select_panel;

  private index: number;

  constructor() {
    this.index = 0;
    this.img_list = [];
    this.img_list.push('test');
  }

  ngOnInit() { }

  onChange(image_name: string) {
    this.onSelect.emit(image_name);
    // this.index = this.select_panel.selectedIndex;
  }

  clickNext() {
    if (this.index < this.img_list.length - 1) {
      this.select_panel.nativeElement.selectedIndex = this.index++;
      this.onSelect.emit(this.img_list[this.index]);
    }
  }

  clickPrev() {
    if (this.index > 0) {
      this.index--;
      this.onSelect.emit(this.img_list[this.index]);
    }
    this.select_panel.nativeElement.selectedIndex = this.index;
  }

  switchDraw() {
    this.onSwitchDraw.emit(true);
  }

  switchResize() {
    this.onSwitchDraw.emit(false);
  }

  deleteBox() {
    this.onDelete.emit();
  }

  saveBoxes() {
    this.onSave.emit();
  }
}
