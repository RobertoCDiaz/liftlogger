import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementsLibraryComponent } from './movements-library.component';

describe('MovementsLibraryComponent', () => {
  let component: MovementsLibraryComponent;
  let fixture: ComponentFixture<MovementsLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovementsLibraryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MovementsLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
