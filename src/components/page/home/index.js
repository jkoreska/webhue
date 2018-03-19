import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";

import Header from "components/header";
import BridgeList from "components/bridge/list";

import "./index.scss";

const HomePage = ({
  selectBridge,
}) =>
  <div className="HomePage">
    <Header/>
    <section className="hero is-primary is-bold">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-mobile">
            <div className="column">
              <h1 className="title is-2">
                WebHue
              </h1>
              <h2 className="subtitle">
                Philips Hue web client
              </h2>
            </div>
            <div className="column is-one-quarter">
              <img className="HomePage-heroLogo" src="" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="HomePage-content section">
      <div className="container">
        <BridgeList onSelect={bridge => selectBridge(bridge.id)} />
      </div>
    </section>
  </div>;

const mapDispatch = dispatch => ({
  selectBridge: bridgeId => dispatch(push(`/bridge/${bridgeId}`)),
});

export default connect(null, mapDispatch)(HomePage);
