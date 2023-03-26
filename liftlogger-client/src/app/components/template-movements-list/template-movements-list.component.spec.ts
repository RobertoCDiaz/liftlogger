import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateMovementsListComponent } from './template-movements-list.component';

describe('TemplateMovementsListComponent', () => {
  let component: TemplateMovementsListComponent;
  let fixture: ComponentFixture<TemplateMovementsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TemplateMovementsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TemplateMovementsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
