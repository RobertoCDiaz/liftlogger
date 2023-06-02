import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Template } from 'src/app/models/TemplateModel';
import { TemplatesService } from 'src/app/services/templates.service';

@Component({
  selector: 'app-templates-library',
  templateUrl: './templates-library.component.html',
  styleUrls: ['./templates-library.component.sass'],
})
export class TemplatesLibraryComponent implements OnInit {
  templatesService: TemplatesService = inject(TemplatesService);

  /**
   * List of Templates to display in the library.
   */
  templates$: Observable<Template[]>;

  ngOnInit(): void {
    this.templates$ = this.templatesService.getUserTemplates();
  }
}
