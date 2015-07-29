describe('item controller', function () {
	var mockGw2ApiService;
	var rootScope;

	beforeEach(module('gw2armory'));
  beforeEach(function() {
    mockGw2ApiService = {};
  });

  var systemUnderTest = function () {
    var ctrl;

    inject(function($controller, $rootScope) {
      rootScope = $rootScope;

      ctrl = $controller('ItemHolderController', { 
        gw2ApiService: mockGw2ApiService
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

  	var ctrl = systemUnderTest();

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

  	var ctrl = systemUnderTest();

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

  	var ctrl = systemUnderTest();

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

  	var ctrl = systemUnderTest();

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

  	var ctrl = systemUnderTest();

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

  	var ctrl = systemUnderTest();

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

  	var ctrl = systemUnderTest();

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

  	var ctrl = systemUnderTest();

  	var model = {};

  	deferred.resolve(model);
  	rootScope.$apply();

  	expect(ctrl.getItem()).toBe(model);
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

  	var ctrl = systemUnderTest();

  	deferred.reject();
  	rootScope.$apply();

  	expect(ctrl.getItem()).toBe(null);
  });

  it('should call build render url with getIconUrl', function () {
    var deferred;

    inject(function($q) { 
      mockGw2ApiService.readItem = function () { 
        deferred = $q.defer();
        return deferred.promise; 
      };

      mockGw2ApiService.buildRenderUrl = function () {};
    });

  	spyOn(mockGw2ApiService, 'buildRenderUrl').and.returnValue('ayy lmao');

  	var ctrl = systemUnderTest();

  	deferred.resolve({
  		icon_file_id: 'file',
  		icon_file_signature: 'sig'
  	});

  	rootScope.$apply();

  	var uri = ctrl.getIconUrl();

  	expect(mockGw2ApiService.buildRenderUrl).toHaveBeenCalledWith('file', 'sig');
  	expect(uri).toBe('ayy lmao');
  });

  it ('should hide tooltip on load', function () {
    var deferred;

    inject(function($q) { 
      mockGw2ApiService.readItem = function () { 
        deferred = $q.defer();
        return deferred.promise; 
      };
    });

    var ctrl = systemUnderTest();

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

    var ctrl = systemUnderTest();

    ctrl.setTootipVisibility(true);

    expect(ctrl.getTootipVisibility()).toBe(true);
  });
});