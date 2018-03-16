import React from "react";
import { Link } from "react-router-dom";

import Header from "components/header";
import BridgeList from "components/bridge/list";

import "./index.scss";

const HomePage = () =>
  <div className="HomePage">
    <Header/>
    <section className="hero is-primary is-bold">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-mobile">
            <div className="column">
              <h1 className="title is-2">
                Webhue
              </h1>
              <h2 className="subtitle">
                Philips HUE web client
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
        <BridgeList />
      </div>
    </section>
  </div>;

export default HomePage;
