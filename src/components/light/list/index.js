import React from "react";
import { connect } from "react-redux";

import {
  actions as bridgeActions,
  selectors as bridgeSelectors,
} from "store/bridge";

import "./index.scss";

const LightList = ({
  lights = [],
  bridge,
  getLights,
  isLoading = false,
}) => (
  <div className="LightList">
    <table className="table is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>
            Lights
          </th>
          <th></th>
          <th>
            <button
              className={`button is-small ${isLoading ? "is-loading" : ""}`}
              onClick={e => getLights(bridge.id)}
              title="force reload"
              >
              <span className="icon">
                <i className="fa fa-refresh"></i>
              </span>
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
      {lights.map(light =>
        <tr key={light.id}>
          <td>
            <span className="icon is-large">
              <i className="fa fa-lightbulb-o fa-2x"></i>
            </span>
          </td>
          <td width="100%">
            <span>
              {light.name}
            </span>
            <span className="label is-small">
              {light.manufacturername} {light.modelid}
            </span>
          </td>
          <td></td>
        </tr>
      )}
      </tbody>
    </table>
  </div>
);

const mapState = state => ({
  lights: bridgeSelectors.lights(state),
  bridge: bridgeSelectors.selected(state),
});

const mapDispatch = dispatch => ({
  getLights: bridgeId => dispatch(bridgeActions.getLights(bridgeId)),
});

export default connect(mapState, mapDispatch)(LightList);
