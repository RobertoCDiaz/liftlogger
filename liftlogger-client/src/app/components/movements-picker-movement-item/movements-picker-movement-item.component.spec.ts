import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementsPickerMovementItemComponent } from './movements-picker-movement-item.component';
import { MovementsPickerState } from '../movements-picker/movements-picker.component';
import { getElement, getElements } from 'src/app/helpers/testing.helper';
import { getMovementsFixture } from 'src/app/fixtures/movements.fixture';
import { Movement } from 'src/app/models/MovementModel';

describe('MovementsPickerMovementItemComponent', () => {
  let component: MovementsPickerMovementItemComponent;
  let fixture: ComponentFixture<MovementsPickerMovementItemComponent>;
  let state: MovementsPickerState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovementsPickerMovementItemComponent],
      providers: [MovementsPickerState],
    }).compileComponents();

    state = TestBed.inject(MovementsPickerState);

    fixture = TestBed.createComponent(MovementsPickerMovementItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display anything if not movement is set', () => {
    const container = getElement(fixture, '.item');

    expect(container).toBeFalsy();
  });

  describe('isHrefDisabled', () => {
    beforeEach(() => {
      component.movement = getMovementsFixture()[0];
      fixture.detectChanges();
    });

    it('should render an <a> if not disabled', () => {
      component.isHrefDisabled = false;
      const container = getElement(fixture, '.item');

      expect(container).toBeInstanceOf(HTMLAnchorElement);
    });

    it('should render a <div> if disabled', () => {
      component.isHrefDisabled = true;
      const container = getElement(fixture, '.item');

      expect(container).toBeInstanceOf(HTMLDivElement);
    });

    it("should be equal to injector's state property", () => {
      state.updateHrefDisabled(true);
      expect(component.isHrefDisabled).toBeTrue();

      state.updateHrefDisabled(false);
      expect(component.isHrefDisabled).toBeFalse();

      let emittedValue: boolean = false;
      state.isHrefDisabled().subscribe(value => {
        emittedValue = value;
      });

      state.updateHrefDisabled(true);
      expect(component.isHrefDisabled).toBe(emittedValue);

      state.updateHrefDisabled(false);
      expect(component.isHrefDisabled).toBe(emittedValue);
    });
  });

  describe('Group Chips', () => {
    const movement: Movement = getMovementsFixture()[0];
    beforeEach(() => {
      component.movement = movement;
      fixture.detectChanges();
    });

    it('should highlight the primary group', () => {
      const primaryGroupElement: HTMLSpanElement = getElement(fixture, '.group-chip.primary');

      const primaryGroup = movement.groups?.filter(g => g.id === movement.primary_group_id)[0];

      expect(primaryGroupElement.textContent?.trim()).toBe(primaryGroup?.name);
    });

    it('should be sorted so that the primary group appears up front', () => {
      component.sortGroups();

      const groups: HTMLSpanElement[] = getElements(fixture, '.group-chip');
      const firstGroupClassses = Array.from(groups[0].classList);

      expect(firstGroupClassses).toContain('primary');
    });
  });

  describe('handleMovementSelected()', () => {
    it("should pass to the injector's state the current movement when clicked", () => {
      const movement = getMovementsFixture()[0];
      component.movement = movement;
      fixture.detectChanges();

      let emitted: Movement | null = null;
      state.getSelectedMovement().subscribe(movement => {
        emitted = movement;
      });

      component.handleMovementSelected();
      expect(emitted!).toEqual(component.movement);
    });

    it('should be triggered when component is clicked', () => {
      const movement = getMovementsFixture()[0];
      component.movement = movement;
      component.isHrefDisabled = true;

      const spy = spyOn(component, 'handleMovementSelected');

      const container: HTMLDivElement = getElement(fixture, '.item');
      container.click();

      expect(spy).toHaveBeenCalled();
    });
  });
});
