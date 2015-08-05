describe('item tooltip controller', function () {
	var rootScope;

	beforeEach(module('gw2armory'));
  beforeEach(function() {
  });

  var systemUnderTest = function (mockControllerBinds) {
    var ctrl;

    inject(function($controller, $rootScope) {
      rootScope = $rootScope;

      ctrl = $controller('UpgradeComponentController', {
      }, {
        upgrade: mockControllerBinds.upgrade
      });
    });

    return ctrl;
  };

  it('should return true if no upgrade passed in', function () {
    var ctrl = systemUnderTest({
      upgrade: {
        details: {
          infix_upgrade: {}
        }
      }
    });

    expect(ctrl.hasUpgrade()).toBe(true);
  });

  it('should return true if has bonus', function () {
    var ctrl = systemUnderTest({
      upgrade: {
        details: {
          bonuses: {},
          infix_upgrade: {}
        }
      }
    });

    expect(ctrl.hasBonuses()).toBe(true);
  });

  it('should return false if has no bonus', function () {
    var ctrl = systemUnderTest({
      upgrade: {
        details: {
          infix_upgrade: {}
        }
      }
    });

    expect(ctrl.hasBonuses()).toBe(false);
  });

  it('should return true if has buff', function () {
    var ctrl = systemUnderTest({
      upgrade: {
        details: {
          infix_upgrade: {
            buff: {}
          }
        }
      }
    });

    expect(ctrl.hasBuffs()).toBe(true);
  });

  it('should return false if has no buff', function () {
    var ctrl = systemUnderTest({
      upgrade: {
        details: {
          infix_upgrade: {}
        }
      }
    });

    expect(ctrl.hasBuffs()).toBe(false);
  });

  it('should return false if no upgrade passed in', function () {
    var ctrl = systemUnderTest({
    });

    expect(ctrl.hasUpgrade()).toBe(false);
  });
});