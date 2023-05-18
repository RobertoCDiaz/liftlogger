import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateMovementItemComponent } from './template-movement-item.component';
import { getMovementsFixture } from 'src/app/fixtures/movements.fixture';
import { getElement } from 'src/app/helpers/testing.helper';
import { AppModule } from 'src/app/app.module';
import { CreateTemplateComponentState } from 'src/app/pages/create-template/create-template.component';

describe('TemplateMovementItemComponent', () => {
  let component: TemplateMovementItemComponent;
  let fixture: ComponentFixture<TemplateMovementItemComponent>;

  let state: CreateTemplateComponentState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TemplateMovementItemComponent],
      imports: [AppModule],
      providers: [CreateTemplateComponentState],
    }).compileComponents();

    fixture = TestBed.createComponent(TemplateMovementItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    state = fixture.debugElement.injector.get(CreateTemplateComponentState);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display movement name', () => {
    const testMovement = getMovementsFixture()[0];
    component.movement = testMovement;

    const nameEl: HTMLSpanElement = getElement(fixture, 'span.name');

    expect(nameEl.textContent?.includes(testMovement.name)).toBeTrue();
  });

  describe('removeMovement()', () => {
    it('should call page state to remove current movement', () => {
      const spy = spyOn(state, 'removeMovement');
      const testMovement = getMovementsFixture()[0];
      component.movement = testMovement;

      component.removeMovement();

      expect(spy).toHaveBeenCalledWith(testMovement);
    });
  });
});
