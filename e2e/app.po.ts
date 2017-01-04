import { browser, element, by } from 'protractor';

export class Project30Page {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ch-root h1')).getText();
  }
}
