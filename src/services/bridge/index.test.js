import { expect } from "chai";

import fetch from "node-fetch";
import FakeStorage from "modules/fake/storage";
import BridgeService from "services/bridge";

describe("BridgeService", function() {

  const bridgeService = new BridgeService({}, fetch, new FakeStorage());

  it("should construct a new instance", () => {
    expect(bridgeService).to.be.an("object");
  });

  it("should fetch bridges", () => {
    return bridgeService
      .fetchBridges()
      .then(bridges =>
        expect(bridges).to.be.an("array")
      );
  });

  it.only("should not authenticate a bridge before pressing button", () => {
    return bridgeService
      .fetchBridges()
      .then(bridges => {
        const bridgeId = bridges[0].id;
        return bridgeService
          .authenticateBridge(bridgeId)
          .then(user => expect(user.username).to.be.a("string"));
      });
  });

  it("should fetch lights", () => {
    return bridgeService
      .fetchBridges()
      .then(bridges => {
        const bridgeId = bridges[0].id;
        return bridgeService
          .fetchLights(bridgeId)
          .then(lights =>
            expect(lights).to.be.an("array")
          );
      });
  });

});
