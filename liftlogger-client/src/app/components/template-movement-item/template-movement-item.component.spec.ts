import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateMovementItemComponent } from './template-movement-item.component';

describe('TemplateMovementItemComponent', () => {
  let component: TemplateMovementItemComponent;
  let fixture: ComponentFixture<TemplateMovementItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TemplateMovementItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TemplateMovementItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
