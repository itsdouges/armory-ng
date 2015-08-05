describe('item controller', function () {
	var mockGw2ApiService;
	var rootScope;

	beforeEach(module('gw2armory'));
  beforeEach(function() {
    mockGw2ApiService = {};
  });

  var systemUnderTest = function (mockControllerBinds) {
    var ctrl;

    inject(function($controller, $rootScope) {
      rootScope = $rootScope;

      ctrl = $controller('itemBlockController', { 
        gw2ApiService: mockGw2ApiService
      }, {
        item: mockControllerBinds.item,
        type: mockControllerBinds.type,
        mode: mockControllerBinds.mode
      });
    });

    return ctrl;
  };

  it('should call readSkin if skinId and itemId is passed in', function () {
    inject(function($q) { 
      mockGw2ApiService.readSkin = function () { 
        var deferred = $q.defer();
        return deferred.promise; 
      };
    });

  	spyOn(mockGw2ApiService, 'readSkin').and.callThrough();

  	var ctrl = systemUnderTest({
      item: {
        skin: 1234,
        id: 4444
      }
    });

  	expect(mockGw2ApiService.readSkin).toHaveBeenCalledWith(1234);
  });

  it('should set type background url as expected', function () {
    inject(function($q) { 
      mockGw2ApiService.readSkin = function () { 
        var deferred = $q.defer();
        return deferred.promise; 
      };
    });

    var ctrl = systemUnderTest({
      item: {
        skin: 1234,
        id: 4444,
      },
      type: 'ayy-type'
    });

    expect(ctrl.typeBackground).toBe('../assets/images/ayy-type-slot-icon.png');
  });

  it('should set type background url as expected if no type passed in', function () {
    inject(function($q) { 
      mockGw2ApiService.readSkin = function () { 
        var deferred = $q.defer();
        return deferred.promise; 
      };
    });

    var ctrl = systemUnderTest({
      item: {
        skin: 1234,
        id: 4444
      }
    });

    expect(ctrl.typeBackground).toBe('../assets/images/item-default-icon.png');
  });

  it('should call readItem if no skinId is passed in', function () {
    inject(function($q) { 
      mockGw2ApiService.readItem = function () { 
        var deferred = $q.defer();
        return deferred.promise; 
      };
    });

    spyOn(mockGw2ApiService, 'readItem').and.callThrough();

    var ctrl = systemUnderTest({
      item: {
        id: 4444
      }
    });

    expect(mockGw2ApiService.readItem).toHaveBeenCalledWith(4444);
  });

  it('should set busy to true on when loading item', function () {
    inject(function($q) { 
      mockGw2ApiService.readItem = function () { 
        var deferred = $q.defer();
        return deferred.promise; 
      };
    });

  	spyOn(mockGw2ApiService, 'readItem').and.callThrough();

  	var ctrl = systemUnderTest({
      item: {
        id: 4444
      }
    });

  	expect(ctrl.isBusy()).toBe(true);
  });

  it('should set busy to true on when loading skin', function () {
    inject(function($q) { 
      mockGw2ApiService.readSkin = function () { 
        var deferred = $q.defer();
        return deferred.promise; 
      };
    });

    spyOn(mockGw2ApiService, 'readSkin').and.callThrough();

    var ctrl = systemUnderTest({
      item: {
        skin: 1234
      }
    });

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

  	var ctrl = systemUnderTest({});

  	expect(ctrl.isLoaded()).toBeFalsy();
  });


  it('should set busy to false if no ids were passed in', function () {
    var deferred;

    inject(function($q) { 
      deferred = $q.defer();

      mockGw2ApiService.readItem = function () { 
        return deferred.promise; 
      };
    });

    spyOn(mockGw2ApiService, 'readItem').and.callThrough();

    var ctrl = systemUnderTest({});

    deferred.reject();
    rootScope.$apply();

    expect(ctrl.isBusy()).toBeFalsy();
  });

  it('when loading item should set busy to false on api failure', function () {
    var deferred;

    inject(function($q) { 
    	deferred = $q.defer();

      mockGw2ApiService.readItem = function () { 
        return deferred.promise; 
      };
    });

  	spyOn(mockGw2ApiService, 'readItem').and.callThrough();

  	var ctrl = systemUnderTest({
      item: {
        id: 1234
      }
    });

  	deferred.reject();
  	rootScope.$apply();

    expect(mockGw2ApiService.readItem).toHaveBeenCalledWith(1234);
  	expect(ctrl.isBusy()).toBe(false);
  });

  it('should keep loaded as false on api failure after loading item', function () {
    var deferred;

    inject(function($q) { 
    	deferred = $q.defer();

      mockGw2ApiService.readItem = function () { 
        return deferred.promise; 
      };
    });

  	spyOn(mockGw2ApiService, 'readItem').and.callThrough();

  	var ctrl = systemUnderTest({
      item: {
        id: 1234
      }
    });

  	deferred.reject();
  	rootScope.$apply();

    expect(mockGw2ApiService.readItem).toHaveBeenCalledWith(1234);
  	expect(ctrl.isLoaded()).toBe(false);
  });

  it('should keep loaded as false on api failure after loading skin', function () {
    var deferred;

    inject(function($q) { 
      deferred = $q.defer();

      mockGw2ApiService.readSkin = function () { 
        return deferred.promise; 
      };
    });

    spyOn(mockGw2ApiService, 'readSkin').and.callThrough();

    var ctrl = systemUnderTest({
      item: {
        skin: 1234
      }
    });

    deferred.reject();
    rootScope.$apply();

    expect(mockGw2ApiService.readSkin).toHaveBeenCalledWith(1234);
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

  	var ctrl = systemUnderTest({
      item: {
        id: 1234
      }
    });

  	deferred.resolve({
      iconUrl: 'ayy lmao'
    });
  	rootScope.$apply();

    expect(mockGw2ApiService.readItem).toHaveBeenCalledWith(1234);
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

  	var ctrl = systemUnderTest({
      item: {
        id: 1234
      }
    });

  	deferred.resolve({
      iconUrl: 'ayy lmao'
    });
  	rootScope.$apply();

    expect(mockGw2ApiService.readItem).toHaveBeenCalledWith(1234);
  	expect(ctrl.isLoaded()).toBe(true);
  });

  it('should set icon url on api success', function () {
    var deferred;

    inject(function($q) { 
    	deferred = $q.defer();

      mockGw2ApiService.readItem = function () { 
        return deferred.promise; 
      };
    });

  	spyOn(mockGw2ApiService, 'readItem').and.callThrough();

  	var ctrl = systemUnderTest({
      item: {
        id: 1234
      }
    });

  	var model = {
      icon: 'ayy lmao url'
    };

  	deferred.resolve(model);
  	rootScope.$apply();

  	expect(ctrl.iconUrl).toBe(model.icon);
  });

  it('should set icon url to null on api failure', function () {
    var deferred;

    inject(function($q) { 
    	deferred = $q.defer();

      mockGw2ApiService.readItem = function () { 
        return deferred.promise; 
      };
    });

  	spyOn(mockGw2ApiService, 'readItem').and.callThrough();

  	var ctrl = systemUnderTest({
      item: {
        id: 1234
      }
    });

  	deferred.reject();
  	rootScope.$apply();

  	expect(ctrl.iconUrl).toBe(null);
  });

  it('should not call anything if all ids are falsy', function () {
    inject(function($q) { 
      mockGw2ApiService.readSkin = function () {};
      mockGw2ApiService.readItem = function () { 
        var deferred = $q.defer();
        return deferred.promise; 
      };
    });

    spyOn(mockGw2ApiService, 'readItem');
    spyOn(mockGw2ApiService, 'readSkin');

    var ctrl = systemUnderTest({});

    expect(mockGw2ApiService.readSkin).not.toHaveBeenCalled();
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

    var ctrl = systemUnderTest({});

    expect(ctrl.getTooltipVisibility()).toBe(false);
  });

  it ('should show tooltip if set to true', function () {
    var deferred;

    inject(function($q) { 
      mockGw2ApiService.readItem = function () { 
        deferred = $q.defer();
        return deferred.promise; 
      };
    });

    var ctrl = systemUnderTest({});

    ctrl.setTooltipVisibility(true);

    expect(ctrl.getTooltipVisibility()).toBe(true);
  });

  it ('should return default type if no type is supplied', function () {
    var deferred;

    inject(function($q) { 
      mockGw2ApiService.readItem = function () { 
        deferred = $q.defer();
        return deferred.promise; 
      };
    });

    var ctrl = systemUnderTest({});

    expect(ctrl.typeBackground).toBe('../assets/images/item-default-icon.png');
  });

  it('should set typeBackground to valid url if type is passed in', function() {
    var deferred;

    inject(function($q) { 
      mockGw2ApiService.readItem = function () { 
        deferred = $q.defer();
        return deferred.promise; 
      };
    });

    var ctrl = systemUnderTest({
      type: 'ayylmao'
    });

    expect(ctrl.typeBackground).toBe('../assets/images/ayylmao-slot-icon.png');
  });
});