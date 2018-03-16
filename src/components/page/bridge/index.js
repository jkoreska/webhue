import React from "react";

import Header from "components/header";
import BridgeView from "components/bridge/view";

import "./index.scss";

const BridgePage = () =>
  <div className="BridgePage">
    <Header/>
    <section className="BridgePage-content section">
      <div className="container">
        <BridgeView />
      </div>
    </section>
  </div>;

export default BridgePage;
