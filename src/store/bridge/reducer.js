import types from "./types";

const defaultState = {
  loading: false,
  bridges: [],
};

const loadingBridges = (state, action) =>
  Object.assign({}, state, { loading: true });

const loadedBridges = (state, action) =>
  Object.assign({}, state, {
    loading: false,
    bridges: action.payload,
  });

export default (state, action) => {
  switch(action.type) {
    case types.LOADING_BRIDGES: return loadingBridges(state, action);
    case types.LOADED_BRIDGES: return loadedBridges(state, action);
    default: return state || defaultState;
  }
};
