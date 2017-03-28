import faker from 'faker';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/delay';
import deepFreeze from 'deep-freeze-strict';

const EVENT_INTERVAL = 1000;

export function createStore(noOfGames) {

  let _state;

  const sub = createGames(noOfGames).subscribe((games) => _state = games);

  return {
    // enforce some immutability on the state
    get state() {
      return _state;
    },

    set state(x) {
      throw new Error('State cannot be modified from outside');
    }
  };
}

export function createGames(noOfGames = 5) {
  const games = Array.apply(null, { length: noOfGames }).map(Number.call, Number)
    .map(createGame);

  return Observable.combineLatest(...games, (...args) => args);
}

export function createGame(delay) {
  const initialGame = generateFakeGame();
  return Observable.interval(EVENT_INTERVAL)
    .flatMap((i) => {
      const $ = Observable.of(i);
      return i === 0 ? $ : $.delay(delay * 1000);
    })
    .scan((game, tick) => {
      return updateGame(game);
    }, initialGame)
    .startWith(initialGame);
}

function updateGame(game) {
  game = Object.assign({}, game);
  game.clock = game.clock + 1;

  maybeUpdate(5, () => game.score = Object.assign({}, game.score, { home: game.score.home + 1 }));
  maybeUpdate(5, () => game.score = Object.assign({}, game.score, { away: game.score.away + 1 }));

  maybeUpdate(8, () => game.cards = Object.assign({}, game.cards, { yellow: game.cards.yellow + 1 }));
  maybeUpdate(2, () => game.cards = Object.assign({}, game.cards, { red: game.cards.red + 1 }));

  maybeUpdate(10, () => game.outrageousTackles = game.outrageousTackles + 1);

  const randomPlayerIndex = randomNum(0, 4);
  const effortLevel = randomNum();
  const invitedNextWeek = faker.random.boolean();

  game.players = game.players.slice(0, randomPlayerIndex).concat({
    name: game.players[randomPlayerIndex].name,
    effortLevel: effortLevel,
    invitedNextWeek: invitedNextWeek,
  }, game.players.slice(randomPlayerIndex + 1));

  return game;
}

function generateFakeGame() {
  return deepFreeze({
    id: faker.random.uuid(),
    clock: 0,
    score: {
      home: 0,
      away: 0
    },
    teams: {
      home: faker.address.city(),
      away: faker.address.city()
    },
    outrageousTackles: 0,
    cards: {
      yellow: 0,
      red: 0
    },
    players: [1, 2, 3, 4, 5].map(generateFakePlayer)
  });
}

function generateFakePlayer() {
  return {
    name: faker.name.findName(),
    effortLevel: randomNum(),
    invitedNextWeek: faker.random.boolean()
  };
}

function maybeUpdate(prob, fn) {
  const num = randomNum(0, 100);
  if (num <= prob) {
    fn();
  }
}

function randomNum(min?, max?) {
  min = min || 0;
  max = max || 10;
  return faker.random.number({
    'min': min,
    'max': max
  });
}
