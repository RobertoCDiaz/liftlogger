import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorPageComponent } from './creator-page.component';
import { AppModule } from 'src/app/app.module';

describe('CreatorPageComponent', () => {
  let component: CreatorPageComponent;
  let fixture: ComponentFixture<CreatorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatorPageComponent],
      imports: [AppModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
