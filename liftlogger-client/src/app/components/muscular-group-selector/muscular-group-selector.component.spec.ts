import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuscularGroupSelectorComponent } from './muscular-group-selector.component';
import { AppModule } from 'src/app/app.module';

describe('MuscularGroupSelectorComponent', () => {
  let component: MuscularGroupSelectorComponent;
  let fixture: ComponentFixture<MuscularGroupSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MuscularGroupSelectorComponent],
      imports: [AppModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MuscularGroupSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
