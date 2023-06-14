import { Component, EventEmitter, Output } from '@angular/core';
import * as moment from 'moment';
import { Observable, interval, map, merge, scan, startWith, tap, withLatestFrom } from 'rxjs';

/**
 * Defines the different possible states for a timer.
 */
type TimerState = 'paused' | 'going' | 'finished' | 'not-started';

/**
 * Contains information on a timer that already finished.
 */
export type FinishedTime = {
  /**
   * Start time of the timer.
   */
  startTime: Date;

  /**
   * End time of the timer.
   */
  endTime: Date;

  /**
   * Total active time of the timer, expressed in seconds.
   */
  totalTime: number;
};

/**
 * Timer component for the Weightlifting page.
 */
@Component({
  selector: 'app-weightlifting-timer',
  templateUrl: './weightlifting-timer.component.html',
  styleUrls: ['./weightlifting-timer.component.sass'],
})
export class WeightliftingTimerComponent {
  /**
   * Event emitter for the start button click.
   */
  startClicked: EventEmitter<void> = new EventEmitter();

  /**
   * Event emitter for the pause button click.
   */
  pauseClicked: EventEmitter<void> = new EventEmitter();

  /**
   * Event emitter for the unpause button click.
   */
  unpauseClicked: EventEmitter<void> = new EventEmitter();

  /**
   * Event emitter for the stop button click.
   */
  stopClicked: EventEmitter<void> = new EventEmitter();

  /**
   * Start time of this timer, i.e. the moment START was pressed.
   */
  startTime: Date;

  /**
   * End time of this timer, i.e. the moment STOP was pressed.
   */
  endTime: Date;

  /**
   * Observable representing the current state of the timer.
   */
  timerState$: Observable<TimerState> = merge(
    this.startClicked.pipe<TimerState>(
      map(() => {
        this.startTime = new Date();

        return 'going';
      }),
    ),
    this.pauseClicked.pipe<TimerState>(map(() => 'paused')),
    this.unpauseClicked.pipe<TimerState>(map(() => 'going')),
    this.stopClicked.pipe<TimerState>(
      map(() => {
        this.endTime = new Date();

        return 'finished';
      }),
    ),
  ).pipe(startWith<TimerState>('not-started'));

  /**
   * Observable representing the elapsed time in seconds.
   */
  time$: Observable<number> = interval(1000).pipe(
    withLatestFrom(this.timerState$),
    scan((acc, [_, currentState]) => {
      if (currentState !== 'going') {
        return acc;
      }

      return acc + 1;
    }, 0),
  );

  /**
   * Observable representing the formatted time in the format "HH:mm:ss" or "mm:ss".
   */
  formattedTime$: Observable<string> = this.time$.pipe(
    map(time => {
      const duration = moment.duration(time, 'seconds');

      return moment
        .utc(duration.asMilliseconds())
        .format(duration.hours() > 0 ? 'HH:mm:ss' : 'mm:ss');
    }),
  );

  /**
   * Observable that emits the time value when the timer stops.
   * Emits `undefined` if the timer is not yet finished.
   */
  @Output() onTimerStop$: Observable<FinishedTime | undefined> = this.timerState$.pipe(
    withLatestFrom(this.time$),
    map(([timerState, time]) => {
      if (timerState !== 'finished') {
        return;
      }

      return {
        startTime: this.startTime,
        endTime: this.endTime,
        totalTime: time,
      } satisfies FinishedTime;
    }),
  );
}
