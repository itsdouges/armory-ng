describe('characterviewer controller', function () {
  var mockCharacterService;
  var mockStateParams;
  var mockMessageService;
  var mockBusyService;

  var rootScope;

  beforeEach(module('gw2armory'));
  beforeEach(function() {
    mockCharacterService = {};
    mockStateParams = {};
    mockBusyService = {
      setBusy: function() {}
    };
    mockMessageService = {
      clear: function() {},
      setError: function() {}
    };
  });

  var systemUnderTest = function () {
    var ctrl;

    inject(function($controller, $rootScope) {
      rootScope = $rootScope;

      ctrl = $controller('CharacterViewerController', { 
        characterService: mockCharacterService,
        $stateParams: mockStateParams,
        messageService: mockMessageService,
        busyService: mockBusyService
      });
    });

    return ctrl;
  };

  it('should set isBusy to true while a loadingCharacter', function () {
    inject(function($q) { 
      mockCharacterService.readCharacter = function () { 
        var deferred = $q.defer();
        return deferred.promise; 
      };
    });

    spyOn(mockBusyService, 'setBusy');
    
    var ctrl = systemUnderTest();

    expect(mockBusyService.setBusy).toHaveBeenCalledWith(true);
  });

  it('should call readCharacter with stateParams input when loading a character', function () {
    var deferred;

    inject(function($q)  { 
      deferred = $q.defer();

      mockCharacterService.readCharacter = function () { 
        return deferred.promise; 
      };
    });

    mockStateParams.name = 'charname';

    spyOn(mockCharacterService, 'readCharacter').and.callThrough();

    var ctrl = systemUnderTest();

    expect(mockCharacterService.readCharacter).toHaveBeenCalledWith('charname');
  });

  it('should call messageService clear when loading a character', function () {
    var deferred;

    inject(function($q)  { 
      deferred = $q.defer();

      mockCharacterService.readCharacter = function () { 
        return deferred.promise; 
      };
    });

    spyOn(mockMessageService, 'clear');

    var ctrl = systemUnderTest();

    expect(mockMessageService.clear).toHaveBeenCalledWith();
  });

  it('should set isBusy to false when loading was a success', function () {
    var deferred;

    inject(function($q)  { 
      deferred = $q.defer();

      mockCharacterService.readCharacter = function () { 
        return deferred.promise; 
      };
    });

    spyOn(mockBusyService, 'setBusy');

    var ctrl = systemUnderTest();

    deferred.resolve();
    rootScope.$apply();

    expect(mockBusyService.setBusy).toHaveBeenCalledWith(false);
  });

  it('should set isBusy to false when loading was a failure', function () {
    var deferred;

    inject(function($q)  { 
      deferred = $q.defer();

      mockCharacterService.readCharacter = function () { 
        return deferred.promise; 
      };
    });

    spyOn(mockBusyService, 'setBusy');

    var ctrl = systemUnderTest();

    deferred.reject();
    rootScope.$apply();

    expect(mockBusyService.setBusy).toHaveBeenCalledWith(false);
  });

  it('should null the current character if a failure occured', function () {
    var deferred;

    inject(function($q)  { 
      deferred = $q.defer();

      mockCharacterService.readCharacter = function () { 
        return deferred.promise; 
      };
    });

    var ctrl = systemUnderTest();

    deferred.reject();
    rootScope.$apply();

    expect(ctrl.currentCharacter()).toBe(null);
  });

  it('should not call setError if no message is returned on failure', function () {
    var deferred;

    inject(function($q)  { 
      deferred = $q.defer();

      mockCharacterService.readCharacter = function () { 
        return deferred.promise; 
      };
    });

    spyOn(mockMessageService, 'setError');

    var ctrl = systemUnderTest();

    deferred.reject();
    rootScope.$apply();

    expect(mockMessageService.setError).not.toHaveBeenCalledWith();
  });

  it('should call setError if a message is returned on failure', function () {
    var deferred;

    inject(function($q)  { 
      deferred = $q.defer();

      mockCharacterService.readCharacter = function () { 
        return deferred.promise; 
      };
    });

    spyOn(mockMessageService, 'setError');

    var message = 'An error occurred bro';
    var ctrl = systemUnderTest();

    deferred.reject(message);
    rootScope.$apply();

    expect(mockMessageService.setError).toHaveBeenCalledWith(message);
  });

  it('should set the current character on success', function () {
    var deferred;

    inject(function($q)  { 
      deferred = $q.defer();

      mockCharacterService.readCharacter = function () { 
        return deferred.promise; 
      };
    });

    var character = {};

    var ctrl = systemUnderTest();

    deferred.resolve(character);
    rootScope.$apply();

    expect(ctrl.currentCharacter()).toBe(character);
  });
});