'use strict'

// TODO: Add middleware support

export { Frame, findFrames, start, stop } from './core';

let appName = '';

export function getAppName() {
    return appName;
}

export function enable(_appName) {
    if (appName === '') {
        appName = _appName;
        start();
    }
}

export function disable() {
    appName = '';
    stop();
}
