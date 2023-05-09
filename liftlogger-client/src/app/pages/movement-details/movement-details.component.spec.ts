import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementDetailsComponent } from './movement-details.component';
import { ActivatedRoute, Router, RouterModule, convertToParamMap } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from '@auth0/auth0-angular';
import { environment } from 'src/environment/environment';
import { PageHeaderComponent } from 'src/app/components/page-header/page-header.component';
import { ContentLoaderComponent } from 'src/app/components/content-loader/content-loader.component';
import { GraphComponent } from 'src/app/components/graph/graph.component';
import { MovementJournalEntryComponent } from 'src/app/components/movement-journal-entry/movement-journal-entry.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MovementsService } from 'src/app/services/movements.service';
import { of } from 'rxjs';
import { getMovementsFixture } from 'src/app/fixtures/movements.fixture';
import { getEntriesFixture } from 'src/app/fixtures/movements-journals.fixture';
import * as moment from 'moment';

describe('MovementDetailsComponent', () => {
  let component: MovementDetailsComponent;
  let fixture: ComponentFixture<MovementDetailsComponent>;

  let activatedRoute: ActivatedRoute;
  let router: Router;
  let movementsService: MovementsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MovementDetailsComponent,
        PageHeaderComponent,
        ContentLoaderComponent,
        GraphComponent,
        MovementJournalEntryComponent,
      ],
      imports: [
        NgxSkeletonLoaderModule,
        RouterModule.forRoot([]),
        HttpClientModule,
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

    fixture = TestBed.createComponent(MovementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    activatedRoute = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    movementsService = TestBed.inject(MovementsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /movements if no ID is specified', () => {
    const routerSpy = spyOn(router, 'navigate');

    component.ngOnInit();

    expect(routerSpy).toHaveBeenCalledWith(['movements']);
  });

  it('should try to fetch movement from the service', () => {
    const testId = 3;
    const getMovementsSpy = spyOn(movementsService, 'getMovement').and.returnValue(
      of(getMovementsFixture()[0]),
    );
    spyOnProperty(activatedRoute, 'paramMap').and.returnValue(
      of(convertToParamMap({ id: testId })),
    );

    component.ngOnInit();

    expect(getMovementsSpy).toHaveBeenCalledWith(testId);
  });

  it('should get movement journal if fetched movement exists', () => {
    const testId = 5;
    const serviceSpy = spyOn(movementsService, 'getMovementJournal').and.returnValue(of([]));
    const functionSpy = spyOn(component, 'setupJournalInformation');
    spyOnProperty(activatedRoute, 'paramMap').and.returnValue(
      of(convertToParamMap({ id: testId })),
    );
    spyOn(movementsService, 'getMovement').and.returnValue(of(getMovementsFixture()[0]));

    component.ngOnInit();

    expect(serviceSpy).toHaveBeenCalledWith(testId);
    expect(functionSpy).toHaveBeenCalled();
  });

  describe('setupJournalInformation()', () => {
    it('should correctly set the lastSession', () => {
      const expected = getEntriesFixture()[0];

      component.setupJournalInformation(getEntriesFixture());

      expect(component.lastSession).toEqual(expected);
    });

    it('should correctly set the bestSession', () => {
      const expected = getEntriesFixture()[1];

      component.setupJournalInformation(getEntriesFixture());

      expect(component.bestSession).toEqual(expected);
    });
    it('should correctly set the prSet session', () => {
      const expected = getEntriesFixture()[2];

      component.setupJournalInformation(getEntriesFixture());

      expect(component.prSet).toEqual(expected);
    });
    it('should correctly set the last trained date (in DD/MM/YYYY format)', () => {
      const expected = moment(getEntriesFixture()[0].date).format('DD/MM/YYYY');

      component.setupJournalInformation(getEntriesFixture());

      expect(component.lastTrainedDate).toEqual(expected);
    });
  });
});
