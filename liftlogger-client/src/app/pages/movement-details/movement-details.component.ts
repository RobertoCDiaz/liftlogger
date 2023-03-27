import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GraphInput } from 'src/app/components/graph/graph.component';
import { Movement } from 'src/app/models/Movement';
import { MovementJournalEntry } from 'src/app/models/MovementJournalEntry';
import { MovementJournalsService } from 'src/app/services/movement-journals.service';
import { MovementsService } from 'src/app/services/movements.service';
import * as moment from 'moment';

/**
 * Page that displays the details for a Movement.
 */
@Component({
  selector: 'app-movement-details',
  templateUrl: './movement-details.component.html',
  styleUrls: ['./movement-details.component.sass'],
})
export class MovementDetailsComponent {
  /**
   * Current Movement instance.
   */
  movement: Movement;

  loading: boolean = true;

  /**
   * Data to display inside the graph.
   */
  graphData: GraphInput[] = [];

  /**
   * Holds a history of the Movement's sessions and activity.
   */
  journal: MovementJournalEntry[] = [];

  /**
   * Date of the last Lifting Session in which this
   * Movement was trained.
   */
  lastTrainedDate: string;

  /**
   * Most recent workout journal entry for this Movement.
   */
  lastSession: MovementJournalEntry;

  /**
   * The Movement's session with the highest workout value.
   */
  bestSession: MovementJournalEntry;

  /**
   * Specific set of this Movement in which the heaviest weight was lifted, along
   * with how many reps were made.
   */
  prSet: MovementJournalEntry;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movementsService: MovementsService,
    private journalsService: MovementJournalsService,
  ) {}

  ngOnInit() {
    // gets the Movement id from route `/movements/:id`.
    this.route.paramMap.subscribe(r => {
      const movementId: number = parseInt(r.get('id') ?? '0');

      if (!movementId) {
        this.router.navigate(['movements']);
        return;
      }

      // fetches Movement with `id = routeId`.
      this.movementsService.getMovement(movementId).subscribe(movement => {
        if (!movement) {
          this.router.navigate(['movements']);
          return;
        }

        this.movement = movement;

        // fetches the Movement workout journal
        this.movementsService.getMovementJournal(movementId).subscribe(journal => {
          this.setupJournalInformation(journal);
          this.loading = false;
        });
      });
    });
  }

  /**
   * From a list of journal entries, setups all this page's information (like last-session info,
   * best session, graph data, etc).
   *
   * @param journal List of journal entries
   */
  private setupJournalInformation(journal: MovementJournalEntry[]) {
    if (journal.length === 0) {
      return;
    }

    this.journal = journal;

    this.lastSession = this.journalsService.getLastSession(this.journal);
    this.bestSession = this.journalsService.getBestSession(this.journal);
    this.prSet = this.journalsService.getPRSession(this.journal);

    this.lastTrainedDate = moment(this.lastSession.date).format('DD/MM/YYYY');

    // sets up the graph data from the journal entries
    this.graphData = this.journal.map(entry => ({
      date: entry.date,
      data: entry.value,
    }));
  }
}
