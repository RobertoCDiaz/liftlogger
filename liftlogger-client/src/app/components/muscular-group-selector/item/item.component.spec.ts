import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemComponent } from './item.component';
import { MuscularGroupSelectorState } from '../muscular-group-selector.component';
import { AppModule } from 'src/app/app.module';
import { getComponent, getComponents, getElement } from 'src/app/helpers/testing.helper';
import { getMuscleGroupsFixture } from 'src/app/fixtures/muscle-groups.fixture';
import { GroupsService } from 'src/app/services/groups.service';
import { MuscleGroup } from 'src/app/models/MuscleGroupModel';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;
  let componentState: MuscularGroupSelectorState;
  let groupsService: GroupsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemComponent],
      imports: [AppModule],
      providers: [MuscularGroupSelectorState],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    componentState = fixture.debugElement.injector.get(MuscularGroupSelectorState);
    groupsService = TestBed.inject(GroupsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shound not render anything if no group is set', () => {
    const container = getElement(fixture, 'div.group');

    expect(container).toBeFalsy();
  });

  it('should correctly render group', () => {
    getMuscleGroupsFixture().forEach(testGroup => {
      component.group = testGroup;

      const nameEl: HTMLSpanElement = getElement(fixture, 'span.name');

      expect(nameEl.textContent?.trim()).toBe(testGroup.name);
    });
  });

  it('should correctly render subgroups if any', () => {
    const testGroupWithSubgroups = { ...getMuscleGroupsFixture()[3] };
    testGroupWithSubgroups.groups = getMuscleGroupsFixture().filter(
      g => g.parent_group_id === testGroupWithSubgroups.id,
    );

    component.group = testGroupWithSubgroups;
    component.isExpanded = true;

    const childrenEls: ItemComponent[] = getComponents(
      fixture,
      'app-muscular-group-selector-item',
    ).map(el => el.componentInstance);

    expect(childrenEls).toHaveSize(testGroupWithSubgroups.groups.length);

    childrenEls.forEach((subgroup, idx) => {
      expect(subgroup.group.id).toBe(testGroupWithSubgroups.groups![idx].id);
    });
  });

  it('should appear as checked when group is checked', () => {
    component.group = getMuscleGroupsFixture()[0];
    component.group.checked = true;

    const container: HTMLDivElement = getElement(fixture, 'div.group');
    const classes = Array.from(container.classList);

    expect(classes).toContain('checked');
  });

  it('should appear as checked when group is checked', () => {
    component.group = getMuscleGroupsFixture()[0];
    component.group.checked = false;

    const container: HTMLDivElement = getElement(fixture, 'div.group');
    const classes = Array.from(container.classList);

    expect(classes).not.toContain('checked');
  });

  describe('Checkbox', () => {
    beforeEach(() => {
      component.group = getMuscleGroupsFixture()[0];
    });

    it('should trigger toggleChecked() when clicked', () => {
      const spy = spyOn(component, 'toggleChecked');

      const checkbox: HTMLSpanElement = getElement(fixture, 'span.checkbox');

      checkbox.click();

      expect(spy).toHaveBeenCalled();
    });

    it('should appear as checked when group is checked', () => {
      component.group.checked = true;

      const checkbox: HTMLSpanElement = getElement(fixture, 'span.checkbox');

      expect(checkbox.textContent?.trim()).toBe('check_box');
    });

    it('should appear as unchecked when group is not checked', () => {
      component.group.checked = false;

      const checkbox: HTMLSpanElement = getElement(fixture, 'span.checkbox');

      expect(checkbox.textContent?.trim()).toBe('check_box_outline_blank');
    });
  });

  it('should trigger setPrimary method when name is double clicked', () => {
    component.group = getMuscleGroupsFixture()[0];

    const nameEl = getComponent(fixture, 'span.name');
    const spy = spyOn(component, 'setPrimary');

    nameEl.triggerEventHandler('dblclick');

    expect(spy).toHaveBeenCalled();
  });

  describe('setPrimary()', () => {
    beforeEach(() => {
      component.group = getMuscleGroupsFixture()[0];
      component.group.checked = false;
      component.group.isPrimary = false;
    });

    it('should set group as primary', () => {
      component.setPrimary();

      expect(component.group.isPrimary).toBeTrue();
    });

    it('should also check the group when set to primary if its unchecked', () => {
      component.setPrimary();

      expect(component.group.checked).toBeTrue();
    });
  });

  describe('toggleChecked()', () => {
    beforeEach(() => {
      component.group = getMuscleGroupsFixture()[0];
    });

    it('should select a group when it is not checked', () => {
      component.group.checked = false;

      component.toggleChecked();

      expect(component.group.checked).toBeTrue();
    });

    it('should unselect a group when it is checked', () => {
      component.group.checked = true;

      component.toggleChecked();

      expect(component.group.checked).toBeFalse();
    });

    it('should not uncheck all groups when is multiselectable', () => {
      const spy = spyOn(groupsService, 'unCheckAllGroups');

      componentState.isMultiSelectable = true;

      component.toggleChecked();

      expect(spy).not.toHaveBeenCalled();
    });

    it('should uncheck all groups when is not multiselectable', () => {
      const spy = spyOn(groupsService, 'unCheckAllGroups');

      componentState.isMultiSelectable = false;

      component.toggleChecked();

      expect(spy).toHaveBeenCalled();
    });

    it('should emit the group through itemToggled event when executed', () => {
      let emitted: MuscleGroup | null = null;
      component.itemToggled.subscribe(group => {
        emitted = group;
      });

      component.toggleChecked();

      expect(emitted!).toEqual(component.group);
    });

    it('should unmark as primary the group when unchecked', () => {
      component.group.checked = true;
      component.group.isPrimary = true;

      expect(component.group.isPrimary).toBeTrue();

      component.toggleChecked();

      expect(component.group.isPrimary).toBeFalse();
    });
    // TODO: should check parent groups when a subgroup is checked
  });

  // toggle groups with subgroups
  describe('Expand Button', () => {
    beforeEach(() => {
      component.group = getMuscleGroupsFixture()[3];
      component.group.groups = [getMuscleGroupsFixture()[4], getMuscleGroupsFixture()[5]];
    });

    it('should trigger toggleExpanded()', () => {
      const spy = spyOn(component, 'toggleExpanded');

      const expandButton: HTMLSpanElement = getElement(fixture, 'span.expand');
      expandButton.click();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('toggleExpanded', () => {
    beforeEach(() => {
      component.group = getMuscleGroupsFixture()[3];
      component.group.groups = [getMuscleGroupsFixture()[4], getMuscleGroupsFixture()[5]];
    });

    it('should expand component to show subgroups', () => {
      component.isExpanded = false;

      component.toggleExpanded();

      expect(component.isExpanded).toBeTrue();
    });

    it('should hide subgroups when executed and component is expanded', () => {
      component.isExpanded = true;

      component.toggleExpanded();

      expect(component.isExpanded).toBeFalse();
    });
  });
});
