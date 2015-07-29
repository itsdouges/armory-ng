let httpService;

// TODO: Remove fakes.
let q;
let _timeout;

class CharacterService {
	constructor($http, $q, $timeout) {
		'ngInject';

		httpService = $http;

		// TODO: Remove fakes.
		q = $q;
		_timeout = $timeout;
	}

	readCharacter(name) {
		var deferred = q.defer();

		_timeout(function () {
			deferred.resolve({
  "name": name,
  "race": "Asura",
  "gender": "Female",
  "profession": "Elementalist",
  "level": 80,
  "guild": "59BDB177-85C5-E311-9621-AC162DAE8ACD",
  "age": 312895,
  "created": "2015-06-23T10:53:00Z",
  "deaths": 205,
  "crafting": [
    {
      "discipline": "Chef",
      "rating": 88,
      "active": false
    },
    {
      "discipline": "Artificer",
      "rating": 411,
      "active": true
    },
    {
      "discipline": "Jewler",
      "rating": 400,
      "active": true
    },
    {
      "discipline": "Tailor",
      "rating": 446,
      "active": true
    }
  ],
  "equipment": [
    {
      "id": 63598,
      "slot": "HelmAquatic"
    },
    {
      "id": 63276,
      "slot": "Backpack",
      "upgrades": [
        24544
      ]
    },
    {
      "id": 11272,
      "slot": "Coat"
    },
    {
      "id": 11104,
      "slot": "Boots"
    },
    {
      "id": 11230,
      "slot": "Gloves"
    },
    {
      "id": 11188,
      "slot": "Helm",
      "upgrades": [
        24800
      ],
      "skin": 2045
    },
    {
      "id": 11146,
      "slot": "Leggings",
      "skin": 34
    },
    {
      "id": 11349,
      "slot": "Shoulders",
      "skin": 5793
    },
    {
      "id": 13453,
      "slot": "Accessory1",
      "upgrades": [
        24921
      ]
    },
    {
      "id": 23671,
      "slot": "Accessory2"
    },
    {
      "id": 13418,
      "slot": "Ring1",
      "upgrades": [
        24544
      ]
    },
    {
      "id": 13418,
      "slot": "Ring2",
      "upgrades": [
        24544
      ]
    },
    {
      "id": 23194,
      "slot": "Amulet"
    },
    {
      "id": 28552,
      "slot": "WeaponAquaticA"
    },
    {
      "id": 18571,
      "slot": "WeaponA1",
      "upgrades": [
        24681
      ]
    },
    {
      "id": 22997,
      "slot": "Sickle"
    },
    {
      "id": 23001,
      "slot": "Pick"
    }
  ],
  "bags": [
    {
      "id": 8932,
      "size": 20,
      "inventory": [
        {
          "id": 69836,
          "count": 1
        },
        {
          "id": 41741,
          "count": 1
        },
        null,
        {
          "id": 591,
          "count": 1,
          "upgrades": [
            24725
          ]
        },
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
      ]
    },
    {
      "id": 9416,
      "size": 12,
      "inventory": [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        {
          "id": 27940,
          "count": 1
        },
        null,
        {
          "id": 1151,
          "count": 1,
          "upgrades": [
            24775
          ]
        },
        null
      ]
    },
    {
      "id": 9416,
      "size": 12,
      "inventory": [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
      ]
    },
    {
      "id": 9416,
      "size": 12,
      "inventory": [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        {
          "id": 24722,
          "count": 1
        },
        {
          "id": 24619,
          "count": 1
        }
      ]
    },
    {
      "id": 9468,
      "size": 12,
      "inventory": [
        {
          "id": 24755,
          "count": 1
        },
        {
          "id": 24550,
          "count": 2
        },
        {
          "id": 23235,
          "count": 1
        },
        null,
        null,
        {
          "id": 34469,
          "count": 1
        },
        {
          "id": 2454,
          "count": 1
        },
        {
          "id": 24676,
          "count": 1
        },
        {
          "id": 24858,
          "count": 1
        },
        {
          "id": 24778,
          "count": 1
        },
        {
          "id": 24629,
          "count": 1
        },
        {
          "id": 1496,
          "count": 1,
          "upgrades": [
            24706
          ]
        }
      ]
    },
    {
      "id": 9494,
      "size": 15,
      "inventory": [
        null,
        null,
        null,
        null,
        {
          "id": 24531,
          "count": 1
        },
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
      ]
    },
    {
      "id": 9445,
      "size": 12,
      "inventory": [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        {
          "id": 18568,
          "count": 1,
          "upgrades": [
            24681
          ]
        },
        null,
        null,
        null,
        null
      ]
    },
    {
      "id": 9444,
      "size": 12,
      "inventory": [
        {
          "id": 20001,
          "count": 2
        },
        {
          "id": 20015,
          "count": 1
        },
        null,
        {
          "id": 20030,
          "count": 1
        },
        {
          "id": 19984,
          "count": 4
        },
        {
          "id": 19992,
          "count": 4
        },
        null,
        {
          "id": 23043,
          "count": 1
        },
        {
          "id": 66624,
          "count": 30
        },
        {
          "id": 19986,
          "count": 1
        },
        {
          "id": 23000,
          "count": 1
        },
        {
          "id": 23000,
          "count": 1
        }
      ]
    }
  ]
});
		}, 1000);

		return deferred.promise;
	}
}

export default CharacterService;