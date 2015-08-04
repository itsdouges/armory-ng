describe('CraftingBlockController', function () {
  var rootScope;

  beforeEach(module('gw2armory'));
  beforeEach(function() {
  });

  var systemUnderTest = function (model) {
    var ctrl;

    inject(function($controller, $rootScope) {
      rootScope = $rootScope;

      ctrl = $controller('CraftingBlockController', { 
      }, {
        model: model
      });
    });

    return ctrl;
  };

  it ('should default the crafting total to 500', function () {
    var ctrl = systemUnderTest({});

    expect(ctrl.total).toBe(500);
  });

  it ('should set the crafting total to 400 if chef', function () {
    var ctrl = systemUnderTest({
      discipline: 'Chef'
    });

    expect(ctrl.total).toBe(400);
  });

  it ('should set the crafting total to 400 if jewler', function () {
    var ctrl = systemUnderTest({
      discipline: 'Jewler'
    });

    expect(ctrl.total).toBe(400);
  });

  it ('should set the expected percent with no input', function () {
    var ctrl = systemUnderTest({
    });

    expect(ctrl.current).toBe('0%');
  });


  it ('should set the expected percent with input 1', function () {
    var ctrl = systemUnderTest({
      discipline: 'Chef',
      rating: 300
    });

    expect(ctrl.current).toBe('75%');
  });

  it ('should set the expected percent with input 2', function () {
    var ctrl = systemUnderTest({
      rating: 300
    });

    expect(ctrl.current).toBe('60%');
  });
});