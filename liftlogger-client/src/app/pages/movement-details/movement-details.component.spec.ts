import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementDetailsComponent } from './movement-details.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from '@auth0/auth0-angular';
import { environment } from 'src/environment/environment';
import { PageHeaderComponent } from 'src/app/components/page-header/page-header.component';
import { ContentLoaderComponent } from 'src/app/components/content-loader/content-loader.component';
import { GraphComponent } from 'src/app/components/graph/graph.component';
import { MovementJournalEntryComponent } from 'src/app/components/movement-journal-entry/movement-journal-entry.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

describe('MovementDetailsComponent', () => {
  let component: MovementDetailsComponent;
  let fixture: ComponentFixture<MovementDetailsComponent>;

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
