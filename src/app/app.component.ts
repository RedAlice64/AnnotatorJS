import {Component, OnInit, ViewChild} from '@angular/core';
import { GoogleStorageService } from './google-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GoogleStorageService],
})
export class AppComponent implements OnInit {

  title = 'app works!';
  img = '';
  img_width = 0;
  img_height = 0;
  img_list = [];
  category_list = [];
  category_selected = '';
  filename = '';
  label = '';
  is_draw = false;

  @ViewChild('canvas') canvas;

  ngOnInit(): void {
    this.googleStorage.getImg('ingredients-dataset/sliced_carrot/Images/000001.jpg').then(img => {
      this.img = 'data:image/jpg;base64,' + img;
    });
    this.googleStorage.getCategoryList().then( categories => {
      this.category_list = categories;
    });
    if (this.category_list.length > 0) {
      this.googleStorage.getImgList('raw_chicken_breast').then( image_list => this.img_list = image_list);
      this.title = this.img_list.toString();
    }
  }

  constructor(private googleStorage: GoogleStorageService) { }

  onImageSelect(image_selected: string) {
    this.filename = image_selected;
    this.googleStorage.getImg(image_selected).then(img => {
      this.img = 'data:image/jpg;base64,' + img;
    });
    const temp_image = new Image();
    temp_image.src = this.img;
    temp_image.onload = ev => {
      this.img_width = temp_image.width;
      this.img_height = temp_image.height;
    };
    this.canvas.clearBox();
    this.googleStorage.loadXML(this.XMLFilename).then( result => this.canvas.loadBoxes(result.annotation.object));
  }

  onCategorySelect(category_selected: string) {
    this.googleStorage.getImgList(category_selected).then(image_list => this.img_list = image_list);
    this.label = category_selected;
  }

  onLabelSelect(label_selected: string) {
    this.label = label_selected;
  }

  onBoxSwitchDraw(is_draw: boolean) {
    this.is_draw = is_draw;
  }

  saveBoundingBoxes() {
    const parts = this.filename.split('/');
    const tail = parts[parts.length - 1];
    const folder = parts[parts.length - 3];
    const fname = tail.split('.')[0];

    const boxes_list = [];
    for ( const box of this.canvas.boxes){
      boxes_list.push({name: box.label,
        pose: 'Unspecified',
        truncated: 0,
        difficult: 0,
        bndbox: {xmin: box.posX, ymin: box.posY,
          xmax: box.posX + box.width, ymax: box.posY + box.height}});
    }

    const body = {
      annotation: {
        // "-verified": 'no',
        folder: folder,
        filename: fname,
        path: this.filename,
        source: { database: 'Unknown' },
        size: {
          width: this.img_width,
          height: this.img_height,
          depth: 3
        },
        segmented: 0,
        object: boxes_list
      }
    };

    parts[parts.length - 2] = 'Annotations';
    const split_name = tail.split('.');
    split_name[1] = 'xml';
    parts[parts.length - 1] = split_name.join('.');
    const xml_filename = parts.join('/');

    this.googleStorage.saveXML(body, xml_filename).then();
  }

  get XMLFilename(): string {
    const parts = this.filename.split('/');
    const tail = parts[parts.length - 1];
    parts[parts.length - 2] = 'Annotations';
    const split_name = tail.split('.');
    split_name[1] = 'xml';
    parts[parts.length - 1] = split_name.join('.');

    return parts.join('/');
  }
}
