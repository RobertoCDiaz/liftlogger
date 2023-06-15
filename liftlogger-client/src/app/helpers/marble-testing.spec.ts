import { MarbleTester } from './marble-testing';
import { createMarbleTest, MockedMarbleValues, MockedObservables } from './marble-testing';
import { TestScheduler } from 'rxjs/testing';

describe('createMarbleTest', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      // Custom comparison logic if needed
      // For example, deep equality assertion
      expect(actual).toEqual(expected);
    });
  });

  it('should create a MarbleTester instance with the provided values', () => {
    // Define the mock observable values
    const values: MockedMarbleValues<number, string> = {
      a: { input: 1, output: 'A' },
      b: { input: 2, output: 'B' },
      c: { input: 3, output: 'C' },
    };

    // Create the MarbleTester instance
    const tester = createMarbleTest('a-b-c|', values, scheduler);

    // Assert the properties of the tester instance
    expect(tester instanceof MarbleTester).toBe(true);
    expect(tester['marbleSequence']).toBe('a-b-c|');
    expect(tester['values']).toBe(values);
    expect(tester['scheduler']).toBe(scheduler);
  });

  it('should execute the test callback with the mocked and expected observables', () => {
    // Define the mock observable values
    const values: MockedMarbleValues<number, string> = {
      a: { input: 1, output: 'A' },
      b: { input: 2, output: 'B' },
      c: { input: 3, output: 'C' },
    };

    // Create the MarbleTester instance
    const tester = createMarbleTest('a-b-c|', values, scheduler);

    // Spy on the test callback function
    const callbackSpy = jasmine.createSpy('callback');

    // Run the test
    tester.test((observables: MockedObservables<number, string>) => {
      callbackSpy(observables);
    });

    // Expect the callback to have been called with the mocked and expected observables
    expect(callbackSpy).toHaveBeenCalledTimes(1);
    const callbackArguments = callbackSpy.calls.first().args[0];
    expect(callbackArguments.mocked$).toBeDefined();
    expect(callbackArguments.expected$).toBeDefined();
  });

  it('should properly create the mocked$ and expected$ observables', () => {
    const testMarbles = 'a-b-c|';
    const values: MockedMarbleValues<number, string> = {
      a: { input: 1, output: 'A' },
      b: { input: 2, output: 'B' },
      c: { input: 3, output: 'C' },
    };

    createMarbleTest(testMarbles, values, scheduler).test((obs, helpers) => {
      const expectedMocked$ = helpers.cold(testMarbles, { a: 1, b: 2, c: 3 });
      const expectedExpected$ = helpers.cold(testMarbles, { a: 'A', b: 'B', c: 'C' });

      helpers.expectObservable(obs.mocked$).toEqual(expectedMocked$);
      helpers.expectObservable(obs.expected$).toEqual(expectedExpected$);
    });
  });
});
