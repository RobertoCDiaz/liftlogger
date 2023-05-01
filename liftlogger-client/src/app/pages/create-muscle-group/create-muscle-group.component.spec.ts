import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMuscleGroupComponent } from './create-muscle-group.component';
import { CreatorPageComponent } from 'src/app/components/creator-page/creator-page.component';
import { MuscularGroupSelectorComponent } from 'src/app/components/muscular-group-selector/muscular-group-selector.component';
import { PageHeaderComponent } from 'src/app/components/page-header/page-header.component';
import { CreatorInputComponent } from 'src/app/components/creator-input/creator-input.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from '@auth0/auth0-angular';
import { environment } from 'src/environment/environment';
import { getComponent } from 'src/app/helpers/testing.helper';
import { getMuscleGroupsFixture } from 'src/app/fixtures/muscle-groups.fixture';
import { GroupsService } from 'src/app/services/groups.service';
import { Location } from '@angular/common';
import { of } from 'rxjs';

describe('CreateMuscleGroupComponent', () => {
  let component: CreateMuscleGroupComponent;
  let fixture: ComponentFixture<CreateMuscleGroupComponent>;
  let service: GroupsService;
  let location: Location;

  const testTitle = 'test title';
  const testDescription = 'test description';
  const testForm = new FormGroup({
    title: new FormControl(testTitle),
    description: new FormControl(testDescription),
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CreateMuscleGroupComponent,
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
      providers: [Location],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateMuscleGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    service = TestBed.inject(GroupsService);
    location = TestBed.inject(Location);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('app-creator-page', () => {
    it('should not enable creation if form is invalid', () => {
      const creatorPage: CreatorPageComponent = getComponent(
        fixture,
        'app-creator-page',
      ).componentInstance;

      expect(creatorPage.createEnabled).toBeFalse();

      component.groupForm = testForm;
      fixture.detectChanges();

      expect(creatorPage.createEnabled).toBeTrue();
    });
  });

  describe('onSelectionChanged()', () => {
    it('should set parent group as the first selected group', () => {
      const testGroups = getMuscleGroupsFixture();
      const expectedParent = testGroups[0];

      component.onSelectionChanged(testGroups);

      expect(component.parentGroup).toEqual(expectedParent);
    });

    it('should be triggered when an item is selected in group selector', () => {
      const spy = spyOn(component, 'onSelectionChanged');
      const groupSelector = getComponent(fixture, 'app-muscular-group-selector');

      groupSelector.triggerEventHandler('selectionChanged');

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onCreateClicked()', () => {
    it('should alert if there is missing data', () => {
      const alertSpy = spyOn(window, 'alert');

      component.onCreateClicked();

      expect(alertSpy).toHaveBeenCalledWith('You have missing properties');
    });

    it('should call service to create service if everything is ok', () => {
      const serviceSpy = spyOn(service, 'createGroup').and.returnValue(
        of(getMuscleGroupsFixture()[0]),
      );
      spyOn(location, 'back');

      component.groupForm = testForm;
      component.onCreateClicked();

      expect(serviceSpy).toHaveBeenCalled();
    });

    it('should be triggered by creator page component', () => {
      const spy = spyOn(component, 'onCreateClicked');
      const creatorPage = getComponent(fixture, 'app-creator-page');

      creatorPage.triggerEventHandler('onCreate');

      expect(spy).toHaveBeenCalled();
    });
  });
  describe('handleFormChanged()', () => {
    it('should update form data', () => {
      component.handleFormChanged(testForm);

      expect(component.groupForm.value.title).toBe(testTitle);
      expect(component.groupForm.value.description).toBe(testDescription);
    });

    it('should be triggered when form changes', () => {
      const spy = spyOn(component, 'handleFormChanged');
      const creatorPage = getComponent(fixture, 'app-creator-page');

      creatorPage.triggerEventHandler('formChanged');

      expect(spy).toHaveBeenCalled();
    });
  });
});
