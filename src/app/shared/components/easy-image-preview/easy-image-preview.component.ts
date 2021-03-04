import { Component, Input } from '@angular/core';

@Component({
  selector: 'easy-image-preview',
  templateUrl: './easy-image-preview.component.html',
  styleUrls: ['./easy-image-preview.component.sass']
})
export class EasyImagePreviewComponent {
  @Input() url: string;
}
