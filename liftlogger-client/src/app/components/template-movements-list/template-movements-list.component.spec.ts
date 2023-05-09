import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateMovementsListComponent } from './template-movements-list.component';
import { ButtonComponent } from '../button/button.component';
import { TemplateMovementItemComponent } from '../template-movement-item/template-movement-item.component';

describe('TemplateMovementsListComponent', () => {
  let component: TemplateMovementsListComponent;
  let fixture: ComponentFixture<TemplateMovementsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TemplateMovementsListComponent,
        ButtonComponent,
        TemplateMovementItemComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TemplateMovementsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
