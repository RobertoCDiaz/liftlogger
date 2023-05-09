import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementsPickerComponent, MovementsPickerState } from './movements-picker.component';
import { Movement } from 'src/app/models/MovementModel';
import { getMovementsFixture } from 'src/app/fixtures/movements.fixture';
import { AppModule } from 'src/app/app.module';
import { GroupsService } from 'src/app/services/groups.service';
import { of } from 'rxjs';
import { getMuscleGroupsFixture } from 'src/app/fixtures/muscle-groups.fixture';
import { getComponents } from 'src/app/helpers/testing.helper';
import { MovementsPickerGroupItemComponent } from '../movements-picker-group-item/movements-picker-group-item.component';

describe('MovementsPickerComponent', () => {
  let component: MovementsPickerComponent;
  let fixture: ComponentFixture<MovementsPickerComponent>;

  let state: MovementsPickerState;
  let groupsService: GroupsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovementsPickerComponent],
      imports: [AppModule],
      providers: [MovementsPickerState, GroupsService],
    }).compileComponents();

    state = TestBed.inject(MovementsPickerState);
    groupsService = TestBed.inject(GroupsService);

    fixture = TestBed.createComponent(MovementsPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly render groups', () => {
    const testGroups = getMuscleGroupsFixture();

    const spy = spyOn(groupsService, 'getUserGroups')
      .withArgs(true)
      .and.returnValue(of(testGroups));

    component.ngOnInit();
    expect(spy).toHaveBeenCalled();

    const groupsElements: MovementsPickerGroupItemComponent[] = getComponents(
      fixture,
      'app-movements-picker-group-item',
    ).map(el => el.componentInstance);

    expect(groupsElements).toHaveSize(testGroups.length);
    groupsElements.forEach((groupEl, idx) => {
      expect(groupEl.group).toEqual(testGroups[idx]);
    });
  });

  describe('MovementsPickerState', () => {
    it('should store and stream movements', () => {
      let lastEmitted: Movement;
      state.getSelectedMovement().subscribe(movement => {
        lastEmitted = movement;
      });

      getMovementsFixture()
        .slice(0, 5)
        .forEach(mov => {
          state.setMovement(mov);

          expect(lastEmitted).toBe(mov);
        });
    });

    it('should store the state of isHrefDisabled', () => {
      let lastEmitted: boolean = false;
      state.isHrefDisabled().subscribe(isDisabled => {
        lastEmitted = isDisabled;
      });

      state.updateHrefDisabled(true);
      expect(lastEmitted).toBeTrue();

      state.updateHrefDisabled(false);
      expect(lastEmitted).toBeFalse();

      state.updateHrefDisabled(true);
      expect(lastEmitted).toBeTrue();
    });
  });

  describe('handleQueryChange', () => {
    it('should call the filtering method and set filtered groups to its result', () => {
      const filteredGroups = getMuscleGroupsFixture().slice(1, 2);
      const spy = spyOn(groupsService, 'searchMovementsInGroups').and.returnValue(filteredGroups);

      component.handleQueryChange('Manager');

      expect(spy).toHaveBeenCalled();
      expect(component.filteredGroups).toEqual(filteredGroups);
    });
  });
});
