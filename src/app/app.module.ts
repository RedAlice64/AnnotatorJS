import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MainCanvasComponent } from './main-canvas/main-canvas.component';
import { ImageSelectorComponent } from './image-selector/image-selector.component';
import { CategorySelectorComponent } from './category-selector/category-selector.component';
import { LabelSelectorComponent } from './label-selector/label-selector.component';
import { SafePipe } from './main-canvas/safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainCanvasComponent,
    ImageSelectorComponent,
    CategorySelectorComponent,
    LabelSelectorComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [SafePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
