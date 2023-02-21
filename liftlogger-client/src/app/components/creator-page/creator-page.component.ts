import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-creator-page',
  templateUrl: './creator-page.component.html',
  styleUrls: ['./creator-page.component.sass']
})
export class CreatorPageComponent {

  @Input() title: String = '$title';
  @Input() inputTitle: String = '$inputTitle';

}
