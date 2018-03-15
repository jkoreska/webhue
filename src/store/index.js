import { routerReducer as router } from "react-router-redux";

import { reducer as config } from "./config";
import { reducer as bridge } from "./bridge";

export default {
  router,
  config,
  bridge,
};
