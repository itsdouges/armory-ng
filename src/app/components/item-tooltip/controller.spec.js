describe('item tooltip controller', function () {
	var mockGw2ApiService;
	var rootScope;

	beforeEach(module('gw2armory'));
  beforeEach(function() {
    mockGw2ApiService = {};
    mockQ = {};
  });

  var systemUnderTest = function (mockControllerBinds) {
    var ctrl;

    inject(function($controller, $rootScope, $q) {
      rootScope = $rootScope;

      ctrl = $controller('ItemTooltipController', {
      	$q: $q,
      	gw2ApiService: mockGw2ApiService
      }, {
        slotName: mockControllerBinds.slotName,
        item: mockControllerBinds.item
      });
    });

    return ctrl;
  };

  it('should set typeName to currently equipped if item is equip', function () {
    var deferred;

    inject(function($q) { 
      deferred = $q.defer();

      mockGw2ApiService.readItems = function () { 
        return deferred.promise; 
      };
    });

  	var ctrl = systemUnderTest({
  		item: {
				id: 1234
  		},
  		slotName: 'cool name'
  	});

  	expect(ctrl.typeName).toBe('Currently Equipped');
  });

  it('should set slotName to typename if itemid isnt passed in', function () {
    var deferred;

    inject(function($q) { 
      deferred = $q.defer();

      mockGw2ApiService.readItems = function () { 
        return deferred.promise; 
      };
    });

  	var ctrl = systemUnderTest({
  		slotName: 'cool name'
  	});

  	expect(ctrl.typeName).toBe('cool name');
  });

  it('should set slotName to undefined if itemid isnt passed in', function () {
    var deferred;

    inject(function($q) { 
      deferred = $q.defer();

      mockGw2ApiService.readItems = function () { 
        return deferred.promise; 
      };
    });

  	var ctrl = systemUnderTest({
  	});

  	expect(ctrl.typeName).toBe(undefined);
  });

  it('should set loading to falsy on instantiation', function () {
    var deferred;

    inject(function($q) { 
      deferred = $q.defer();

      mockGw2ApiService.readItems = function () { 
        return deferred.promise; 
      };
    });

  	var ctrl = systemUnderTest({
  	});

  	expect(ctrl.isLoaded()).toBeFalsy();
  });

  it('should set busy to be falsy on instantiation', function () {
    var deferred;

    inject(function($q) { 
      deferred = $q.defer();

      mockGw2ApiService.readItems = function () { 
        return deferred.promise; 
      };
    });

  	var ctrl = systemUnderTest({
  	});

  	expect(ctrl.isBusy()).toBeFalsy();
  });

  it('should only fetch item data if only item id is passed in', function (){
    var readItemsDefer;
    var readSkinDefer;

    inject(function($q) { 
      readItemsDefer = $q.defer();
			readSkinDefer = $q.defer();

      mockGw2ApiService.readItems = function () { 
        return readItemsDefer.promise; 
      };

      mockGw2ApiService.readSkin = function () { 
        return readSkinDefer.promise; 
      };
    });

    spyOn(mockGw2ApiService, 'readItems').and.callThrough();
		spyOn(mockGw2ApiService, 'readSkin').and.callThrough();

  	var ctrl = systemUnderTest({
  		item: {
  			id: 1234
  		}
  	});

  	var item = {
      id: 1234
    };

  	readItemsDefer.resolve([item]);

  	rootScope.$apply();

  	expect(mockGw2ApiService.readItems).toHaveBeenCalledWith([1234]);
  	expect(mockGw2ApiService.readSkin).not.toHaveBeenCalled();
  	expect(ctrl.model).toBe(item);
  });

  it('should fetch item and skin if both ids passed in', function (){
    var readItemsDefer;
    var readSkinDefer;

    inject(function($q) { 
      readItemsDefer = $q.defer();
			readSkinDefer = $q.defer();

      mockGw2ApiService.readItems = function () { 
        return readItemsDefer.promise; 
      };

      mockGw2ApiService.readSkin = function () { 
        return readSkinDefer.promise; 
      };
    });

    spyOn(mockGw2ApiService, 'readItems').and.callThrough();
		spyOn(mockGw2ApiService, 'readSkin').and.callThrough();

  	var ctrl = systemUnderTest({
  		item: {
	  		id: 1234,
	  		skin: 4321
  		}
  	});

  	var item = {
      id: 1234
    };

  	var skin = {};

  	readItemsDefer.resolve([item]);
		readSkinDefer.resolve(skin);

  	rootScope.$apply();

  	expect(mockGw2ApiService.readItems).toHaveBeenCalledWith([1234]);
  	expect(mockGw2ApiService.readSkin).toHaveBeenCalledWith(4321);
  	expect(ctrl.model).toBe(item);
  });

  it('should fetch item and upgrades if both id and upgrades passed in', function (){
    var readItemsDefer;

    inject(function($q) { 
      readItemsDefer = $q.defer();

      mockGw2ApiService.readItems = function (e) {
        return readItemsDefer.promise;
      };
    });

    spyOn(mockGw2ApiService, 'readItems').and.callThrough();

    var ctrl = systemUnderTest({
      item: {
        id: 1234,
        upgrades: [
          333,
          444
        ]
      }
    });

    var item = {
      id: 1234
    };
    
    var upgrade1 = {
      id: 333
    };

    var upgrade2 = {
      id: 444
    };

    readItemsDefer.resolve([upgrade1, upgrade2, item]);

    expect(mockGw2ApiService.readItems).toHaveBeenCalledWith([1234, 333, 444]);
  });

  it('should assign upgrade one and two to base item model', function () {
    var readItemsDefer;
    var readItemUpgrade1Defer;
    var readItemUpgrade2Defer;

    inject(function($q) { 
      readItemsDefer = $q.defer();

      mockGw2ApiService.readItems = function (e) {
          return readItemsDefer.promise;
      };
    });

    spyOn(mockGw2ApiService, 'readItems').and.callThrough();

    var ctrl = systemUnderTest({
      item: {
        id: 1234,
        upgrades: [
          333,
          444
        ]
      }
    });

    var item = {
      id: 1234,
      name: 'swagyswag',
      details: {}
    };

    var upgrade1 = {
      id: 333,
      details: {
        suffix: 'of cool suffix'
      }
    };
    
    var upgrade2 = {
      id: 444,
      details: {
        suffix: 'of bad suffix'
      }
    };

    readItemsDefer.resolve([upgrade1, item, upgrade2]);

    rootScope.$apply();

    expect(ctrl.model.details.upgrade_one).toBe(upgrade1);
    expect(ctrl.model.details.upgrade_two).toBe(upgrade2);
  });

  it('should assign first upgrades\' suffix to gear', function (){
    var readItemsDefer;
    var readItemUpgrade1Defer;
    var readItemUpgrade2Defer;

    inject(function($q) { 
      readItemsDefer = $q.defer();

      mockGw2ApiService.readItems = function (e) {
          return readItemsDefer.promise;
      };
    });

    spyOn(mockGw2ApiService, 'readItems').and.callThrough();

    var ctrl = systemUnderTest({
      item: {
        id: 1234,
        upgrades: [
          333,
          444
        ]
      }
    });

    var item = {
      id: 1234,
      name: 'swagyswag',
      details: {}
    };

    var upgrade1 = {
      id: 333,
      details: {
        suffix: 'of cool suffix'
      }
    };
    
    var upgrade2 = {
      id: 444,
      details: {
        suffix: 'of bad suffix'
      }
    };

    readItemsDefer.resolve([upgrade1, item, upgrade2]);

    rootScope.$apply();

    expect(mockGw2ApiService.readItems).toHaveBeenCalledWith([1234,333,444]);

    expect(ctrl.model.name).toBe('swagyswag of cool suffix');
  });

  it('should set skin properties to item properties if both ids passed in and is a success and set original name', function (){
    var readItemsDefer;
    var readSkinDefer;

    inject(function($q) { 
      readItemsDefer = $q.defer();
			readSkinDefer = $q.defer();

      mockGw2ApiService.readItems = function () { 
        return readItemsDefer.promise; 
      };

      mockGw2ApiService.readSkin = function () { 
        return readSkinDefer.promise; 
      };
    });

    spyOn(mockGw2ApiService, 'readItems').and.callThrough();
		spyOn(mockGw2ApiService, 'readSkin').and.callThrough();

  	var ctrl = systemUnderTest({
  		item: {
	  		id: 1234,
	  		skin: 4321
  		}
  	});

  	var item = {
      id: 1234,
  		icon: 'itemicon',
  		name: 'Rampager\'s Exalted Masque'
  	};

  	var skin = {
  		icon: 'skinicon',
  		name: 'Demon Masque'
  	};

  	readItemsDefer.resolve([item]);
		readSkinDefer.resolve(skin);

  	rootScope.$apply();

  	expect(mockGw2ApiService.readItems).toHaveBeenCalledWith([1234]);
  	expect(mockGw2ApiService.readSkin).toHaveBeenCalledWith(4321);
  	expect(ctrl.model.icon).toBe(skin.icon);
    expect(ctrl.model.original_name).toBe('Rampager\'s Exalted Masque');
  	expect(ctrl.model.name).toBe('Rampager\'s Demon Masque');
  });

  it('should set busy to false and loaded to true on success', function (){
    var readItemsDefer;
    var readSkinDefer;

    inject(function($q) { 
      readItemsDefer = $q.defer();
			readSkinDefer = $q.defer();

      mockGw2ApiService.readItems = function () { 
        return readItemsDefer.promise; 
      };

      mockGw2ApiService.readSkin = function () { 
        return readSkinDefer.promise; 
      };
    });

    spyOn(mockGw2ApiService, 'readItems').and.callThrough();
		spyOn(mockGw2ApiService, 'readSkin').and.callThrough();

  	var ctrl = systemUnderTest({
  		item: {
	  		id: 1234
  		}
  	});

		expect(ctrl.isLoaded()).toBe(false);
  	expect(ctrl.isBusy()).toBe(true);

  	var item = [{
      id: 1234
    }];

  	readItemsDefer.resolve(item);

  	rootScope.$apply();

		expect(ctrl.isLoaded()).toBe(true);
  	expect(ctrl.isBusy()).toBe(false);
  });

  it('should set busy to false on failure', function (){
    var readItemsDefer;
    var readSkinDefer;

    inject(function($q) { 
      readItemsDefer = $q.defer();
			readSkinDefer = $q.defer();

      mockGw2ApiService.readItems = function () { 
        return readItemsDefer.promise; 
      };

      mockGw2ApiService.readSkin = function () { 
        return readSkinDefer.promise; 
      };
    });

    spyOn(mockGw2ApiService, 'readItems').and.callThrough();
		spyOn(mockGw2ApiService, 'readSkin').and.callThrough();

  	var ctrl = systemUnderTest({
  		item: {
	  		id: 1234
  		}
  	});

  	expect(ctrl.isBusy()).toBe(true);

  	var item = {};

  	readItemsDefer.reject();

  	rootScope.$apply();

  	expect(ctrl.isBusy()).toBe(false);
  });
});