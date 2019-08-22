'use strict'

import { Observable } from 'rxjs';
import { getAppName } from '../../index';

const defaultOptions = [ ];

const whoIsSubscribers = [ ];

export const askWhoIs = (appName, frames, target) => {
    return new Observable((subscriber) => {
        const message = {
            whoIs: {
                appName: appName
            }
        }
        broadcastRawMessage(frames, message, target);
        whoIsSubscribers.push((value) => {
            subscriber.next(value);
        });
    });
}

export const sayIAm = (frame, target) => {
    const appName = getAppName();
    const message = {
        iAm: appName
    }
    sendRawMessage(frame, message, target);
}

const broadcastRawMessage = (frames, ...postMessageOptions) => {
    frames.forEach(frame => {
        sendRawMessage(frame, ...postMessageOptions);
    });
}

const sendRawMessage = (frame, ...postMessageOptions) => {
    const postMessage = frame.postMessage;
    if (postMessage) {
        postMessage(...postMessageOptions);
    }
}
