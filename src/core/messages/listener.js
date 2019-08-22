'use strict'

import { whoIsHandler, iAmHandler } from './handlers';

function listener(event) {
    const data = event.data;
    const origin = event.origin;
    const source = event.source;
    if (data.whoIs) {
        whoIsHandler(event);
    } if (data.iAm) {
        iAmHandler(event);
    }
}

window.addEventListener('message', listener);
