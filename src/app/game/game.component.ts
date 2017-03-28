import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: '[game]',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent implements OnInit {

  @Input() game: any;

  constructor() { }

  ngOnInit() {
  }

  trackByIndex(index: number, player: any): number {
    return index;
  }

  get score() {
    return `${this.game.score.home}-${this.game.score.away}`;
  }

  get teams() {
    return `${this.game.teams.home} - ${this.game.teams.away}`;
  }
}
