import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { MusclegroupsDetailsComponent } from './musclegroups-details.component';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { BehaviorSubject, of, skip, throwError } from 'rxjs';
import { GroupsService } from 'src/app/services/groups.service';
import { getMetadataFixture, getMuscleGroupsFixture } from 'src/app/fixtures/muscle-groups.fixture';
import { AppModule } from 'src/app/app.module';
import { MuscleGroup, WithMuscleGroupMetadata } from 'src/app/models/MuscleGroupModel';
import * as moment from 'moment';

describe('MusclegroupsDetailsComponent', () => {
  let component: MusclegroupsDetailsComponent;
  let fixture: ComponentFixture<MusclegroupsDetailsComponent>;

  let groupsService: GroupsService;
  let activatedRoute: ActivatedRoute;
  let router: Router;

  const testGroup: WithMuscleGroupMetadata<MuscleGroup> = getMuscleGroupsFixture()[0];
  testGroup.metadata = getMetadataFixture();
  const testId = 12;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MusclegroupsDetailsComponent],
      imports: [AppModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MusclegroupsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    groupsService = TestBed.inject(GroupsService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);

    spyOn(window, 'alert');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    beforeEach(() => {
      spyOnProperty(activatedRoute, 'paramMap').and.returnValue(
        of(convertToParamMap({ id: testId })),
      );
    });

    it('should get the group whose id is in the url', () => {
      const spy = spyOn(groupsService, 'getGroup').and.returnValue(of(testGroup));

      component.ngOnInit();

      component.group$.subscribe(_ => {
        expect(spy).toHaveBeenCalledWith(testId, true, true);
      });
    });

    it('should redirect to groups library if 404 response on group request', () => {
      spyOn(groupsService, 'getGroup').and.returnValue(throwError(() => 'Error'));
      const spy = spyOn(router, 'navigate');

      component.ngOnInit();

      component.group$.subscribe({
        error(_) {
          expect(spy).toHaveBeenCalledWith(['/muscle-groups']);
        },
      });
    });

    it('should set trainedDates$ value depending on currentMonth$', () => {
      spyOn(groupsService, 'getGroup').and.returnValue(of(testGroup));
      component.currentMonth$ = of(moment('2022-11-01'));

      component.ngOnInit();

      component.trainedDates$.subscribe(dates => {
        expect(dates).toHaveSize(3);
      });
    });

    it('should set trainedDays$ from $trainedDates value', () => {
      spyOn(groupsService, 'getGroup').and.returnValue(of(testGroup));
      component.currentMonth$ = of(moment('2022-11-01'));

      component.ngOnInit();

      // we skip the first result because `trainedDays$` always start with a [] set.
      component.trainedDays$.pipe(skip(1)).subscribe(result => {
        expect(result).toEqual(new Set([8, 18, 25]));
      });
    });
  });

  describe('changeMonth()', () => {
    it('should properly change currentMonth$', () => {
      component.currentMonthSubject = new BehaviorSubject(moment('2022-11-01'));
      component.currentMonth$ = component.currentMonthSubject.asObservable();

      let emitted: string[] = [];
      component.currentMonth$.pipe(skip(1)).subscribe(month => {
        emitted.push(month.format('YYYY-MM-DD'));
      });

      component.changeMonth(1);
      component.changeMonth(1);
      component.changeMonth(-1);

      expect(emitted).toEqual(['2022-12-01', '2023-01-01', '2022-12-01']);
    });
  });

  describe('momentToDate()', () => {
    it('should properly transform a moment to date', () => {
      const input = moment('2023-05-15');
      const expected = new Date('2023-05-15');

      const result = component.momentToDate(input);

      expect(result).toEqual(expected);
    });
  });

  describe('formatDate()', () => {
    it('should properly format the provided date', () => {
      const result = component.formatDate(new Date('2023-02-15'));

      expect(result).toBe('Feb 15th, 2023');
    });

    it('should return "-" if no date is provided', () => {
      const result = component.formatDate();

      expect(result).toBe('-');
    });
  });

  describe('getTrainedDatesArray()', () => {
    it('should transform record dates to a list', () => {
      const recordDates = getMetadataFixture().trained_dates;

      const result = component.getTrainedDatesArray(recordDates);

      expect(result).toHaveSize(Object.keys(recordDates).length);
    });

    it('should only return a narrowed down list between two dates', () => {
      const recordDates = getMetadataFixture().trained_dates;

      const result = component.getTrainedDatesArray(recordDates, '2022-01-01', '2022-12-31');

      expect(result).toHaveSize(11);
    });
  });
});
