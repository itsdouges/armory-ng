# armory-front

> Getting to work edition.

## Iteration 1 TODO
- backend changes
	- token handling
		- change gw2token schema, add id field and move token to unique field instead of primary (stop people locking down accounts)
	- alias validation
		- enforce 4 character minimum
	- add token, fetch characters immediately (instead of waiting for fetch)

- finalise css
- 401 redirects
	- settings etc isnt working on ie
- front page
	- simple hardcoded news thing for now. something easy to fill up the blank space.
- settings page functionality
	- update password
	- update alias
	- token permissions indicator (character, inventories, pvp)
	- relax token permissions [backend change]
	- relax password required strength [backend change]
- register page
	- relax password required strength [backend change]
- item tooltip functionality
	- general fixes
	- touch to display (touch-device only)
- character slider
	- arrow icons

## Iteration 2 TODO
	- pre-load all items/skins in the background to speed up later page loads
	- character attributes (use preloaded items)
	- character slider enhancements
	- gw2 markup parser

Copyright (c) 2015 Michael Dougall