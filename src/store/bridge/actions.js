
import types from "./types";

const getBridges = () => (dispatch, getState, services) => {
  dispatch({
    type: types.BRIDGES_LOADING,
  });
  return services.bridgeService
    .getBridges()
    .then(bridges => dispatch({
      type: types.BRIDGES_LOADED,
      payload: bridges,
    }));
};

const selectBridge = bridgeId => ({
  type: types.BRIDGE_SELECTED,
  payload: bridgeId,
});

const authenticateBridge = bridgeId => (dispatch, getState, services) => {
  dispatch({
    type: types.BRIDGE_AUTHENTICATING,
    meta: {
      bridgeId,
    },
  });
  return services.bridgeService
    .authenticateBridge(bridgeId)
    .then(user => dispatch({
      type: types.BRIDGE_AUTHENTICATED,
      meta: {
        bridgeId,
      },
      payload: {
        user,
      },
    }))
    .catch(e => dispatch({
      type: types.BRIDGE_AUTHENTICATED,
      meta: {
        bridgeId,
      },
      payload: {
        error: e.message,
      },
    }));
};

export default {
  getBridges,
  selectBridge,
  authenticateBridge,
};
