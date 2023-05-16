import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { MuscleGroup, WithMuscleGroupMetadata } from 'src/app/models/MuscleGroupModel';
import { GroupsService } from 'src/app/services/groups.service';
import {
  BehaviorSubject,
  Observable,
  catchError,
  combineLatest,
  of,
  startWith,
  switchMap,
  throwError,
} from 'rxjs';

/**
 * Holds how many times a MuscleGroup was trained on in a specific date.
 */
export type TrainedDate = {
  /**
   * Date representation in 'YYYY-MM-DD' format.
   */
  date: string;

  /**
   * Number of sets made during this date.
   */
  count: number;
};

@Component({
  selector: 'app-musclegroups-details',
  templateUrl: './musclegroups-details.component.html',
  styleUrls: ['./musclegroups-details.component.sass'],
})
export class MusclegroupsDetailsComponent implements OnInit {
  router: Router = inject(Router);
  groupsService: GroupsService = inject(GroupsService);
  route: ActivatedRoute = inject(ActivatedRoute);

  /**
   * MuscleGroup to be displayed in the view.
   */
  group$: Observable<WithMuscleGroupMetadata<MuscleGroup>>;

  /**
   * Controls which month are we currently displaying in the calendar view.
   */
  currentMonthSubject: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment());

  /**
   * Observable reference to which month we are currently displaying in the view.
   */
  currentMonth$ = this.currentMonthSubject.asObservable();

  /**
   * List of the dates within current month in which the Muscle Group was trained on.
   */
  trainedDates$: Observable<TrainedDate[]>;

  /**
   * A set containing only the days of the month in which the MuscleGroup was trained on.
   */
  trainedDays$: Observable<Set<number>> = of(new Set([]));

  ngOnInit(): void {
    this.group$ = this.route.paramMap.pipe(
      // get group id and fetch group
      switchMap(params => {
        const groupId: number = parseInt(params.get('id') ?? '-1');

        return this.groupsService.getGroup(groupId, true, true);
      }),
      // if no group found, redirect back
      catchError((_, __) => {
        alert('No group with such ID was found!');
        this.router.navigate(['/muscle-groups']);

        return throwError(() => {
          return 'No group with such ID was found in the user library';
        });
      }),
    );

    this.trainedDates$ = combineLatest([this.group$, this.currentMonth$]).pipe(
      switchMap(([group, month]) => {
        return of(
          this.getTrainedDatesArray(
            group.metadata?.trained_dates!,
            month.startOf('month').format('YYYY-MM-DD'),
            month.endOf('month').format('YYYY-MM-DD'),
          ),
        );
      }),
    );

    this.trainedDays$ = this.trainedDates$.pipe(
      switchMap(dates => {
        return of(new Set(dates.map(date => moment(date.date).date())));
      }),
      startWith(new Set([])),
    );
  }

  /**
   * Modifies the current month in display. You can either go forward or backward one month
   * at the time.
   *
   * @param factor Whether we want to increment o decrement the current month. `1` goes one month forward, while `-1` goes one month back.
   */
  changeMonth(factor: 1 | -1) {
    const result: moment.Moment = this.currentMonthSubject.value
      .add(factor, 'months')
      .startOf('month');

    this.currentMonthSubject.next(result);
  }

  /**
   * Converts a `moment.Moment` object into its `Date` equivalent.
   *
   * @param momentObj Moment instance to convert
   * @returns Date equivalent
   */
  momentToDate(momentObj: moment.Moment): Date {
    return new Date(momentObj.format('YYYY-MM-DD'));
  }

  /**
   * Takes in a Date object (or nothing) and returns a proper string
   * representation of the Date.
   *
   * @param date Date to format
   * @returns Formatted string
   */
  formatDate(date?: Date): string {
    if (!date) {
      return '-';
    }

    return moment(date).format('MMM Do, Y');
  }

  /**
   * Takes in the `trained_dates` property of the metadata of a MuscleGroup and transforms it
   * into a more convenient shape. It is able to narrow down the dates we transform using `start`
   * and `end` as a date interval.
   *
   * @see {@link TrainedDate}
   *
   * @param trainedDates Object containing trained dates in the format that comes from the server
   * @param start From whem we want to get the trained dates. Defaults to start of time
   * @param end Until when we want to get trained dates. Defaults to current time
   * @returns List of transformed dates
   */
  getTrainedDatesArray(
    trainedDates: Record<string, number>,
    start?: string,
    end?: string,
  ): TrainedDate[] {
    const result: TrainedDate[] = [];

    for (let [date, count] of Object.entries(trainedDates)) {
      result.push({
        date,
        count,
      });
    }

    const startDate = moment(start ?? 0);
    const endDate = moment(end);

    return result.filter(trainedDate => {
      const currentDate = moment(trainedDate.date);

      return currentDate >= startDate && currentDate <= endDate;
    });
  }
}
