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
    "users",
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

  getBridges(force = false) {
    return (
      this.bridges && !force
        ? new Promise(resolve => resolve(this.bridges))
        : this._fetchBridges()
      )
      .then(this._mapUsersToBridges.bind(this));
  }

  getUsers() {
    return this.users
      ? this.users
      : this.users = [];
  }

  _mapUsersToBridges(bridges) {
    return bridges.map(bridge => {
      const user =
        this.getUsers().find(user => user.bridgeId === bridge.id);
      if (user)
        bridge.user = user;
      return bridge;
    });
  }

  _fetchBridges() {
    return this
      .fetch("https://www.meethue.com/api/nupnp")
      .then(jsonHandler)
      .then(bridges =>
        Promise
          .all(bridges.map(this._fetchBridgeConfig.bind(this)))
          .then(bridges => {
            this.bridges = bridges;
            this._store();
            return bridges;
          })
      );
  }

  _fetchBridgeConfig(bridge) {
    return this
      .fetch(`http://${bridge.internalipaddress}/api/config`)
      .then(jsonHandler)
      .then(config => ({
        ...bridge,
        ...config,
      }));
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
        const user = status.success;
        user.bridgeId = bridgeId;
        this.getUsers().push(user);
        this._store();
        return user;
      });
  }

  getLights(bridgeId) {
    return this._fetchLights(bridgeId);
  }

  _fetchLights(bridgeId) {
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
        bridge.lights = Object
          .keys(lights)
          .map(id => ({
            id,
            ...lights[id],
          }));
        this._store();
        return bridge.lights;
      });
  }

  updateLight(bridgeId, lightId, state) {
    const bridge =
      this.bridges.find(bridge => bridge.id === bridgeId);
    if (!bridge)
      return new Promise(() => Promise.reject("Bridge not found"));
    if (!bridge.user)
      return new Promise(() => Promise.reject("Bridge not authenticated"));

    return this
      .fetch(`http://${bridge.internalipaddress}/api/${bridge.user.username}/lights/${lightId}/state`, {
        method: "PUT",
        body: JSON.stringify(state),
      })
      .then(jsonHandler)
      .then(items => {
        const status = items[0];
        if (status.error)
          throw new Error(status.error.description);
        const light = bridge.lights
          .find(light => light.id === lightId);
        light.state = {
          ...light.state,
          ...state,
        };
        this._store();
        return light;
      });
  }

}

export default BridgeService;
