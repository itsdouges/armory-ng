describe('characterviewer controller', function () {
  var mockHttp;

  beforeEach(module('gw2armory'));
  beforeEach(function() {
    mockHttp = {};
  });

  var systemUnderTest = function () {
    var service;

    inject(function($service) {
      service = $service('CharacterService', { 
        $http: mockHttp
      });
    });

    return service;
  };

  it('should translate character as expect', function () {

  });
});