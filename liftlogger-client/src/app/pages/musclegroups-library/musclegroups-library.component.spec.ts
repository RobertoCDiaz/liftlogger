import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusclegroupsLibraryComponent } from './musclegroups-library.component';
import { getComponent } from 'src/app/helpers/testing.helper';
import { DrawerPageComponent } from 'src/app/components/drawer-page/drawer-page.component';
import { AppModule } from 'src/app/app.module';
import { GroupsService } from 'src/app/services/groups.service';
import { getMuscleGroupsFixture } from 'src/app/fixtures/muscle-groups.fixture';
import { of } from 'rxjs';

describe('MusclegroupsLibraryComponent', () => {
  let component: MusclegroupsLibraryComponent;
  let fixture: ComponentFixture<MusclegroupsLibraryComponent>;
  let groupsService: GroupsService;

  const testGroups = getMuscleGroupsFixture();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MusclegroupsLibraryComponent],
      imports: [AppModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MusclegroupsLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    groupsService = TestBed.inject(GroupsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('View', () => {
    it('should render a drawer pager with correct information', () => {
      const drawerPage: DrawerPageComponent = getComponent(
        fixture,
        'app-drawer-page',
      ).componentInstance;

      expect(drawerPage).toBeTruthy();
      expect(drawerPage.pageName).toBe('Muscle Groups');
      expect(drawerPage.actionUrl).toBe('/muscle-groups/create');
    });
  });

  describe('OnInit', () => {
    it('should fetch user groups with movements and metadata and set the response to the object used in view', () => {
      const spy = spyOn(groupsService, 'getUserGroups').and.returnValue(of(testGroups));

      component.ngOnInit();

      expect(spy).toHaveBeenCalledWith(true, true);
      expect(component.muscleGroups).toEqual(testGroups);
    });
  });

  describe('formatDate()', () => {
    it('should format date objects to properly display it', () => {
      let result: string | undefined = '';

      result = component.formatDate(new Date('2023-05-12'));

      expect(result).toBe('May 12th, 2023');

      result = component.formatDate(new Date('2022-11-11'));

      expect(result).toBe('Nov 11th, 2022');

      result = component.formatDate();

      expect(result).toBeFalsy();
    });
  });
});
