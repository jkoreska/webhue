
import types from "./types";

const getBridges = force => (dispatch, getState, services) => {
  dispatch({
    type: types.BRIDGES_LOADING,
  });
  return services.bridgeService
    .getBridges(force)
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
    .then(user => {
      dispatch({
        type: types.BRIDGE_AUTHENTICATED,
        meta: {
          bridgeId,
        },
        payload: {
          user,
        },
      });
      dispatch(getLights(bridgeId));
    })
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

const getLights = bridgeId => (dispatch, getState, services) => {
  dispatch({
    type: types.LIGHTS_LOADING,
    meta: {
      bridgeId,
    },
  });
  return services.bridgeService
    .getLights(bridgeId)
    .then(lights => dispatch({
      type: types.LIGHTS_LOADED,
      meta: {
        bridgeId,
      },
      payload: lights,
    }));
};

export default {
  getBridges,
  selectBridge,
  authenticateBridge,
  getLights,
};
