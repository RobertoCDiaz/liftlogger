import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateMovementsListComponent } from './template-movements-list.component';
import { CreateTemplateComponentState } from 'src/app/pages/create-template/create-template.component';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Movement } from 'src/app/models/MovementModel';
import { AppModule } from 'src/app/app.module';
import { MovementsPickerDialog } from 'src/app/dialogs/movements-picker-dialog/movements-picker-dialog.component';

describe('TemplateMovementsListComponent', () => {
  let component: TemplateMovementsListComponent;
  let fixture: ComponentFixture<TemplateMovementsListComponent>;

  let state: CreateTemplateComponentState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [CreateTemplateComponentState],
      imports: [AppModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TemplateMovementsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    state = fixture.debugElement.injector.get(CreateTemplateComponentState);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('handleItemDropped()', () => {
    it('should call state method to move a movement', () => {
      const spy = spyOn(state, 'moveMovement');
      const fromIdx = 1;
      const toIdx = 0;

      component.handleItemDropped({
        previousIndex: fromIdx,
        currentIndex: toIdx,
      } as CdkDragDrop<Movement>);

      expect(spy).toHaveBeenCalledWith(fromIdx, toIdx);
    });
  });

  describe('openMovementPicker()', () => {
    it('should call MovementsPickerDialog.open', () => {
      const dialogOpenSpy = spyOn(MovementsPickerDialog, 'open');

      component.openMovementPicker();

      expect(dialogOpenSpy).toHaveBeenCalled();
    });
  });
});
