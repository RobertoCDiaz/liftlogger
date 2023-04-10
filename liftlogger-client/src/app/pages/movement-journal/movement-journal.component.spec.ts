import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementJournalComponent } from './movement-journal.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from '@auth0/auth0-angular';
import { environment } from 'src/environment/environment';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from 'src/app/components/page-header/page-header.component';

describe('MovementJournalComponent', () => {
  let component: MovementJournalComponent;
  let fixture: ComponentFixture<MovementJournalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovementJournalComponent, PageHeaderComponent],
      imports: [
        HttpClientModule,
        RouterModule.forRoot([]),
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

    fixture = TestBed.createComponent(MovementJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
