import Bottle from "bottlejs";

import "whatwg-fetch";

import config from "./config";
import CookieService from "services/cookie";
import BridgeService from "services/bridge";

const kernel = new Bottle();

kernel.service("config", () => config);
kernel.service("location", () => window.location);
kernel.service("history", () => window.history);
kernel.service("fetch", () => fetch.bind(window));
kernel.service("document", () => document);
kernel.service("storage", () => window.localStorage);

kernel.service("cookieService", CookieService, "config", "document");
kernel.service("bridgeService", BridgeService, "config", "fetch", "storage");

export default kernel.container;
