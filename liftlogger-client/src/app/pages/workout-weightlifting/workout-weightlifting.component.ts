import { Component, EventEmitter, ViewChild, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Observable,
  catchError,
  combineLatest,
  map,
  merge,
  of,
  scan,
  share,
  startWith,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { WeightliftingTimerComponent } from 'src/app/components/weightlifting-timer/weightlifting-timer.component';
import { LiftingSetCreationParams } from 'src/app/models/LiftingSetModel';
import { MovementJournalEntry } from 'src/app/models/MovementJournalEntry';
import { Movement } from 'src/app/models/MovementModel';
import { MovementNote } from 'src/app/models/MovementNoteModel';
import { Template } from 'src/app/models/TemplateModel';
import { MovementJournalsService } from 'src/app/services/movement-journals.service';
import { MovementsService } from 'src/app/services/movements.service';
import { TemplatesService } from 'src/app/services/templates.service';

/**
 * Defines what data to use to start a new weightlifting session.
 */
export type StartFrom = {
  /**
   * Whether the weightlifting session is to be started from a Template or a Movement.
   */
  type: 'template' | 'movement';

  /**
   * Identifier for either the starting Movement or Template.
   */
  id: number;
};

/**
 * Defines the state of a weightlifting session.
 */
type WeightliftingState =
  | {
      /**
       * The user is currently working out doing a concrete Movement.
       */
      state: 'working-out';
      /**
       * Movement the user is currently training.
       */
      currentMovement: Movement;
    }
  | {
      /**
       * The user is picking a Movement to train next.
       */
      state: 'picking-movement';
    };

/**
 * Defines an operation made on a Set.
 */
export type SetOperation =
  | {
      /**
       * Create a new Set.
       */
      action: 'create_set';

      /**
       * Movement the new Set will belong to.
       */
      movement: Movement;
    }
  | (SetChangeRepOperationData & {
      /**
       * Change the number of repetitions of a set relative to current reps.
       */
      action: 'change_reps';
    })
  | (SetChangeWeightOperationData & {
      /**
       * Update the weight of a set.
       */
      action: 'set_weight';
    });

/**
 * Data required to perform a Change Reps operation on a set.
 */
type SetChangeRepOperationData = {
  /**
   * Set to be updated.
   */
  set: LiftingSetCreationParams;

  /**
   * Amount to be change. Positive values will increment current reps, negative will decrement.
   */
  delta: number;
};

/**
 * Data required to perform a Set Weight operation on a set.
 */
type SetChangeWeightOperationData = {
  /**
   * Set to be updated.
   */
  set: LiftingSetCreationParams;

  /**
   * New weight value.
   */
  weight: number;
};

@Component({
  selector: 'app-workout-weightlifting',
  templateUrl: './workout-weightlifting.component.html',
  styleUrls: ['./workout-weightlifting.component.sass'],
})
export class WorkoutWeightliftingComponent {
  templatesService: TemplatesService = inject(TemplatesService);
  movementsService: MovementsService = inject(MovementsService);
  journalsService: MovementJournalsService = inject(MovementJournalsService);
  route: ActivatedRoute = inject(ActivatedRoute);

  /**
   * Timer component.
   */
  @ViewChild('timer') timer: WeightliftingTimerComponent;

  /**
   * Event to be fired up when the user wants to open the Movement selection state.
   */
  pickMovementEvent$: EventEmitter<void> = new EventEmitter();

  /**
   * Event to be fired up when a user picks a Movement to perform. It emits the actual Movement
   * picked.
   */
  movementPickedEvent$: EventEmitter<Movement> = new EventEmitter();

  /**
   * Event to be fired to create a add a new Set. It must emit the Movement that new set will
   * belong to.
   */
  addSetEvent$: EventEmitter<Movement> = new EventEmitter();

  /**
   * Event to be fired when the amount of repetitions of a set is to be changed.
   * It will emit a SetChangeRepOperationData, which indicate on what Set the changes will be made
   * and the change to make.
   *
   * @see {@link SetChangeRepOperationData}
   */
  repsToEvent$: EventEmitter<SetChangeRepOperationData> = new EventEmitter();

  /**
   * Event to be fired when a change of weight is to be made on a Set.
   * It must emit an object containing the Set to change, as well as the `change` Event
   * from the weight input containing the new weight value.
   */
  setWeightToSetEvent$: EventEmitter<{ set: LiftingSetCreationParams; weight: Event }> =
    new EventEmitter();

  /**
   * Fires up to indicate that the previous MovementNote must be displayed.
   */
  prevNoteEvent: EventEmitter<void> = new EventEmitter();

  /**
   * Fires up to indicate that the next MovementNote must be displayed.
   */
  nextNoteEvent: EventEmitter<void> = new EventEmitter();

  /**
   * Stores the starting option to this weighlifting session.
   *
   * @see {@link StartFrom}
   */
  startFrom$: Observable<StartFrom | null> = this.route.queryParamMap.pipe(
    map(params => {
      const type = params.get('type');
      const id = params.get('id');

      if ((type !== 'movement' && type !== 'template') || !id) {
        return null;
      }

      return {
        type,
        id: parseInt(id),
      };
    }),
  );

  /**
   * Template requested by URL, if requested.
   */
  template$: Observable<Template | null> = this.startFrom$.pipe(
    switchMap(startFrom => {
      if (!startFrom || startFrom.type !== 'template') {
        return of(null);
      }

      return this.templatesService.getTemplate(startFrom.id);
    }),
    catchError(_ => {
      return of(null);
    }),
  );

  /**
   * List of movements available to train in this session. Could come from a template when the user
   * starts its session from a Template. It also could come up from a specific Movement selected by
   * the user prior to opening this page. And can be expanded using a Movement Picker Dialog.
   */
  movements$: Observable<Movement[]> = combineLatest([this.startFrom$, this.template$]).pipe(
    switchMap(([startFrom, template]) => {
      // If not start parameters are requested, it will empty.
      if (!startFrom) {
        return of([]);
      }

      if (template) {
        // If start parameters request a template, return that template's movements
        return of(template!.movements!.map(relation => relation.movement!) ?? []);
      }

      // At this point, a movement was used as start parameter.
      return this.movementsService
        .getMovement(startFrom.id)
        .pipe(map(startMovement => [startMovement]));
    }),
    catchError(_ => {
      // If an error is thrown, return empty list
      return of([]);
    }),
  );

  /**
   * Stores the current state of this weightlifting sessiong.
   */
  weightliftingState$: Observable<WeightliftingState> = merge(
    this.pickMovementEvent$.pipe(
      map<void, WeightliftingState>(_ => ({
        state: 'picking-movement',
      })),
    ),
    this.movementPickedEvent$.pipe(
      map<Movement, WeightliftingState>(movement => ({
        state: 'working-out',
        currentMovement: movement,
      })),
    ),
  ).pipe(
    share(),
    map<WeightliftingState, WeightliftingState>(state => state),
    startWith({ state: 'picking-movement' } as WeightliftingState),
  );

  /**
   * Stores the list of Sets of the current weightlifting session. It automatically reacts to changes
   * on Add and Update operations on the Sets.
   */
  sets$: Observable<LiftingSetCreationParams[]> = merge(
    this.addSetEvent$.pipe(
      map<Movement, SetOperation>(movement => ({
        action: 'create_set',
        movement,
      })),
    ),
    this.repsToEvent$.pipe(
      map<SetChangeRepOperationData, SetOperation>(event => ({
        action: 'change_reps',
        set: event.set,
        delta: event.delta,
      })),
    ),
    this.setWeightToSetEvent$.pipe(
      map<{ set: LiftingSetCreationParams; weight: Event }, SetOperation>(event => ({
        action: 'set_weight',
        set: event.set,
        weight: parseFloat((event.weight.target as HTMLInputElement).value),
      })),
    ),
  )
    .pipe(
      scan((allSets, operation) => {
        if (operation.action === 'create_set') {
          const similarSets = allSets.filter(set => set.movement_id === operation.movement.id);
          let lastSimilarSet: LiftingSetCreationParams | undefined;

          if (similarSets.length > 0) {
            lastSimilarSet = similarSets[similarSets.length - 1];
          }

          return [
            ...allSets,
            {
              reps: lastSimilarSet?.reps ?? 1,
              weight: lastSimilarSet?.weight ?? 1,
              movement_id: operation.movement.id,
            } satisfies LiftingSetCreationParams,
          ];
        }

        if (operation.action === 'set_weight') {
          allSets.find(set => set === operation.set)!.weight = operation.weight;
        }

        if (operation.action === 'change_reps') {
          const newReps = (allSets.find(set => set === operation.set)!.reps += operation.delta);

          if (newReps < 1) {
            return allSets.filter(set => set !== operation.set);
          }
        }

        return allSets;
      }, [] as LiftingSetCreationParams[]),
    )
    .pipe(share(), startWith([] as LiftingSetCreationParams[]));

  /**
   * For the current picked Movement, it retrieves its MovementJournal.
   * Returns `null` not in 'working-out' state.
   */
  currentMovementJournal$: Observable<MovementJournalEntry[] | null> =
    this.weightliftingState$.pipe(
      switchMap(state => {
        if (state.state === 'picking-movement') {
          return of(null);
        }

        return this.movementsService.getMovementJournal(state.currentMovement.id, true);
      }),
    );

  /**
   * Stores the current picked Movement's Notes, sorted by date in descending order (newest to
   * oldest).
   */
  currentMovementNotesList$: Observable<MovementNote[]> = this.weightliftingState$.pipe(
    switchMap(state => {
      if (state.state === 'picking-movement') {
        return of([]);
      }

      return this.movementsService
        .getMovementNotes(state.currentMovement.id)
        .pipe(map(notes => notes.sort((a, b) => (a.date > b.date ? -1 : 1))));
    }),
    share(),
    startWith([]),
  );

  /**
   * Stores the index of the MovementNote to display. It automatically reacts to next/prev actions.
   */
  currentMovementNoteIdx$: Observable<number> = merge(
    // because the list is ordered in as descending order, prev button actually increments idx
    this.prevNoteEvent.pipe(map(_ => 1)),
    // because the list is ordered in as descending order, next button actually decrements idx
    this.nextNoteEvent.pipe(map(_ => -1)),
    // we want to listen to current weighlifting state so we can reset the idx, 0 is just arbitrary
    this.weightliftingState$.pipe(map(_ => 0)),
  ).pipe(
    withLatestFrom(this.currentMovementNotesList$),
    scan((idx, [delta, notes]) => {
      if (!notes || delta === 0) {
        return 0;
      }

      if ((delta === 1 && idx === notes.length - 1) || (delta === -1 && idx === 0)) {
        return idx;
      }

      return idx + delta;
    }, 0),
    startWith(0),
  );

  /**
   * Current MovementNote to be displayed.
   */
  currentMovementNote$: Observable<MovementNote | null> = combineLatest([
    this.currentMovementNoteIdx$,
    this.currentMovementNotesList$,
  ]).pipe(
    map(([idx, notes]) => {
      if (notes.length === 0) {
        return null;
      }

      return notes[idx];
    }),
  );

  /**
   * View Model for the page. Stores whatever information is to be displayed in the template, so
   * only one subscription has to be made.
   */
  vm$ = combineLatest([
    this.template$,
    this.movements$,
    this.weightliftingState$,
    this.sets$,
    this.currentMovementJournal$,
    this.currentMovementNotesList$,
    this.currentMovementNoteIdx$,
    this.currentMovementNote$,
  ]).pipe(
    map(
      ([
        template,
        movements,
        weightliftingState,
        sets,
        currentMovementJournal,
        movementNotesList,
        currentMovementNoteIdx,
        currentMovementNote,
      ]) => {
        // We only want to display sets of current movement.
        const displaySets: LiftingSetCreationParams[] =
          weightliftingState.state === 'working-out'
            ? sets.filter(set => set.movement_id === weightliftingState.currentMovement.id)
            : [];

        // List of Movements ids that already have one set done
        const movementsInSets: number[] = movements
          .filter(movement => sets.map(set => set.movement_id).includes(movement.id))
          .map(m => m.id);

        // We are just interested in the best and last sessions for this Movement.
        const journal: {
          lastSession: MovementJournalEntry;
          bestSession: MovementJournalEntry;
        } | null =
          currentMovementJournal && currentMovementJournal.length > 0
            ? {
                lastSession: this.journalsService.getLastSession(currentMovementJournal),
                bestSession: this.journalsService.getBestSession(currentMovementJournal),
              }
            : null;

        // Group all MovementNotes related data together
        const notes: {
          list: MovementNote[];
          currentNote: MovementNote | null;
          noteIdx: number;
        } | null = movementNotesList
          ? {
              list: movementNotesList,
              currentNote: currentMovementNote,
              noteIdx: currentMovementNoteIdx,
            }
          : null;

        return {
          template,
          movements,
          weightliftingState,
          movementsInSets,
          sets: displaySets,
          journal,
          notes,
        };
      },
    ),
  );
}
