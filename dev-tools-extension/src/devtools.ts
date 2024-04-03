import browser from "webextension-polyfill";

browser.devtools.panels.create("QuickState DevTools", "icons/icon-512x512.png", "index.html");
