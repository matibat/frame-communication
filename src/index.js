'use strict'

// TODO: Add middleware support

import { sayIAm, getAllFrameWindows, start as listen, stop as pause } from './core';

export { listen, pause };
export { findFrames, Frame } from './Frame';

let appName = '';

export function getAppName() {
    return appName;
}

export function enable(_appName) {
    if (appName === '') {
        appName = _appName;
        announceMe();
        listen();
    }
}

function announceMe() {
    const allFrameWindows = getAllFrameWindows();
    allFrameWindows.forEach(frame => {
        sayIAm(frame, '*');
    });
}

export function disable() {
    appName = '';
    pause();
}
