import React from "react";
import { connect } from "react-redux";

import {
  actions as bridgeActions,
  selectors as bridgeSelectors,
} from "store/bridge";

import "./index.scss";

const BridgeList = ({
  getBridges,
  isLoading,
  bridges,
  onSelect,
}) => (
  <div className="BridgeList">
    <table className="table is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>
            Bridges
          </th>
          <th>
            <button
              className={`button is-small ${isLoading ? "is-loading" : ""}`}
              onClick={e => getBridges()}
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
      {bridges.map(bridge =>
        <tr key={bridge.id} onClick={e => onSelect && onSelect(bridge)}>
          <td width="100%">
            {bridge.name || bridge.id}
          </td>
          <td>
            <span className="icon is-small">
              <i className={`fa fa-${bridge.user ? "unlock" : "lock"}`}></i>
            </span>
          </td>
        </tr>
      )}
      </tbody>
    </table>
  </div>
);

const mapState = state => ({
  isLoading: bridgeSelectors.isLoading(state),
  bridges: bridgeSelectors.bridges(state),
  selected: bridgeSelectors.selected(state),
});

const mapDispatch = dispatch => ({
  getBridges: () => dispatch(bridgeActions.getBridges(true)),
});

export default connect(mapState, mapDispatch)(BridgeList);
