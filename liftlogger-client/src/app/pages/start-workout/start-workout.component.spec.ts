import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartWorkoutComponent } from './start-workout.component';
import { GlobalModule } from 'src/app/modules/global/global.module';
import { WorkoutModule } from 'src/app/modules/workout/workout.module';
import { AppModule } from 'src/app/app.module';
import { TemplatesService } from 'src/app/services/templates.service';
import { of, skip, take } from 'rxjs';
import { getTemplatesFixture } from 'src/app/fixtures/templates.fixture';
import { MovementsPickerDialog } from 'src/app/dialogs/movements-picker-dialog/movements-picker-dialog.component';
import { getMovementsFixture } from 'src/app/fixtures/movements.fixture';

describe('StartWorkoutComponent', () => {
  let component: StartWorkoutComponent;
  let fixture: ComponentFixture<StartWorkoutComponent>;

  let templateService: TemplatesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalModule, WorkoutModule, AppModule],
      declarations: [StartWorkoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StartWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    templateService = TestBed.inject(TemplatesService);

    spyOn(templateService, 'getUserTemplates').and.returnValue(of(getTemplatesFixture()));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set selected item to template when templateClicked event is triggered', () => {
    const testId: number = 2;

    component.selectedItem$.pipe(skip(1)).subscribe(result => {
      expect(result).toEqual({ type: 'template', template_id: testId });
    });

    component.templateClicked.next(testId);
  });

  it('should set selected item to movement when movementPicked event is triggered', () => {
    const testMovement = getMovementsFixture()[0];

    component.selectedItem$.pipe(skip(1)).subscribe(result => {
      expect(result).toEqual({ type: 'movement', movement: testMovement });
    });

    component.movementPicked.next(testMovement);
  });

  describe('ngAfterViewInit()', () => {
    it('should update templates to display based on template search query', () => {
      spyOn(component.templateSearchBar.queryChanged, 'asObservable').and.returnValue(
        of('orchest', 'manager', 'should not return a single template'),
      );
      component.ngAfterViewInit();

      component.filteredTemplates$.pipe(skip(1), take(1)).subscribe(result => {
        expect(result).toHaveSize(2);
      });

      component.filteredTemplates$.pipe(skip(2), take(1)).subscribe(result => {
        expect(result).toHaveSize(1);
      });

      component.filteredTemplates$.pipe(skip(3), take(1)).subscribe(result => {
        expect(result).toHaveSize(0);
      });
    });
  });

  describe('openMovementsPicker()', () => {
    it('should call MovementsPickerDialog.open with correct parameters', () => {
      const mockPickerDialog = jasmine.createSpyObj('pickerDialog', ['afterClosed']);
      const dialogOpenSpy = spyOn(MovementsPickerDialog, 'open').and.returnValue(mockPickerDialog);
      const testMovement = getMovementsFixture()[0];
      mockPickerDialog.afterClosed.and.returnValue(of(testMovement));

      component.openMovementsPicker();

      expect(dialogOpenSpy).toHaveBeenCalled();
    });

    it('should emit movementPicked event with the selected movement', () => {
      const mockPickerDialog = jasmine.createSpyObj('pickerDialog', ['afterClosed']);
      spyOn(MovementsPickerDialog, 'open').and.returnValue(mockPickerDialog);
      const testMovement = getMovementsFixture()[0];
      mockPickerDialog.afterClosed.and.returnValue(of(testMovement));
      const eventSpy = spyOn(component.movementPicked, 'emit');

      component.movementPicked.subscribe(emitted => {
        expect(emitted).toEqual(testMovement);
      });

      component.openMovementsPicker();
      expect(eventSpy).toHaveBeenCalled();
    });

    it('should NOT emit movementPicked event when no movement is picked', () => {
      const mockPickerDialog = jasmine.createSpyObj('pickerDialog', ['afterClosed']);
      spyOn(MovementsPickerDialog, 'open').and.returnValue(mockPickerDialog);
      mockPickerDialog.afterClosed.and.returnValue(of());
      const eventSpy = spyOn(component.movementPicked, 'emit');

      component.openMovementsPicker();

      expect(eventSpy).not.toHaveBeenCalled();
    });
  });
});
