import { jsonHandler } from "modules/fetch-handler";

class BridgeService {

  constructor(config, fetch, storage) {
    this.config = config;
    this.fetch = fetch;
    this.storage = storage;
    this._load();
  }

  static _storageKeys = [
    "bridges",
  ];

  _store() {
    BridgeService._storageKeys
      .forEach(key =>
        this.storage.setItem(key, JSON.stringify(this[key]))
      );
  }

  _load() {
    BridgeService._storageKeys
      .forEach(key =>
        this[key] = JSON.parse(this.storage.getItem(key))
      );
  }

  getBridges() {
    return this.bridges
      ? new Promise(resolve => resolve(this.bridges))
      : this.fetchBridges();
  }

  fetchBridges() {
    return this
      .fetch("https://www.meethue.com/api/nupnp")
      .then(jsonHandler)
      .then(bridges => {
        this.bridges = bridges;
        this._store();
        return bridges;
      });
  }

  authenticateBridge(bridgeId) {
    const bridge =
      this.bridges.find(bridge => bridge.id === bridgeId);
    if (!bridge)
      return new Promise(() => Promise.reject("Bridge not found"));

    return this
      .fetch(`http://${bridge.internalipaddress}/api`, {
        method: "POST",
        body: JSON.stringify({ devicetype: "webhue#browser" }),
      })
      .then(jsonHandler)
      .then(items => {
        const status = items[0];
        if (status.error)
          throw new Error(status.error.description);
        bridge.user = status.success;
        this._store();
        return bridge.user;
      });
  }

  fetchLights(bridgeId) {
    const bridge =
      this.bridges.find(bridge => bridge.id === bridgeId);
    if (!bridge)
      return new Promise(() => Promise.reject("Bridge not found"));
    if (!bridge.user)
      return new Promise(() => Promise.reject("Bridge not authenticated"));

    return this
      .fetch(`http://${bridge.internalipaddress}/api/${bridge.user.username}/lights`)
      .then(jsonHandler)
      .then(lights => {
        bridge.lights = lights;
        this._store();
      });
  }

}

export default BridgeService;
