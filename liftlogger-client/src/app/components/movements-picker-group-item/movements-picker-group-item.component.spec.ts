import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementsPickerGroupItemComponent } from './movements-picker-group-item.component';
import { MovementsPickerState } from '../movements-picker/movements-picker.component';
import { muscleGroupsFixture } from 'src/app/fixtures/muscle-groups.fixture';
import { getComponents, getElement } from 'src/app/helpers/testing.helper';
import { MovementsPickerMovementItemComponent } from '../movements-picker-movement-item/movements-picker-movement-item.component';
import { AppModule } from 'src/app/app.module';

describe('MovementsPickerGroupItemComponent', () => {
  let component: MovementsPickerGroupItemComponent;
  let fixture: ComponentFixture<MovementsPickerGroupItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovementsPickerGroupItemComponent],
      imports: [AppModule],
      providers: [MovementsPickerState],
    }).compileComponents();

    fixture = TestBed.createComponent(MovementsPickerGroupItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should NOT render anything if no group is set', () => {
    const container = getElement(fixture, '.group-item');

    expect(container).toBeFalsy();
  });

  it('should correctly render group information', () => {
    muscleGroupsFixture.forEach(testGroup => {
      component.group = testGroup;
      fixture.detectChanges();

      const nameEl: HTMLParagraphElement = getElement(fixture, '#group-name', false);
      const movsContainer: HTMLDivElement = getElement(fixture, '.movement-container', false);
      const noMovsContainer: HTMLDivElement = getElement(fixture, '.no-movements', false);

      expect(nameEl.textContent?.trim()).toBe(testGroup.name);

      if (!testGroup.movements || testGroup.movements.length === 0) {
        expect(movsContainer).toBeFalsy();
        expect(noMovsContainer).toBeTruthy();
      } else {
        expect(movsContainer).toBeTruthy();
        expect(noMovsContainer).toBeFalsy();

        const movements: MovementsPickerMovementItemComponent[] = getComponents(
          fixture,
          'app-movements-picker-movement-item',
          false,
        ).map(el => el.componentInstance);

        expect(movements).toHaveSize(testGroup.movements.length);
        movements.forEach((mov, idx) => {
          expect(mov.movement).toEqual(testGroup.movements![idx]);
        });
      }
    });
  });

  describe('.isOpen', () => {
    it('should control movements display', () => {
      component.group = muscleGroupsFixture[0];
      fixture.detectChanges();

      const movementsList: HTMLDivElement = getElement(fixture, '.list');

      let classes = Array.from(movementsList.classList);
      expect(classes).not.toContain('display');

      component.isOpen = true;
      fixture.detectChanges();
      classes = Array.from(movementsList.classList);

      expect(classes).toContain('display');

      component.isOpen = false;
      fixture.detectChanges();
      classes = Array.from(movementsList.classList);

      expect(classes).not.toContain('display');
    });
  });

  describe('toggleContent()', () => {
    it('should change state of isOpen', () => {
      component.group = muscleGroupsFixture[0];
      fixture.detectChanges();

      let currentState = component.isOpen;

      component.toggleContent();
      expect(component.isOpen).toBe(!currentState);

      component.toggleContent();
      expect(component.isOpen).toBe(currentState);
    });
  });
});
