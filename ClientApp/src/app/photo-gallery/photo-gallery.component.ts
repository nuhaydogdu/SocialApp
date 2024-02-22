import { Component, Input } from '@angular/core';
import { image } from '../_models/image';

@Component({
  selector: 'photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.css']
})
export class PhotoGalleryComponent {

  @Input() images: image[];

  constructor(){
    this.images= [];
  }
}
