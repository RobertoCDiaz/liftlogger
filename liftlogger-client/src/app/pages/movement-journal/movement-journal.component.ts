import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Observable, switchMap } from 'rxjs';
import { Movement } from 'src/app/models/Movement';
import { MovementMonthlyJournal, MovementJournalEntry } from 'src/app/models/MovementJournalEntry';
import { MovementJournalsService } from 'src/app/services/movement-journals.service';
import { MovementsService } from 'src/app/services/movements.service';

/**
 * Page that displays the whole training history for a single Movement.
 */
@Component({
  selector: 'app-movement-journal',
  templateUrl: './movement-journal.component.html',
  styleUrls: ['./movement-journal.component.sass']
})
export class MovementJournalComponent {
  constructor(private movementsService: MovementsService, private journalsService: MovementJournalsService, private route: ActivatedRoute, private router: Router) { }

  /**
   * Movement to display.
   */
  movement: Movement;

  /**
   * List of monthly journals available for this Movement.
   *
   * @see {@link MovementMonthlyJournal}
   */
  monthlyJournals: MovementMonthlyJournal[] = [];

  /**
   * Whether the data to construct the view is still loading or not.
   */
  isLoading: boolean = true;

  ngOnInit() {
    // gets Movement data
    const movement$: Observable<Movement> = this.route.paramMap.pipe(
      switchMap(params => {
        const movementId: number = parseInt(params.get('id') ?? '0');

        return this.movementsService.getMovement(movementId);
      }),
    );

    // gets the JournalEntries for the current Movement
    const journal$: Observable<MovementJournalEntry[]> = movement$.pipe(
      switchMap(movement => {
        if (!movement) {
          this.router.navigate(['/movements']);
        }

        this.movement = movement;

        return this.movementsService.getMovementJournal(this.movement.id ?? 0, true);
      }),
    );

    journal$.subscribe(journal => {
      this.monthlyJournals = this.journalsService.getMonthyJournals(journal);

      this.isLoading = false;
    })
  }

  /**
   * From a MonthlyJournal, extract the dates (days of the month) in which
   * a workout with the current Movement was made.
   *
   * @param monthlyJounal Month to extract the days of
   * @returns List of days
   */
  getDayNumbers(monthlyJounal: MovementMonthlyJournal): number[] {
    return monthlyJounal.entries.map(e => moment(e.date * 1000).date());
  }

  /**
   * Takes a MonthlyJournal reference and returns the string representation of that month in the format
   * `MMMM, Y`. E.g: 'March, 2023', 'November, 2022', etc.
   *
   * @param monthlyJournal MonthlyJournal reference
   * @returns Name of the month
   */
  getMonthFormat(monthlyJournal: MovementMonthlyJournal) {
    return this.journalsService.getMonthlyJournalStringName(monthlyJournal);
  }
}
