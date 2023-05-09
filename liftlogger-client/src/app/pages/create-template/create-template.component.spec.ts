import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTemplateComponent } from './create-template.component';
import { environment } from 'src/environment/environment';
import { AuthModule } from '@auth0/auth0-angular';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CreatorPageComponent } from 'src/app/components/creator-page/creator-page.component';
import { PageHeaderComponent } from 'src/app/components/page-header/page-header.component';
import { CreatorInputComponent } from 'src/app/components/creator-input/creator-input.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { TemplateMovementsListComponent } from 'src/app/components/template-movements-list/template-movements-list.component';
import { TemplateMovementItemComponent } from 'src/app/components/template-movement-item/template-movement-item.component';

describe('CreateTemplateComponent', () => {
  let component: CreateTemplateComponent;
  let fixture: ComponentFixture<CreateTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CreateTemplateComponent,
        CreatorPageComponent,
        PageHeaderComponent,
        CreatorInputComponent,
        ButtonComponent,
        TemplateMovementsListComponent,
        TemplateMovementItemComponent,
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

    fixture = TestBed.createComponent(CreateTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
