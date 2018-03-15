
import types from "./types";

const getBridges = () => (dispatch, getState, services) => {
  dispatch({
    type: types.LOADING_BRIDGES,
  });
  return services.bridgeService
    .getBridges()
    .then(bridges => dispatch({
      type: types.LOADED_BRIDGES,
      payload: bridges,
    }));
};

export default {
  getBridges,
};
