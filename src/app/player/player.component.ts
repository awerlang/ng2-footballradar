import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: '[player]',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent implements OnInit {

  @Input() player: any;

  constructor() { }

  ngOnInit() {
  }

  get effortClass() {
    return 'player__effort ' + (this.player.effortLevel < 5 ? 'player__effort--low' : 'player__effort--high');
  }

  get nextWeekMsg() {
    return this.player.invitedNextWeek ? 'Not coming again' : 'Doing well';
  }

}
