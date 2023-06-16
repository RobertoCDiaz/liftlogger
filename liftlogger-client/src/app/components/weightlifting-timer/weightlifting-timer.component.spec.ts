import {
  ComponentFixture,
  TestBed,
  discardPeriodicTasks,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { TimerState, WeightliftingTimerComponent } from './weightlifting-timer.component';
import { of } from 'rxjs';
import { getComponent, getElement } from 'src/app/helpers/testing.helper';
import { GlobalModule } from 'src/app/modules/global/global.module';
import { WorkoutModule } from 'src/app/modules/workout/workout.module';
import { AppModule } from 'src/app/app.module';
import { TestScheduler } from 'rxjs/testing';
import { SubscriberSpy, subscribeSpyTo } from '@hirez_io/observer-spy';
import { MockedMarbleValues, createMarbleTest } from 'src/app/helpers/marble-testing';

describe('WeightliftingTimerComponent', () => {
  let component: WeightliftingTimerComponent;
  let fixture: ComponentFixture<WeightliftingTimerComponent>;
  let scheduler: TestScheduler;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalModule, WorkoutModule, AppModule],
      declarations: [WeightliftingTimerComponent],
      providers: [{ provide: 'interval', useValue: of(50) }],
    }).compileComponents();

    fixture = TestBed.createComponent(WeightliftingTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('HTML View', () => {
    it('should display "Start Workout" if timerState is "not-started"', () => {
      component.timerState$ = of('not-started');
      fixture.detectChanges();

      const titleElement: HTMLParagraphElement = getElement(fixture, '.title');
      expect(titleElement.textContent?.trim()).toEqual('Start Workout');
    });

    it('should display "Weightlifting" if timerState is not "not-started"', () => {
      component.timerState$ = of('going');
      fixture.detectChanges();

      const titleElement: HTMLParagraphElement = getElement(fixture, '.title');
      expect(titleElement.textContent?.trim()).toEqual('Weightlifting');
    });

    it('should emit startClicked event on start button click', () => {
      spyOn(component.startClicked, 'emit');
      const startButton = getComponent(fixture, '#startButton');
      startButton.triggerEventHandler('click', null);

      expect(component.startClicked.emit).toHaveBeenCalled();
    });

    it('should emit pauseClicked event on pause button click', () => {
      spyOn(component.pauseClicked, 'emit');
      component.timerState$ = of('going');
      fixture.detectChanges();

      const pauseButton = getComponent(fixture, '#pauseButton');
      pauseButton.triggerEventHandler('click', null);

      expect(component.pauseClicked.emit).toHaveBeenCalled();
    });

    it('should emit unpauseClicked event on unpause button click', () => {
      spyOn(component.unpauseClicked, 'emit');
      component.timerState$ = of('paused');
      fixture.detectChanges();

      const unpauseButton = getComponent(fixture, '#unpauseButton');
      unpauseButton.triggerEventHandler('click', null);

      expect(component.unpauseClicked.emit).toHaveBeenCalled();
    });

    it('should emit stopClicked event on stop button click', () => {
      spyOn(component.stopClicked, 'emit');
      component.timerState$ = of('paused');
      fixture.detectChanges();

      const stopButton = getComponent(fixture, '#stopButton');
      stopButton.triggerEventHandler('click', null);

      expect(component.stopClicked.emit).toHaveBeenCalled();
    });

    it('should show formatted time in view', () => {
      const testFormattedTime = '02:01:23';

      component.formattedTime$ = of(testFormattedTime);

      const timeElement: HTMLParagraphElement = getElement(fixture, '.time');

      expect(timeElement.textContent?.trim()).toBe(testFormattedTime);
    });
  });

  describe('time$', () => {
    it('should increase 1 every second while timer going', fakeAsync(() => {
      const spy = subscribeSpyTo(component.time$);

      component.ngOnInit();

      // start timer
      component.startClicked.next();

      // wait 1 second
      tick(1000);
      expect(spy.getLastValue()).toBe(1);

      // wait another 20 seconds
      tick(20000);
      expect(spy.getLastValue()).toBe(21);

      // wait another 60 seconds
      tick(60000);
      expect(spy.getLastValue()).toBe(81);

      discardPeriodicTasks();
    }));

    it('should pause incrementing when timer paused', fakeAsync(() => {
      const spy = subscribeSpyTo(component.time$);

      component.ngOnInit();

      // start timer
      component.startClicked.next();

      // wait 1 second
      tick(1000);
      expect(spy.getLastValue()).toBe(1);

      // wait 1 second
      tick(1000);
      expect(spy.getLastValue()).toBe(2);

      // pause timer
      component.pauseClicked.next();

      // wait 1 second
      tick(1000);
      expect(spy.getLastValue()).toBe(2);

      // wait 1 second
      tick(1000);
      expect(spy.getLastValue()).toBe(2);

      // unpause timer
      component.unpauseClicked.next();

      // wait 1 second
      tick(1000);
      expect(spy.getLastValue()).toBe(3);

      // wait 1 second
      tick(1000);
      expect(spy.getLastValue()).toBe(4);

      discardPeriodicTasks();
    }));

    it('should not increase if timer not-started', fakeAsync(() => {
      const spy = subscribeSpyTo(component.time$);

      component.ngOnInit();

      // wait 1 second
      tick(1000);
      expect(spy.getLastValue()).toBe(0);

      // wait another 20 seconds
      tick(20000);
      expect(spy.getLastValue()).toBe(0);

      // wait another 60 seconds
      tick(60000);
      expect(spy.getLastValue()).toBe(0);

      discardPeriodicTasks();
    }));
  });

  describe('formattedTime$', () => {
    it('should properly format current time', fakeAsync(() => {
      const values: MockedMarbleValues<number, string> = {
        a: { input: 0, output: '00:00' },
        b: { input: 12, output: '00:12' },
        c: { input: 65, output: '01:05' },
        d: { input: 6000, output: '01:40:00' },
        e: { input: 950, output: '15:50' },
      };

      createMarbleTest<number, string>('d-a-b-c-d-e|', values, scheduler).test(
        (observables, { expectObservable }) => {
          component.time$ = observables.mocked$;

          component.ngOnInit();

          expectObservable(component.formattedTime$).toEqual(observables.expected$);
        },
      );
    }));
  });

  describe('timerState', () => {
    let spy: SubscriberSpy<TimerState>;

    beforeEach(() => {
      spy = subscribeSpyTo(component.timerState$);
    });

    it('should have not started as initial state', () => {
      expect(spy.getLastValue()).toBe('not-started');
    });

    it('should properly emit states when click events are fired', () => {
      expect(spy.getLastValue()).toBe('not-started');

      component.startClicked.next();
      expect(spy.getLastValue()).toBe('going');

      component.pauseClicked.next();
      expect(spy.getLastValue()).toBe('paused');

      component.unpauseClicked.next();
      expect(spy.getLastValue()).toBe('going');

      component.stopClicked.next();
      expect(spy.getLastValue()).toBe('finished');
    });
  });

  describe('onTimerStop$()', () => {
    const testStart = new Date('2023-06-15T16:02:11');
    const testEnd = new Date('2023-06-15T17:04:22');
    const testTime = 45;

    it('should properly emit finished values when timerState is finished', () => {
      component.startTime = testStart;
      component.endTime = testEnd;
      component.timerState$ = of('finished');
      component.time$ = of(testTime);

      component.ngOnInit();

      component.onTimerStop$.subscribe(result => {
        expect(result).toBeTruthy();
        expect(result?.totalTime).toBe(testTime);
        expect(result?.startTime).toEqual(testStart);
        expect(result?.endTime).toEqual(testEnd);
      });
    });

    it('should emit undefined if timer not yet finished', () => {
      component.startTime = testStart;
      component.endTime = testEnd;
      component.timerState$ = of('going');
      component.time$ = of(testTime);

      component.ngOnInit();

      component.onTimerStop$.subscribe(result => {
        expect(result).toBeFalsy();
      });
    });
  });
});
