import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSidenavComponent } from './main-sidenav.component';
import { AppModule } from 'src/app/app.module';

describe('MainSidenavComponent', () => {
  let component: MainSidenavComponent;
  let fixture: ComponentFixture<MainSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainSidenavComponent],
      imports: [AppModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MainSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
