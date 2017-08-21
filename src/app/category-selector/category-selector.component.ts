import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.css'],
})
export class CategorySelectorComponent implements OnInit {

  @Input() options: string[];

  @Output() onSelect = new EventEmitter<string>();

  constructor() {
    this.options = [];
  }

  ngOnInit() { }

  onChange(category_name: string) {
    this.onSelect.emit(category_name);
  }
}
