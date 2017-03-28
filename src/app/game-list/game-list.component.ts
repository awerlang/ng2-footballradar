import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameListComponent implements OnInit {

  @Input() games: any[];

  constructor() { }

  ngOnInit() {
  }

  trackByIndex(index: number, game: any): number {
    return index;
  }

}
