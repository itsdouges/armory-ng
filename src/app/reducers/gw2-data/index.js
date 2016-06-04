import { actions } from '../../actions/gw2-data';

const LOCAL_TRAITS_DATA = 'LOCAL_TRAITS_DATA';
const LOCAL_SPECIALIZATIONS_DATA = 'LOCAL_TRAITS_DATA';
const LOCAL_ITEMS_DATA = 'LOCAL_TRAITS_DATA';
const LOCAL_SKINS_DATA = 'LOCAL_TRAITS_DATA';

const LAST_STORAGE_CLEAN_DATE_KEY = 'LAST_STORAGE_CLEAN_DATE_KEY';
const CLEAR_INTERVAL_IN_DAYS = 7;

const ITEMS_KEY = 'ITEMS';
const SKINS_KEY = 'SKINS';
const TRAITS_KEY = 'TRAITS';
const SPECIALIZATIONS_KEY = 'SPECIALIZATIONS';

function clearStorageIfTime () {
  const clearData = () => {
    localStorage.removeItem(ITEMS_KEY);
    localStorage.removeItem(SKINS_KEY);
    localStorage.removeItem(TRAITS_KEY);
    localStorage.removeItem(SPECIALIZATIONS_KEY);
    localStorage.setItem(LAST_STORAGE_CLEAN_DATE_KEY, new Date().toString());
  };

  const lastCleared = localStorage.getItem(LAST_STORAGE_CLEAN_DATE_KEY);
  if (!lastCleared) {
    clearData();
    return;
  }

  const today = new Date();
  const dateToClear = new Date(lastCleared);
  dateToClear.setDate(dateToClear.getDate() + CLEAR_INTERVAL_IN_DAYS);

  if (dateToClear <= today) {
    clearData();
  }
}

clearStorageIfTime();

function fetchingItemsReducer (state, action) {
  const newState = {
    ...state
  };

  newState.items.fetching = action.payload;

  return newState;
}

function fetchingSkinsReducer (state, action) {
  const newState = {
    ...state
  };

  newState.skins.fetching = action.payload;

  return newState;
}

function fetchingSpecializationsReducer (state, action) {
  const newState = {
    ...state
  };

  newState.specializations.fetching = action.payload;

  return newState;
}

function fetchingTraitsReducer (state, action) {
  const newState = {
    ...state
  };

  newState.traits.fetching = action.payload;

  return newState;
}

function fetchItemsResultReducer (state, action) {
  const newState = {
    ...state
  };

  newState.items.data = {
    ...newState.items.data,
    ...action.payload
  };

  localStorage.setItem(ITEMS_KEY, JSON.stringify(newState.items.data));

  return newState;
}

function fetchSkinsResultReducer (state, action) {
  const newState = {
    ...state
  };

  newState.skins.data = {
    ...newState.skins.data,
    ...action.payload
  };

  localStorage.setItem(SKINS_KEY, JSON.stringify(newState.skins.data));

  return newState;
}

function fetchTraitsResultReducer (state, action) {
  const newState = {
    ...state
  };

  newState.traits.data = {
    ...newState.traits.data,
    ...action.payload
  };

  localStorage.setItem(TRAITS_KEY, JSON.stringify(newState.traits.data));

  return newState;
}

function fetchSpecializationsResultReducer (state, action) {
  const newState = {
    ...state
  };

  newState.specializations.data = {
    ...newState.specializations.data,
    ...action.payload
  };

  localStorage.setItem(SPECIALIZATIONS_KEY, JSON.stringify(newState.specializations.data));

  return newState;
}

function fetchPvpSeasonResultReducer (state, action) {
  const newState = {
    ...state
  };

  newState.pvpSeasons[action.payload.id] = action.payload;

  return newState;
}

function showTooltipReducer (state, action) {
  const newState = {
    ...state
  };

  if (!action.payload.show) {
    newState.tooltip = {
      open: action.payload.show
    };
  } else {
    newState.tooltip = {
      open: action.payload.show,
      item: action.payload.item,
      skin: action.payload.skin,
      upgrades: action.payload.upgrades,
      type: action.payload.type,
      upgrade_combo_count: action.payload.upgrade_combo_count
    };
  }

  return newState;
}

const initalState = {
  items: {
    data: JSON.parse(localStorage.getItem(ITEMS_KEY)) || {}
  },
  skins: {
    data: JSON.parse(localStorage.getItem(SKINS_KEY)) || {}
  },
  traits: {
    data: JSON.parse(localStorage.getItem(TRAITS_KEY)) || {}
  },
  specializations: {
    data: JSON.parse(localStorage.getItem(SPECIALIZATIONS_KEY)) || {}
  },
  pvpSeasons: {},
  tooltip: {
    open: false
  }
};

export default function reducer (state = initalState, action) {
  switch (action.type) {
    case actions.FETCHING_ITEMS:
      return fetchingItemsReducer(state, action);

    case actions.FETCHING_SKINS:
      return fetchingSkinsReducer(state, action);

    case actions.FETCHING_TRAITS:
      return fetchingTraitsReducer(state, action);

    case actions.FETCHING_SPECIALIZATIONS:
      return fetchingSpecializationsReducer(state, action);

    case actions.FETCH_ITEMS_RESULT:
      return fetchItemsResultReducer(state, action);

    case actions.FETCH_SKINS_RESULT:
      return fetchSkinsResultReducer(state, action);

    case actions.FETCH_TRAITS_RESULT:
      return fetchTraitsResultReducer(state, action);

    case actions.FETCH_SPECIALIZATIONS_RESULT:
      return fetchSpecializationsResultReducer(state, action);

    case actions.FETCH_PVP_SEASON_RESULT:
      return fetchPvpSeasonResultReducer(state, action);

    case actions.SHOW_TOOLTIP:
      return showTooltipReducer(state, action);

    default:
      return state;
  }
}