import { Observable } from 'rxjs';
import { RunHelpers, TestScheduler } from 'rxjs/testing';

/**
 * Represents input and output values for a mocked observable at specific marbles.
 */
export type MockedMarbleValues<TInputType = any, TOutputType = any> = Record<
  string,
  { input: TInputType; output: TOutputType }
>;

/**
 * Represents the mocked and expected observables for testing.
 */
export type MockedObservables<TInputType = any, TOutputType = any> = {
  /**
   * The mocked observable that emits input values based on the marble sequence.
   * Use this observable to simulate the input behavior of the tested observable or for an
   * observable that another observable may depend upon on.
   */
  mocked$: Observable<TInputType>;

  /**
   * The expected observable that emits the expected output values based on the marble sequence.
   * Use this observable to define the expected output behavior of the tested observable.
   */
  expected$: Observable<TOutputType>;
};

/**
 * A utility class for testing observables using marble diagrams.
 *
 * For more information, visit:
 * https://mokkapps.de/blog/how-i-write-marble-tests-for-rxjs-observables-in-angular.
 */
export class MarbleTester<TInputType = any, TOutputType = any> {
  private marbleSequence: string;
  private values: MockedMarbleValues<TInputType, TOutputType>;
  private scheduler: TestScheduler;

  /**
   * Creates an instance of MarbleTester.
   *
   * @param marbleSequence The string representing the marble diagram sequence
   * @param mockedValues The input and output values for the mocked observables
   * @param testSchedulerInstance The test scheduler instance to run the test
   */
  constructor(
    marbleSequence: string,
    mockedValues: MockedMarbleValues<TInputType, TOutputType>,
    testSchedulerInstance: TestScheduler,
  ) {
    this.marbleSequence = marbleSequence;
    this.values = mockedValues;
    this.scheduler = testSchedulerInstance;
  }

  /**
   * Runs the test callback with the mocked and expected observables.
   *
   * @param runCallback The callback function to run the test assertions
   */
  test(
    runCallback: (
      observables: MockedObservables<TInputType, TOutputType>,
      runHelpers: RunHelpers,
    ) => void,
  ) {
    const inputMarbleValues: Record<string, TInputType> = {};
    const outputMarbleValues: Record<string, TOutputType> = {};

    Object.keys(this.values).forEach(marble => {
      inputMarbleValues[marble] = this.values[marble].input;
    });

    Object.keys(this.values).forEach(marble => {
      outputMarbleValues[marble] = this.values[marble].output;
    });

    this.scheduler.run(runHelpers => {
      const mocked$ = runHelpers.cold(this.marbleSequence, inputMarbleValues);
      const expected$ = runHelpers.cold(this.marbleSequence, outputMarbleValues);

      runCallback({ mocked$, expected$ }, runHelpers);
    });
  }
}

/**
 * Creates a MarbleTester instance for testing observables using marble diagrams.
 *
 * @param marbleSequence The string representing the marble diagram sequence
 * @param values The input and output values for the mocked observables
 * @param scheduler The test scheduler instance to run the test
 * @returns A new MarbleTester instance
 */
export function createMarbleTest<TInputType = any, TOutputType = any>(
  marbleSequence: string,
  values: MockedMarbleValues<TInputType, TOutputType>,
  scheduler: TestScheduler,
) {
  return new MarbleTester<TInputType, TOutputType>(marbleSequence, values, scheduler);
}
