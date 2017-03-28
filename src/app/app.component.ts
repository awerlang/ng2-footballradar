import { Component, ChangeDetectionStrategy } from '@angular/core';

import { createGames } from './app.data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  games = createGames(50);
}
