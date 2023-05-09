import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getElement, getElements, getComponent, getComponents } from './testing.helper';

/**
 * Fake component to test the testing helper functions.
 */
@Component({
  selector: 'test-fake-component',
  template: `<div>
    <h1>Welcome to my Angular Component!</h1>
    <p>This is a paragraph of text.</p>
    <p id="unique-id">This is another paragraph.</p>
    <p *ngIf="value" id="dynamic" class="dynamic">{{ value }}</p>
    <p *ngIf="value" class="dynamic">dynamic paragraph</p>
    <ul>
      <li class="list-item">Item 1</li>
      <li class="list-item">Item 2</li>
      <li class="list-item">Item 3</li>
    </ul>
    <a href="/">This is a link</a>
    <button>Click me!</button>
  </div> `,
})
export class FakeComponent {
  @Input() value: string;

  constructor() {}
}

describe('Testing Helper', () => {
  let fixture: ComponentFixture<FakeComponent>;
  let fakeComponent: FakeComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [FakeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FakeComponent);
    fakeComponent = fixture.componentInstance;

    fixture.detectChanges();
  });

  describe('getComponent', () => {
    it('should return the correct debugElement', () => {
      const uniqueElement = getComponent(fixture, '#unique-id');

      expect(uniqueElement.nativeElement).toBeInstanceOf(HTMLParagraphElement);
      expect(uniqueElement.nativeElement.textContent).toBe('This is another paragraph.');
    });

    it('should return the first matching element', () => {
      const listItem = getComponent(fixture, '.list-item');

      expect(listItem.nativeElement.textContent).toBe('Item 1');
    });

    it('should automatically get the latest updated component by default', () => {
      let dynamicComponent = getComponent(fixture, '#dynamic');
      expect(dynamicComponent).toBeFalsy();

      fakeComponent.value = 'value 1';

      dynamicComponent = getComponent(fixture, '#dynamic');
      expect(dynamicComponent).toBeTruthy();
    });

    it('should NOT get the latest updated component if detectChanges flag is set to false', () => {
      let dynamicComponent = getComponent(fixture, '#dynamic', false);
      expect(dynamicComponent).toBeFalsy();

      fakeComponent.value = 'value 1';

      dynamicComponent = getComponent(fixture, '#dynamic', false);
      expect(dynamicComponent).toBeFalsy();
    });
  });

  describe('getElement', () => {
    it('should return the correct nativeElement', () => {
      const uniqueElement: HTMLParagraphElement = getElement(fixture, '#unique-id');

      expect(uniqueElement).toBeInstanceOf(HTMLParagraphElement);
      expect(uniqueElement.textContent).toBe('This is another paragraph.');
    });

    it('should return the first matching element', () => {
      const listItem: HTMLLIElement = getElement(fixture, '.list-item');

      expect(listItem.textContent).toBe('Item 1');
    });

    it('should automatically get the latest updated component by default', () => {
      let dynamicElement: HTMLParagraphElement = getElement(fixture, '#dynamic');
      expect(dynamicElement).toBeFalsy();

      fakeComponent.value = 'value 1';

      dynamicElement = getElement(fixture, '#dynamic');
      expect(dynamicElement).toBeTruthy();
      expect(dynamicElement.textContent?.trim()).toBe('value 1');
    });

    it('should NOT get the latest updated component if detectChanges flag is set to false', () => {
      let dynamicElement: HTMLParagraphElement = getElement(fixture, '#dynamic', false);
      expect(dynamicElement).toBeFalsy();

      fakeComponent.value = 'value 1';

      dynamicElement = getElement(fixture, '#dynamic', false);
      expect(dynamicElement).toBeFalsy();
    });
  });

  describe('getComponents', () => {
    it('should return the correct list of debugElements', () => {
      const listItems = getComponents(fixture, '.list-item');
      const paragraphsItems = getComponents(fixture, 'p');
      const anchorItems = getComponents(fixture, 'a');

      expect(listItems).toHaveSize(3);
      listItems.forEach(item => expect(item.nativeElement).toBeInstanceOf(HTMLLIElement));

      expect(paragraphsItems).toHaveSize(2);
      paragraphsItems.forEach(item =>
        expect(item.nativeElement).toBeInstanceOf(HTMLParagraphElement),
      );

      expect(anchorItems).toHaveSize(1);
      anchorItems.forEach(item => expect(item.nativeElement).toBeInstanceOf(HTMLAnchorElement));
    });

    it('should automatically get the latest updated component by default', () => {
      let dynamicComponents = getComponents(fixture, '.dynamic');
      expect(dynamicComponents).toHaveSize(0);

      fakeComponent.value = 'value 1';

      dynamicComponents = getComponents(fixture, '.dynamic');
      expect(dynamicComponents).toHaveSize(2);
    });

    it('should NOT get the latest updated component if detectChanges flag is set to false', () => {
      let dynamicComponents = getComponents(fixture, '.dynamic', false);
      expect(dynamicComponents).toHaveSize(0);

      fakeComponent.value = 'value 1';

      dynamicComponents = getComponents(fixture, '.dynamic', false);
      expect(dynamicComponents).toHaveSize(0);
    });
  });

  describe('getElements', () => {
    it('should return the correct list of nativeElements', () => {
      const listItems: HTMLLIElement[] = getElements(fixture, '.list-item');
      const paragraphsItems: HTMLParagraphElement[] = getElements(fixture, 'p');
      const anchorItems: HTMLAnchorElement[] = getElements(fixture, 'a');

      expect(listItems).toHaveSize(3);
      expect(paragraphsItems).toHaveSize(2);
      expect(anchorItems).toHaveSize(1);
      expect(anchorItems[0].textContent).toBe('This is a link');
    });

    it('should automatically get the latest updated component by default', () => {
      let dynamicElements: HTMLParagraphElement[] = getElements(fixture, '.dynamic');
      expect(dynamicElements).toHaveSize(0);

      fakeComponent.value = 'value 1';

      dynamicElements = getElements(fixture, '.dynamic');
      expect(dynamicElements).toHaveSize(2);

      expect(dynamicElements[0].textContent?.trim()).toBe('value 1');
      expect(dynamicElements[1].textContent?.trim()).toBe('dynamic paragraph');
    });

    it('should NOT get the latest updated component if detectChanges flag is set to false', () => {
      let dynamicElements: HTMLParagraphElement[] = getElements(fixture, '.dynamic', false);
      expect(dynamicElements).toHaveSize(0);

      fakeComponent.value = 'value 1';

      dynamicElements = getElements(fixture, '.dynamic', false);
      expect(dynamicElements).toHaveSize(0);
    });
  });
});
