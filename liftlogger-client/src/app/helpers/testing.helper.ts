import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

/**
 * From a Component fixture, search in its DOM for a specific component using a selector.
 *
 * Selectors work as CSS identifiers. I.e. `div`,`app-page-header`, `.className`, `#id`, `button#createButton` are all valid selectors.
 *
 * @param fixture Component fixture
 * @param selector Unique selector for the element
 * @param detectChanges Whether the method should trigger `fixture.detectOnChanges()` or not. Defaults to false.
 * @returns DebugElement of the element
 */
export function getComponent(
  fixture: ComponentFixture<any>,
  selector: string,
  detectChanges: boolean = true,
): DebugElement {
  if (detectChanges) {
    fixture.detectChanges();
  }

  return fixture.debugElement.query(By.css(selector));
}

/**
 * Gets the `nativeElement` (i.e. the actual DOM instance) of an element with a specific selector.
 *
 * Selectors work as CSS identifiers. I.e. `div`,`app-page-header`, `.className`, `#id`, `button#createButton` are all valid selectors. *
 *
 * @param fixture Component fixture
 * @param selector Unique selector for the element
 * @param detectChanges Whether the method should trigger `fixture.detectOnChanges()` or not. Defaults to false.
 * @returns DOM element
 */
export function getElement<TElement>(
  fixture: ComponentFixture<any>,
  selector: string,
  detectChanges: boolean = true,
): TElement {
  if (detectChanges) {
    fixture.detectChanges();
  }

  return fixture.nativeElement.querySelector(selector);
}

/**
 * From a Component fixture, search in its DOM for a all the components that match a given selector.
 *
 * Selectors work as CSS identifiers. I.e. `div`,`app-page-header`, `.className`, `#id`, `button#createButton` are all valid selectors.
 *
 * @param fixture Component fixture
 * @param selector Selector to match element with
 * @param detectChanges Whether the method should trigger `fixture.detectOnChanges()` or not. Defaults to false.
 * @returns List of all the element in the fixture to match the selector
 */
export function getComponents(
  fixture: ComponentFixture<any>,
  selector: string,
  detectChanges: boolean = true,
): DebugElement[] {
  if (detectChanges) {
    fixture.detectChanges();
  }

  return fixture.debugElement.queryAll(By.css(selector));
}

/**
 * Gets the `nativeElements` (i.e. the actual DOM instances) of the elements with a specific selector.
 *
 * Selectors work as CSS identifiers. I.e. `div`,`app-page-header`, `.className`, `#id`, `button#createButton` are all valid selectors.
 *
 * @param fixture Component fixture
 * @param selector Unique selector for the element
 * @param detectChanges Whether the method should trigger `fixture.detectOnChanges()` or not. Defaults to false.
 * @returns DOM elements
 */
export function getElements<TElement>(
  fixture: ComponentFixture<any>,
  selector: string,
  detectChanges: boolean = true,
): TElement[] {
  if (detectChanges) {
    fixture.detectChanges();
  }

  return fixture.nativeElement.querySelectorAll(selector);
}
