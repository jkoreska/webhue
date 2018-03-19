# WebHue

Philips Hue web client

## About

WebHue is a standalone (server-less) web application for controlling Philips Hue lights on your local network.

It is currently implemented with React+Redux and should run on any modern browser.

You can modify, build, and/or host the app as you see fit. I host a copy on my ww-drt router and also a public copy here: https://hue.koreska.net/

## Building

`> yarn install`

`> gulp client`

`> open dist/index.html` or `> sudo nginx -p $PWD -c nginx.conf`

## TODO

- Implement complete light controls (hue, brightness, transition)
- Implement groups/rooms
- Implement scenes
- Implement sensors
- Implement bridge scanning (for isolated networks)
- Wrap into Android and iOS builds
- Drink beer
