import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  MuscularGroupSelectorComponent,
  MuscularGroupSelectorState,
} from './muscular-group-selector.component';
import { AppModule } from 'src/app/app.module';
import { GroupsService } from 'src/app/services/groups.service';
import { getMuscleGroupsFixture } from 'src/app/fixtures/muscle-groups.fixture';
import { of } from 'rxjs';
import { getComponents, getElement } from 'src/app/helpers/testing.helper';
import { ItemComponent } from './item/item.component';
import { MuscleGroup } from 'src/app/models/MuscleGroupModel';

describe('MuscularGroupSelectorComponent', () => {
  let component: MuscularGroupSelectorComponent;
  let fixture: ComponentFixture<MuscularGroupSelectorComponent>;
  let componentState: MuscularGroupSelectorState;
  let groupsService: GroupsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MuscularGroupSelectorComponent],
      imports: [AppModule],
      providers: [MuscularGroupSelectorState, GroupsService],
    }).compileComponents();

    fixture = TestBed.createComponent(MuscularGroupSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    componentState = fixture.debugElement.injector.get(MuscularGroupSelectorState);
    groupsService = TestBed.inject(GroupsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update isMultipleChoice in component state according to its properties', () => {
    component.isMultipleChoice = true;
    component.ngOnChanges();

    expect(componentState.isMultiSelectable).toBeTrue();

    component.isMultipleChoice = false;
    component.ngOnChanges();

    expect(componentState.isMultiSelectable).toBeFalse();

    component.isMultipleChoice = true;
    component.ngOnChanges();

    expect(componentState.isMultiSelectable).toBeTrue();
  });

  it('should store in state the muscle groups of the user', () => {
    const testGroups = getMuscleGroupsFixture();
    spyOn(groupsService, 'getUserGroups').and.returnValue(of(testGroups));

    component.ngOnChanges();

    componentState.userGroups.forEach((group, idx) => {
      expect(group.id).toBe(testGroups[idx].id);
      expect(group.name).toBe(testGroups[idx].name);
      expect(group.movements).toEqual(testGroups[idx].movements);
    });
  });

  it('should render root user groups from state', () => {
    const testGroups = getMuscleGroupsFixture();

    spyOn(groupsService, 'getUserGroups').and.returnValue(of(testGroups));
    component.ngOnChanges();

    const groupItems = getComponents(fixture, 'app-muscular-group-selector-item');

    const rootGroupsLength = testGroups.filter(g => !g.parent_group_id).length;
    expect(groupItems).toHaveSize(rootGroupsLength);

    groupItems
      .map(el => el.componentInstance)
      .forEach((item: ItemComponent, idx: number) => {
        expect(item.group.id).toEqual(testGroups[idx].id);
      });
  });

  it('should render primary text', () => {
    const testText = 'This is a text used for testing';

    component.text = testText;

    const mainTextElement: HTMLParagraphElement = getElement(fixture, 'p.main');

    expect(mainTextElement.textContent?.trim()).toBe(testText);
  });

  it('should render secondary text', () => {
    const testText = 'This is a text used for testing';
    let secondaryText: HTMLParagraphElement = getElement(fixture, 'p.secondary');

    expect(secondaryText).toBeFalsy();

    component.secondaryText = testText;

    secondaryText = getElement(fixture, 'p.secondary');

    expect(secondaryText).toBeTruthy();
    expect(secondaryText.textContent?.trim()).toBe(testText);
  });

  describe('handleItemToggled()', () => {
    it('should emit selectionChanged event', () => {
      const spy = spyOn(component.selectionChanged, 'emit');

      component.handleItemToggled();

      expect(spy).toHaveBeenCalled();
    });

    it('should emit selected groups', () => {
      const testSelectedGroups = [getMuscleGroupsFixture()[0], getMuscleGroupsFixture()[2]];

      spyOn(groupsService, 'getSelectedGroups').and.returnValue(testSelectedGroups);

      let emittedGroups: MuscleGroup[] = [];
      component.selectionChanged.subscribe(selectedGroups => {
        emittedGroups = selectedGroups;
      });

      component.handleItemToggled();

      expect(emittedGroups).toEqual(testSelectedGroups);
    });
  });
});
