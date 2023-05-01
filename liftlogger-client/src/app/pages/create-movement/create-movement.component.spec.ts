import { ComponentFixture, TestBed } from '@angular/core/testing';

import { environment } from 'src/environment/environment';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from '@auth0/auth0-angular';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { CreateMovementComponent } from './create-movement.component';
import { CreatorPageComponent } from 'src/app/components/creator-page/creator-page.component';
import { MuscularGroupSelectorComponent } from 'src/app/components/muscular-group-selector/muscular-group-selector.component';
import { PageHeaderComponent } from 'src/app/components/page-header/page-header.component';
import { CreatorInputComponent } from 'src/app/components/creator-input/creator-input.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { MovementsService } from 'src/app/services/movements.service';
import { getMuscleGroupsFixture } from 'src/app/fixtures/muscle-groups.fixture';
import { of } from 'rxjs';
import { movementsFixture } from 'src/app/fixtures/movements.fixture';
import { Router } from '@angular/router';
import { getComponent } from 'src/app/helpers/testing.helper';

describe('CreateMovementComponent', () => {
  let component: CreateMovementComponent;
  let fixture: ComponentFixture<CreateMovementComponent>;
  let service: MovementsService;
  let router: Router;

  const testTitle = 'test title';
  const testDescription = 'test description';
  const testForm = new FormGroup({
    title: new FormControl(testTitle),
    description: new FormControl(testDescription),
  });
  const testGroups = getMuscleGroupsFixture();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CreateMovementComponent,
        CreatorPageComponent,
        MuscularGroupSelectorComponent,
        PageHeaderComponent,
        CreatorInputComponent,
        ButtonComponent,
      ],
      imports: [
        FormsModule,
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

    fixture = TestBed.createComponent(CreateMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    service = TestBed.inject(MovementsService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('createMovement()', () => {
    it("should alert if there's missing information to create a movement", () => {
      const alertSpy = spyOn(window, 'alert');
      spyOn(component, 'shouldEnableCreation').and.returnValue(false);

      component.createMovement();

      expect(alertSpy).toHaveBeenCalledWith('You have missing information');
    });

    it('should call service to create a new movement if everything is ok', () => {
      const alertSpy = spyOn(window, 'alert');
      const serviceSpy = spyOn(service, 'createMovement').and.returnValue(of(movementsFixture[0]));
      spyOn(router, 'navigate');

      spyOn(component, 'shouldEnableCreation').and.returnValue(true);
      component.createMovement();

      expect(alertSpy).not.toHaveBeenCalled();
      expect(serviceSpy).toHaveBeenCalled();
    });
  });

  describe('shouldEnableCreation()', () => {
    it('should return false if no name or description is given', () => {
      component.selectedGroups = testGroups;

      const result: boolean = component.shouldEnableCreation();

      expect(result).toBeFalse();
    });

    it('should return false if no group is selected', () => {
      component.movementForm = testForm;

      const result: boolean = component.shouldEnableCreation();

      expect(result).toBeFalse();
    });

    it('should return true if a name, a description, and at least one muscle group is given', () => {
      component.movementForm = testForm;
      component.selectedGroups = testGroups;

      const result: boolean = component.shouldEnableCreation();

      expect(result).toBeTrue();
    });
  });

  describe('handleFormChanged()', () => {
    it('should update movement information', () => {
      component.handleFormChanged(testForm);

      expect(component.movementForm.value.title).toBe(testTitle);
      expect(component.movementForm.value.description).toBe(testDescription);
    });

    it('should be triggered by creator page when its form changes', () => {
      const spy = spyOn(component, 'handleFormChanged');
      const pageCreator = getComponent(fixture, 'app-creator-page');

      pageCreator.triggerEventHandler('formChanged', testForm);

      expect(spy).toHaveBeenCalledWith(testForm);
    });
  });

  describe('handleGroupSelectionChanged()', () => {
    it('should update selected group', () => {
      component.handleGroupSelectionChanged(testGroups);

      expect(component.selectedGroups).toEqual(testGroups);
    });

    it('should be triggered by muscular group selector', () => {
      const spy = spyOn(component, 'handleGroupSelectionChanged');
      const selector = getComponent(fixture, 'app-muscular-group-selector');

      selector.triggerEventHandler('selectionChanged', testGroups);

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(testGroups);
    });
  });

  describe('app-creator-page', () => {
    it('should not enable creation if form is invalid or no group is selected', () => {
      const creatorPage: CreatorPageComponent = getComponent(
        fixture,
        'app-creator-page',
      ).componentInstance;

      expect(creatorPage.createEnabled).toBeFalse();

      component.movementForm = testForm;
      fixture.detectChanges();

      expect(creatorPage.createEnabled).toBeFalse();

      component.selectedGroups = testGroups;
      fixture.detectChanges();

      expect(creatorPage.createEnabled).toBeTrue();
    });
  });
});
