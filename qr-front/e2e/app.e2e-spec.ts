import { QrdingerPage } from './app.po';

describe('qrdinger App', function() {
  let page: QrdingerPage;

  beforeEach(() => {
    page = new QrdingerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
