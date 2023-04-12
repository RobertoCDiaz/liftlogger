import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorInputComponent } from './creator-input.component';
import { FormsModule } from '@angular/forms';

describe('CreatorInputComponent', () => {
  let component: CreatorInputComponent;
  let fixture: ComponentFixture<CreatorInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [CreatorInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatorInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
