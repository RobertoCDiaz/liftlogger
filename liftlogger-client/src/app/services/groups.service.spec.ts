import { TestBed } from '@angular/core/testing';

import { GroupsService } from './groups.service';
import { AppModule } from '../app.module';
import { HttpService } from './http.service';
import { MuscleGroup, MuscleGroupCreationParams } from '../models/MuscleGroupModel';
import { getMuscleGroupsFixture } from '../fixtures/muscle-groups.fixture';

describe('GroupsService', () => {
  let service: GroupsService;
  let http: HttpService;

  const testGroups = getMuscleGroupsFixture();

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [AppModule] });
    service = TestBed.inject(GroupsService);

    http = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUserGroups()', () => {
    it('should make a get request to fetch user groups', () => {
      const getSpy = spyOn(http, 'get');

      service.getUserGroups();

      expect(getSpy).toHaveBeenCalledWith('groups');
    });

    it('should be able to ask for movements', () => {
      const getSpy = spyOn(http, 'get');

      service.getUserGroups(true);

      expect(getSpy).toHaveBeenCalledWith('groups?withMovements=true');
    });
  });

  describe('createGroup()', () => {
    it('should make a post request to create a group', () => {
      const postSpy = spyOn(http, 'post');
      const testGroup: MuscleGroupCreationParams = JSON.parse(
        JSON.stringify(getMuscleGroupsFixture()),
      )[0];

      service.createGroup(testGroup);

      expect(postSpy).toHaveBeenCalledWith('groups', testGroup);
    });
  });

  describe('searchMovementsInGroups()', () => {
    it('should search for group matches of a given query', () => {
      let result = service.searchMovementsInGroups('Manager', testGroups);

      expect(result).toHaveSize(1);
      expect(result[0].movements).toHaveSize(2);

      result = service.searchMovementsInGroups('Direct', testGroups);

      expect(result).toHaveSize(2);
      expect(result[0].movements).toHaveSize(1);
      expect(result[1].movements).toHaveSize(1);

      result = service.searchMovementsInGroups('Communications', testGroups);

      expect(result).toHaveSize(1);
      expect(result[0].movements).toHaveSize(1);
    });
  });

  describe('organizeGroups()', () => {
    it('should put subgroups inside their parent group', () => {
      const result = service.organizeGroups(testGroups);

      expect(result).toHaveSize(4);
      expect(result[0].groups).toBeFalsy();
      expect(result[1].groups).toBeFalsy();
      expect(result[2].groups).toBeFalsy();
      expect(result[3].groups).toHaveSize(2);
    });
  });

  describe('getSelectedGroups()', () => {
    it('should get a list of the selected groups inside a list', () => {
      const testGroups = getMuscleGroupsFixture();
      const groupedGroups: MuscleGroup[] = [];

      testGroups.forEach(g => {
        if (!g.parent_group_id) {
          groupedGroups.push(g);
          return;
        }

        const parent = groupedGroups.find(otherGroup => g.parent_group_id === otherGroup.id);

        if (!parent!.groups) {
          parent!.groups = [];
        }

        parent!.groups.push(g);
      });

      groupedGroups[1].checked = true;
      groupedGroups[3].groups![0].checked = true;

      const result = service.getSelectedGroups(groupedGroups);

      expect(result).toHaveSize(2);
      expect(result.map(g => g.name)).toContain('Back');
      expect(result.map(g => g.name)).toContain('Biceps');
    });
  });

  describe('unCheckAllGroups()', () => {
    let testGroups: MuscleGroup[] = [];
    let groupedGroups: MuscleGroup[] = [];

    beforeEach(() => {
      testGroups = getMuscleGroupsFixture();
      groupedGroups = [];

      testGroups.forEach(g => {
        if (!g.parent_group_id) {
          groupedGroups.push(g);
          return;
        }

        const parent = groupedGroups.find(otherGroup => g.parent_group_id === otherGroup.id);

        if (!parent!.groups) {
          parent!.groups = [];
        }

        parent!.groups.push(g);
      });

      groupedGroups[1].checked = true;
      groupedGroups[1].isPrimary = true;
      groupedGroups[3].groups![0].checked = true;
    });

    it("should set to false all group's checked and isPrimary properties in a list", () => {
      expect(testGroups.filter(g => g.checked)).toHaveSize(2);
      expect(testGroups.filter(g => g.isPrimary)).toHaveSize(1);

      service.unCheckAllGroups(groupedGroups);

      expect(testGroups.filter(g => g.checked)).toHaveSize(0);
      expect(testGroups.filter(g => g.isPrimary)).toHaveSize(0);
    });

    it('should only unset the isPrimary property if necessary', () => {
      expect(testGroups.filter(g => g.checked)).toHaveSize(2);
      expect(testGroups.filter(g => g.isPrimary)).toHaveSize(1);

      service.unCheckAllGroups(groupedGroups, true);

      expect(testGroups.filter(g => g.checked)).toHaveSize(2);
      expect(testGroups.filter(g => g.isPrimary)).toHaveSize(0);
    });
  });
});
