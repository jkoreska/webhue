import React from "react";
import { connect } from "react-redux";

import { actions as configActions } from "store/config";
import { actions as bridgeActions } from "store/bridge";

import config from "../config";

class RouteHandler extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.setConfig();
    this.props.getBridges();
    this.bridgeRoute(this.props);
  }

  componentWillReceiveProps(props) {
    this.bridgeRoute(props);
  }

  bridgeRoute(props) {
    const {
      location: {
        pathname,
      },
      selectBridge,
    } = props;

    const bridgeMatch =
      pathname.match(/^\/bridge\/?([\w\-]*)/);
    if (bridgeMatch && bridgeMatch[1])
      selectBridge(bridgeMatch[1]);
  }

  render() {
    return null;
  }
}

const mapState = state => ({
});

const mapDispatch = dispatch => ({
  setConfig: () => dispatch(configActions.setConfig(config)),
  getBridges: () => dispatch(bridgeActions.getBridges()),
  selectBridge: bridgeId => dispatch(bridgeActions.selectBridge(bridgeId)),
});

export default connect(mapState, mapDispatch)(RouteHandler);
