'use strict';

describe('The login page', function () {
  var page;

  beforeEach(function () {
    browser.get('/login');
    page = require('../page-objects/login.po');
  });

  it('should include h1 text', function() {
    expect(page.title.getText()).toBe('Join The Club');
    // expect(page.imgEl.getAttribute('src')).toMatch(/assets\/images\/yeoman.png$/);
    // expect(page.imgEl.getAttribute('alt')).toBe('I\'m Yeoman');
  });
});
