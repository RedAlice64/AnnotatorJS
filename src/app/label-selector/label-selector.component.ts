import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-label-selector',
  templateUrl: './label-selector.component.html',
  styleUrls: ['./label-selector.component.css']
})
export class LabelSelectorComponent implements OnInit {

  @Output() onSelect = new EventEmitter<string>();

  @Input() labels: string[];

  constructor() {
    this.labels = [];
  }

  ngOnInit() {
  }

  onChange(label: string) {
    this.onSelect.emit(label);
  }
}
