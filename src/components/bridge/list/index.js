import React from "react";
import { connect } from "react-redux";

import {
  actions as bridgeActions,
  selectors as bridgeSelectors,
} from "store/bridge";

import "./index.scss";

const BridgeList = ({
  bridges,
  onSelect,
}) => (
  <div className="BridgeList">
    <table className="table is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th colspan="2">
            Bridges
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
  bridges: bridgeSelectors.bridges(state),
  selected: bridgeSelectors.selected(state),
});

export default connect(mapState)(BridgeList);
