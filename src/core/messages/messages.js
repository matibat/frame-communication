'use strict'

import { Observable } from 'rxjs';
import { getAppName } from '../../index';
import { getAllFrameWindows } from '../query';

const defaultOptions = [ ];

export const askWhoIs = (appName, frames, target) => {
    const message = {
        whoIs: {
            appName: appName
        }
    }
    broadcastRawMessage(frames, message, target);
}

export const sayIAm = (frame, target) => {
    const appName = getAppName();
    const message = {
        iAm: {
            appName: appName
        }
    }
    sendRawMessage(frame, message, target);
}

const broadcastRawMessage = (frames, ...postMessageOptions) => {
    const f = frames || getAllFrameWindows();
    f.forEach(frame => {
        sendRawMessage(frame, ...parseOptions(postMessageOptions));
    });
}

const sendRawMessage = (frame, ...postMessageOptions) => {
    if (frame.postMessage) {
        frame.postMessage(...parseOptions(postMessageOptions));
    }
}

const parseOptions = (options) => {
    const parsed = options;
    parsed[1] = (typeof options[1] === 'string') ? options[1] : '*';
    return parsed;
 }
