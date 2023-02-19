import { Component } from '@angular/core';

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.sass']
})
export class CreateTemplateComponent {

  templateName?: string;
  templateDescription?: string;

  createTemplate(): void {
    alert(`${this.templateName} : ${this.templateDescription}`)
  }

}
