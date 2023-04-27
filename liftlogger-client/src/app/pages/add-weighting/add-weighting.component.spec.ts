import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { AddWeightingComponent } from './add-weighting.component';
import { PageHeaderComponent } from 'src/app/components/page-header/page-header.component';
import { WeightscaleDataInputComponent } from 'src/app/components/weightscale-data-input/weightscale-data-input.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { GraphComponent } from 'src/app/components/graph/graph.component';
import { AppModule } from 'src/app/app.module';
import { WeightingsService } from 'src/app/services/weightings.service';
import { of } from 'rxjs';
import { weightingsFixture } from 'src/app/fixtures/weightings.fixture';
import { Router } from '@angular/router';
import { getComponent } from 'src/app/helpers/testing.helper';

describe('AddWeightingComponent', () => {
  let component: AddWeightingComponent;
  let fixture: ComponentFixture<AddWeightingComponent>;
  let service: WeightingsService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AddWeightingComponent,
        PageHeaderComponent,
        WeightscaleDataInputComponent,
        ButtonComponent,
        GraphComponent,
      ],
      providers: [WeightingsService, Router],
      imports: [AppModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AddWeightingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    service = TestBed.inject(WeightingsService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit()', () => {
    it('should NOT call service to create a new entry if any required fields is empty', () => {
      const createEntrySpy = spyOn(service, 'createEntry');
      const alertSpy = spyOn(window, 'alert');

      component.onSubmit();

      expect(createEntrySpy).not.toHaveBeenCalled();
      expect(alertSpy).toHaveBeenCalledWith(
        'Please, fill in all required fields (marked with an *)',
      );
    });

    it('should call service to create a new entry', fakeAsync(() => {
      const testWeighting = weightingsFixture[0];
      const createEntrySpy = spyOn(service, 'createEntry').and.returnValue(of(testWeighting));
      const routerSpy = spyOn(router, 'navigate');
      const alertSpy = spyOn(window, 'alert');

      component.weightingForm.patchValue({
        weight: 1,
        fat_percentage: 2,
        muscle_mass: 3,
      });

      component.onSubmit();

      expect(createEntrySpy).toHaveBeenCalled();
      expect(routerSpy).toHaveBeenCalled();
      expect(alertSpy).toHaveBeenCalledWith('New entry added successfully!');
    }));
  });

  it('should fetch user weightings and set graph data from that', () => {
    const testWeightings = weightingsFixture;
    spyOn(service, 'getUserEntries').and.returnValue(of(testWeightings));

    component.ngOnInit();

    const graphComponent: GraphComponent = getComponent(fixture, 'app-graph').componentInstance;

    expect(graphComponent.data).toEqual(component.graphData);
  });
});
