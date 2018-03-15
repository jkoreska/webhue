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
  }

  componentWillReceiveProps(props) {
  }

  render() {
    return null;
  }
}

const mapState = state => ({
  path: state.router.location.pathname,
});

const mapDispatch = dispatch => ({
  setConfig: () => dispatch(configActions.setConfig(config)),
  getBridges: () => dispatch(bridgeActions.getBridges()),
});

export default connect(mapState, mapDispatch)(RouteHandler);
