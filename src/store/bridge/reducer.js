import types from "./types";

const defaultState = {
  loading: false,
  bridges: [],
  selectedId: null,
};

const loadingBridges = (state, action) =>
  Object.assign({}, state, {
    loading: true,
  });

const loadedBridges = (state, action) =>
  Object.assign({}, state, {
    loading: false,
    bridges: action.payload,
  });

const selectedBridge = (state, action) =>
  Object.assign({}, state, {
    selectedId: action.payload,
  });

const authenticatingBridge = (state, action) => {
  const bridges = state.bridges.map(bridge =>
    action.meta.bridgeId == bridge.id
      ? {
          ...bridge,
          authenticating: true,
        }
      : bridge
  );
  return Object.assign({}, state, { bridges });
};

const authenticatedBridge = (state, action) => {
  const bridges = state.bridges.map(bridge =>
    action.meta.bridgeId == bridge.id
      ? {
          ...bridge,
          ...action.payload,
          authenticating: false,
        }
      : bridge
  );
  return Object.assign({}, state, { bridges });
};

const loadingLights = (state, action) => state;

const loadedLights = (state, action) => {
  const bridges = state.bridges.map(bridge =>
    action.meta.bridgeId == bridge.id
      ? {
          ...bridge,
          lights: action.payload,
        }
      : bridge
  );
  return Object.assign({}, state, { bridges });
};

export default (state, action) => {
  switch(action.type) {
    case types.BRIDGES_LOADING: return loadingBridges(state, action);
    case types.BRIDGES_LOADED: return loadedBridges(state, action);
    case types.BRIDGE_SELECTED: return selectedBridge(state, action);
    case types.BRIDGE_AUTHENTICATING: return authenticatingBridge(state, action);
    case types.BRIDGE_AUTHENTICATED: return authenticatedBridge(state, action);
    case types.LIGHTS_LOADING: return loadingLights(state, action);
    case types.LIGHTS_LOADED: return loadedLights(state, action);
    default: return state || defaultState;
  }
};
