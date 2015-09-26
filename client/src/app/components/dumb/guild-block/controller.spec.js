'use strict';

describe('CraftingBlockController', function () {
  var rootScope;
  var mockGw2ApiService;
  var q;

  beforeEach(module('gw2armory'));
  beforeEach(function() {
    mockGw2ApiService = {};
  });

  var systemUnderTest = function (guid) {
    var ctrl;

    inject(function($controller, $rootScope, $q) {
      rootScope = $rootScope;
      q = $q;

      ctrl = $controller('GuildBlockController', { 
        gw2Service: mockGw2ApiService
      }, {
        guid: guid
      });
    });

    return ctrl;
  };

  it ('should set busy to true on instantiation', function () {
    var defer;

    mockGw2ApiService.readGuild = function() {
      defer = q.defer();
      return defer.promise;
    };

    var ctrl = systemUnderTest('1234');

    expect(ctrl.isBusy()).toBe(true);
  });

  it ('should set state on success', function () {
    var defer;

    mockGw2ApiService.readGuild = function() {
      defer = q.defer();
      return defer.promise;
    };

    spyOn(mockGw2ApiService, 'readGuild').and.callThrough();

    var ctrl = systemUnderTest('1234');

    var guild = {
      ayy: 'ayy'
    };

    defer.resolve(guild);
    rootScope.$apply();

    expect(mockGw2ApiService.readGuild).toHaveBeenCalledWith('1234');

    expect(ctrl.guild).toBe(guild);

    expect(ctrl.error).toBe(false);
    expect(ctrl.isBusy()).toBe(false);
    expect(ctrl.isLoaded()).toBe(true);
  });

  it ('should set state false on failure', function () {
    var defer;

    mockGw2ApiService.readGuild = function() {
      defer = q.defer();
      return defer.promise;
    };

    var ctrl = systemUnderTest('1234');

    defer.reject();
    rootScope.$apply();

    expect(ctrl.isLoaded()).toBe(false);
    expect(ctrl.isBusy()).toBe(false);
    expect(ctrl.error).toBe(true);
  });
});