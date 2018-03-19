import React from "react";
import { connect } from "react-redux";

import { hueToRgb } from "modules/color";

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
  toggleLight,
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
            <span
              className="icon is-large"
              style={light.state.hue
                ? {
                    color: (
                      ({ r, g, b}) => `rgba(${r}, ${g}, ${b}, 1)`
                    )(hueToRgb(light.state.hue))
                  }
                : {}
              }>
              <i className="fa fa-2x fa-lightbulb-o"></i>
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
          <td>
            <button className="button is-white">
              <span className="icon is-large">
                <i
                  className={`fa fa-2x ${light.state.on ? "fa-toggle-on" : "fa-toggle-off"}`}
                  onClick={e => toggleLight(bridge.id, light.id, !light.state.on)}
                  ></i>
              </span>
            </button>
          </td>
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
  toggleLight: (bridgeId, lightId, on) => dispatch(bridgeActions.updateLight(bridgeId, lightId, { on })),
});

export default connect(mapState, mapDispatch)(LightList);
