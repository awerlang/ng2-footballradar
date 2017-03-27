import { Ng2FootballradarPage } from './app.po';

describe('ng2-footballradar App', () => {
  let page: Ng2FootballradarPage;

  beforeEach(() => {
    page = new Ng2FootballradarPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
