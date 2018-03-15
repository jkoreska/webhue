import React from "react";
import { connect } from "react-redux";

import { selectors as bridgeSelectors } from "store/bridge";

import "./index.scss";

const BridgeList = ({ bridges = [] }) => (
  <div className="BridgeList">
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
        </tr>
      </thead>
      <tbody>
      {bridges.map(bridge =>
        <tr key={bridge.id}>
          <td>
            {bridge.id}
            &nbsp;
            <span className="icon is-small">
              <i className={`fa fa-${bridge.user ? "lock-open" : "lock"}`}></i>
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
});

export default connect(mapState)(BridgeList);
