import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';
import { FormsModule } from '@angular/forms';
import { getElement } from 'src/app/helpers/testing.helper';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchBarComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger changeQuery when search input changes', () => {
    const spy = spyOn(component, 'changeQuery');

    const searchInput: HTMLInputElement = getElement(fixture, '#search-input');

    searchInput.value = 'anything';
    searchInput.dispatchEvent(new Event('input'));

    expect(spy).toHaveBeenCalled();
  });

  it('should set query as the value of the search input', () => {
    const testQuery = 'this is a test query';
    const searchInput: HTMLInputElement = getElement(fixture, '#search-input');

    searchInput.value = testQuery;
    searchInput.dispatchEvent(new Event('input'));

    expect(component.query).toBe(testQuery);
  });

  describe('changeQuery', () => {
    it('should trigger queryChanged event', () => {
      const spy = spyOn(component.queryChanged, 'emit');

      component.changeQuery();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('queryChanged event', () => {
    it('should emit the query value', () => {
      const testQuery = 'this is a test query';

      let emitted: string = '';
      component.queryChanged.subscribe(query => {
        emitted = query;
      });

      component.query = testQuery;
      component.changeQuery();

      expect(emitted).toBe(testQuery);
    });
  });
});
