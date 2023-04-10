import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementsLibraryComponent } from './movements-library.component';
import { DrawerPageComponent } from 'src/app/components/drawer-page/drawer-page.component';
import { MovementsPickerComponent } from 'src/app/components/movements-picker/movements-picker.component';
import { AppModule } from 'src/app/app.module';

describe('MovementsLibraryComponent', () => {
  let component: MovementsLibraryComponent;
  let fixture: ComponentFixture<MovementsLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovementsLibraryComponent, DrawerPageComponent, MovementsPickerComponent],
      imports: [AppModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MovementsLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
