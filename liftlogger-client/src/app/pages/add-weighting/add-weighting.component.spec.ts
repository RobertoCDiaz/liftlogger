import { ComponentFixture, TestBed } from '@angular/core/testing';

import { environment } from 'src/environment/environment';
import { AuthModule } from '@auth0/auth0-angular';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AddWeightingComponent } from './add-weighting.component';
import { PageHeaderComponent } from 'src/app/components/page-header/page-header.component';
import { WeightscaleDataInputComponent } from 'src/app/components/weightscale-data-input/weightscale-data-input.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { GraphComponent } from 'src/app/components/graph/graph.component';

describe('AddWeightingComponent', () => {
  let component: AddWeightingComponent;
  let fixture: ComponentFixture<AddWeightingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AddWeightingComponent,
        PageHeaderComponent,
        WeightscaleDataInputComponent,
        ButtonComponent,
        GraphComponent,
      ],
      imports: [
        FormsModule,
        AuthModule.forRoot({
          domain: environment.auth0Domain,
          clientId: environment.auth0ClientId,
          authorizationParams: {
            redirect_uri: environment.auth0CallbackUrl,
            audience: environment.auth0Audience,
          },
        }),
        HttpClientModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddWeightingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
