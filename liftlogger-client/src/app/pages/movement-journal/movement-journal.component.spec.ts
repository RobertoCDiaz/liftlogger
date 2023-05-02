import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementJournalComponent } from './movement-journal.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from '@auth0/auth0-angular';
import { environment } from 'src/environment/environment';
import { ActivatedRoute, RouterModule, convertToParamMap } from '@angular/router';
import { PageHeaderComponent } from 'src/app/components/page-header/page-header.component';
import { MovementsService } from 'src/app/services/movements.service';
import { MovementJournalsService } from 'src/app/services/movement-journals.service';
import { movementsFixture } from 'src/app/fixtures/movements.fixture';
import { entriesFixture } from 'src/app/fixtures/movements-journals.fixture';
import { of } from 'rxjs';
import { MovementMonthlyJournal } from '../../models/MovementJournalEntry';

describe('MovementJournalComponent', () => {
  let component: MovementJournalComponent;
  let fixture: ComponentFixture<MovementJournalComponent>;

  let movementsService: MovementsService;
  let journalsService: MovementJournalsService;
  let route: ActivatedRoute;

  const testId: number = 7;
  const testMovement = movementsFixture[0];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovementJournalComponent, PageHeaderComponent],
      imports: [
        HttpClientModule,
        RouterModule.forRoot([]),
        AuthModule.forRoot({
          domain: environment.auth0Domain,
          clientId: environment.auth0ClientId,
          authorizationParams: {
            redirect_uri: environment.auth0CallbackUrl,
            audience: environment.auth0Audience,
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MovementJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    movementsService = TestBed.inject(MovementsService);
    journalsService = TestBed.inject(MovementJournalsService);
    route = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service to fetch movement', () => {
    spyOnProperty(route, 'paramMap').and.returnValue(
      of(
        convertToParamMap({
          id: testId,
        }),
      ),
    );

    const getMovementSpy = spyOn(movementsService, 'getMovement').and.returnValue(
      of(movementsFixture[0]),
    );

    component.ngOnInit();

    expect(getMovementSpy).toHaveBeenCalledWith(testId);
  });

  it('should get entries for current movement', () => {
    spyOnProperty(route, 'paramMap').and.returnValue(
      of(
        convertToParamMap({
          id: testId,
        }),
      ),
    );

    spyOn(movementsService, 'getMovement').and.returnValue(of(testMovement));

    const getMovementJournalSpy = spyOn(movementsService, 'getMovementJournal').and.returnValue(
      of(entriesFixture),
    );

    component.ngOnInit();

    expect(getMovementJournalSpy).toHaveBeenCalledWith(testMovement.id, true);
  });

  it('should set monthly journals from journals', () => {
    spyOnProperty(route, 'paramMap').and.returnValue(
      of(
        convertToParamMap({
          id: testId,
        }),
      ),
    );

    spyOn(movementsService, 'getMovement').and.returnValue(of(testMovement));

    spyOn(movementsService, 'getMovementJournal').and.returnValue(of(entriesFixture));

    const serviceSpy = spyOn(journalsService, 'getMonthyJournals');

    component.ngOnInit();

    expect(serviceSpy).toHaveBeenCalled();
  });

  describe('getDayNumbers()', () => {
    it('should get the dates with a workout done', () => {
      const testMonthlyJournal: MovementMonthlyJournal = {
        startOfMonth: new Date('2022-03-01'),
        entries: entriesFixture,
      };

      const result = component.getDayNumbers(testMonthlyJournal);

      expect(result).toEqual(new Set([10, 15, 22]));
    });
  });

  describe('getMonthFormat()', () => {
    it('should call journalsService.getMonthlyJournalStringName()', () => {
      const spy = spyOn(journalsService, 'getMonthlyJournalStringName');
      const testMonthlyJournal: MovementMonthlyJournal = {
        startOfMonth: new Date('2022-03-01'),
        entries: entriesFixture,
      };

      component.getMonthFormat(testMonthlyJournal);

      expect(spy).toHaveBeenCalledWith(testMonthlyJournal);
    });
  });
});
