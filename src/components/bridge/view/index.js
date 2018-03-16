import React from "react";
import { connect } from "react-redux";

import {
  actions as bridgeActions,
  selectors as bridgeSelectors,
} from "store/bridge";

import "./index.scss";

const BridgeView = ({
  bridge,
  authenticateBridge,
}) => (
  <div className="BridgeView">
    {bridge.id}
    &nbsp;
    <span className="icon is-small">
      <i className={`fa fa-${bridge.user ? "unlock" : "lock"}`}></i>
    </span>
    {!bridge.user &&
      <button
        className={`button ${bridge.authenticating ? "is-loading" : ""}`}
        onClick={e => authenticateBridge(bridge.id)}
        >
        Authenticate
      </button>
    }
    {bridge.error && <span className="tag is-danger">{bridge.error}</span>}
  </div>
);

const mapState = state => ({
  bridge: bridgeSelectors.selected(state),
});

const mapDispatch = dispatch => ({
  authenticateBridge: bridgeId => dispatch(bridgeActions.authenticateBridge(bridgeId)),
});

export default connect(mapState, mapDispatch)(BridgeView);
