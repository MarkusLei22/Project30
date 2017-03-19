import { Project30Page } from './app.po';

describe('project30 App', () => {
  let page: Project30Page;

  beforeEach(() => {
    page = new Project30Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
