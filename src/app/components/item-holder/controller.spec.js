describe('item controller', function () {
	var mockGw2ApiService;
	var rootScope;

	beforeEach(module('gw2armory'));
  beforeEach(function() {
    mockGw2ApiService = {};
  });

  var systemUnderTest = function (mockId, mockType) {
    var ctrl;

    inject(function($controller, $rootScope) {
      rootScope = $rootScope;

      ctrl = $controller('ItemHolderController', { 
        gw2ApiService: mockGw2ApiService
      }, {
        id: mockId,
        type: mockType
      });
    });

    return ctrl;
  };

  it('should call readItem on instantiation', function () {
    inject(function($q) { 
      mockGw2ApiService.readItem = function () { 
        var deferred = $q.defer();
        return deferred.promise; 
      };
    });

  	spyOn(mockGw2ApiService, 'readItem').and.callThrough();

  	var ctrl = systemUnderTest(1);

  	expect(mockGw2ApiService.readItem).toHaveBeenCalled();
  });

  it('should set busy to true on instantiation', function () {
    inject(function($q) { 
      mockGw2ApiService.readItem = function () { 
        var deferred = $q.defer();
        return deferred.promise; 
      };
    });

  	spyOn(mockGw2ApiService, 'readItem').and.callThrough();

  	var ctrl = systemUnderTest(1);

  	expect(ctrl.isBusy()).toBe(true);
  });

  it('should set loaded to false on instantiation', function () {
    inject(function($q) { 
      mockGw2ApiService.readItem = function () { 
        var deferred = $q.defer();
        return deferred.promise; 
      };
    });

  	spyOn(mockGw2ApiService, 'readItem').and.callThrough();

  	var ctrl = systemUnderTest(1);

  	expect(ctrl.isLoaded()).toBe(false);
  });

  it('should set busy to false on api failure', function () {
    var deferred;

    inject(function($q) { 
    	deferred = $q.defer();

      mockGw2ApiService.readItem = function () { 
        return deferred.promise; 
      };
    });

  	spyOn(mockGw2ApiService, 'readItem').and.callThrough();

  	var ctrl = systemUnderTest(1);

  	deferred.reject();
  	rootScope.$apply();

  	expect(ctrl.isBusy()).toBe(false);
  });

  it('should set loaded to false on api failure', function () {
    var deferred;

    inject(function($q) { 
    	deferred = $q.defer();

      mockGw2ApiService.readItem = function () { 
        return deferred.promise; 
      };
    });

  	spyOn(mockGw2ApiService, 'readItem').and.callThrough();

  	var ctrl = systemUnderTest(1);

  	deferred.reject();
  	rootScope.$apply();

  	expect(ctrl.isLoaded()).toBe(false);
  });

  it('should set busy to false on api success', function () {
    var deferred;

    inject(function($q) { 
    	deferred = $q.defer();

      mockGw2ApiService.readItem = function () { 
        return deferred.promise; 
      };
    });

  	spyOn(mockGw2ApiService, 'readItem').and.callThrough();

  	var ctrl = systemUnderTest(1);

  	deferred.resolve();
  	rootScope.$apply();

  	expect(ctrl.isBusy()).toBe(false);
  });

  it('should set loaded to true on api success', function () {
    var deferred;

    inject(function($q) { 
    	deferred = $q.defer();

      mockGw2ApiService.readItem = function () { 
        return deferred.promise; 
      };
    });

  	spyOn(mockGw2ApiService, 'readItem').and.callThrough();

  	var ctrl = systemUnderTest(1);

  	deferred.resolve();
  	rootScope.$apply();

  	expect(ctrl.isLoaded()).toBe(true);
  });

  it('should set model on api success', function () {
    var deferred;

    inject(function($q) { 
    	deferred = $q.defer();

      mockGw2ApiService.readItem = function () { 
        return deferred.promise; 
      };
    });

  	spyOn(mockGw2ApiService, 'readItem').and.callThrough();

  	var ctrl = systemUnderTest(1);

  	var model = {};

  	deferred.resolve(model);
  	rootScope.$apply();

  	expect(ctrl.item).toBe(model);
  });

  it('should set model to null on api failure', function () {
    var deferred;

    inject(function($q) { 
    	deferred = $q.defer();

      mockGw2ApiService.readItem = function () { 
        return deferred.promise; 
      };
    });

  	spyOn(mockGw2ApiService, 'readItem').and.callThrough();

  	var ctrl = systemUnderTest(1);

  	deferred.reject();
  	rootScope.$apply();

  	expect(ctrl.item).toBe(null);
  });

  it('should not call read item if id is falsy', function () {
    inject(function($q) { 
      mockGw2ApiService.readItem = function () { 
        var deferred = $q.defer();
        return deferred.promise; 
      };
    });

    spyOn(mockGw2ApiService, 'readItem').and.callThrough();

    var ctrl = systemUnderTest();

    expect(mockGw2ApiService.readItem).not.toHaveBeenCalled();
  });

  it ('should hide tooltip on load', function () {
    var deferred;

    inject(function($q) { 
      mockGw2ApiService.readItem = function () { 
        deferred = $q.defer();
        return deferred.promise; 
      };
    });

    var ctrl = systemUnderTest(1);

    expect(ctrl.getTootipVisibility()).toBe(false);
  });

  it ('should show tooltip if set to true', function () {
    var deferred;

    inject(function($q) { 
      mockGw2ApiService.readItem = function () { 
        deferred = $q.defer();
        return deferred.promise; 
      };
    });

    var ctrl = systemUnderTest(1);

    ctrl.setTootipVisibility(true);

    expect(ctrl.getTootipVisibility()).toBe(true);
  });

  it ('should return default type if no type is supplied', function () {
    var deferred;

    inject(function($q) { 
      mockGw2ApiService.readItem = function () { 
        deferred = $q.defer();
        return deferred.promise; 
      };
    });

    var ctrl = systemUnderTest(1);

    expect(ctrl.typeBackground).toBe('../assets/images/item-default-icon.png');
  });
});