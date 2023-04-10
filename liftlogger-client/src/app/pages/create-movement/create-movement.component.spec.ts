import { ComponentFixture, TestBed } from '@angular/core/testing';

import { environment } from 'src/environment/environment';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from '@auth0/auth0-angular';
import { FormsModule } from '@angular/forms';
import { CreateMovementComponent } from './create-movement.component';
import { CreatorPageComponent } from 'src/app/components/creator-page/creator-page.component';
import { MuscularGroupSelectorComponent } from 'src/app/components/muscular-group-selector/muscular-group-selector.component';
import { PageHeaderComponent } from 'src/app/components/page-header/page-header.component';
import { CreatorInputComponent } from 'src/app/components/creator-input/creator-input.component';
import { ButtonComponent } from 'src/app/components/button/button.component';

describe('CreateMovementComponent', () => {
  let component: CreateMovementComponent;
  let fixture: ComponentFixture<CreateMovementComponent>;

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
