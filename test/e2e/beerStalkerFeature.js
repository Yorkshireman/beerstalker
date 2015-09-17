describe('BeerStalker', function() {

  var searchBox = element(by.model('cityName'));
  var searchButton = element(by.className('btn'));

  beforeEach(function() {
    browser.get('http://localhost:8080');
  });

  it('has a title', function() {
    browser.get('http://localhost:8080');
    expect(browser.getTitle()).toEqual('BeerStalker');
  });

  it('finds events', function() {
    searchBox.sendKeys('London');
    searchButton.click();
    expect(element(by.binding('result.name')).getText()).toEqual('MiniBar x Braintree');
  });

  it('finds profiles in a list', function() {
    searchBox.sendKeys('London');
    searchButton.click();
    var events = element.all(by.repeater('result in searchResult'));
    expect(events.get(0).getText()).toEqual('MiniBar x Braintree 18:00 17 Sep 2015');
  });

});
