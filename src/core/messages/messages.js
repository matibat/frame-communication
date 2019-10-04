'use strict'

import { getAppName } from '../../index';
import { sendRawMessage, broadcastRawMessage } from '../../utilities';

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
