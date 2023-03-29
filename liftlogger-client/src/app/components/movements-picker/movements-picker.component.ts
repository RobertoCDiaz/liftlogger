import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MuscleGroup } from 'src/app/models/MuscleGroupModel';
import { Movement } from 'src/app/models/MovementModel';
import { GroupsService } from 'src/app/services/groups.service';

/**
 * Defines the state used inside the MovementsPickerComponent.
 */
export class MovementsPickerState {
  /**
   * Subject object to manage actions when a Movement is selected.
   */
  private movementSubject$ = new Subject<Movement>();

  /**
   * Whether `href` links should be disabled or not.
   * When `false`, each Movement item will act as a `a` tag, redirecting
   * the user to its details page on click.
   *
   * Defaults to `false`.
   */
  isHrefDisabledSubject: boolean = false;

  /**
   * Updates the steam for the `movementSubject`.
   * E.g. Sets a new Movement as "selected".
   *
   * @param movement Selected Movement
   */
  setMovement(movement: Movement) {
    this.movementSubject$.next(movement);
  }

  /**
   * Gets the selected Movements as they are clicked.
   *
   * @returns Observable for the selected Movements.
   */
  getSelectedMovement(): Observable<Movement> {
    return this.movementSubject$.asObservable();
  }
}

@Component({
  selector: 'app-movements-picker',
  templateUrl: './movements-picker.component.html',
  styleUrls: ['./movements-picker.component.sass'],
  providers: [MovementsPickerState],
})
export class MovementsPickerComponent {
  constructor(private groupsService: GroupsService, private state: MovementsPickerState) {}

  /**
   * List of the MuscleGroups from the current user.
   */
  userGroups: MuscleGroup[] = [];

  /**
   * List of available groups that satisfies the search query.
   */
  filteredGroups: MuscleGroup[] = [];

  /**
   * Fires up when a Movement is clicked.
   *
   * param: `$event` Selected Movement
   */
  @Output() movementSelected = new EventEmitter<Movement>();

  /**
   * Whether `href` links should be disabled or not.
   * When `false`, each Movement item will act as a `a` tag, redirecting
   * the user to its details page on click.
   *
   * Defaults to `false`.
   */
  @Input() disableHref: boolean = false;

  ngOnInit() {
    // retrieves groups from server
    this.groupsService.getUserGroups(true).subscribe(groups => {
      this.userGroups = groups;
      this.filteredGroups = this.userGroups;
    });

    // sets up the `movementSelected` event on Movement clicked
    this.state.getSelectedMovement().subscribe(movement => {
      this.movementSelected.emit(movement);
    });

    // sets `isHrefDisabledSubject` on this component's state
    this.state.isHrefDisabledSubject = this.disableHref;
  }

  /**
   * Handles the change on search query.
   *
   * @param query Current search query
   */
  handleQueryChange(query: string) {
    const resultGroups = this.groupsService.searchMovementsInGroups(query, [...this.userGroups]);
    this.filteredGroups = resultGroups;
  }
}
