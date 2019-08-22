'use strict'

const STATE_CLEAN = 'CLEAN';
const STATE_READY = 'READY';
const STATE_OPEN = 'OPEN';
const STATE_CLOSED = 'CLOSED';
const STATE_INVALID = 'INVALID';

export function Channel(frame) {
    if (!frame) return;

    let openSignalRecieved = false;
    let closeSignalRecieved = false;
    let isInvalid = false;
    let name = '';
    let target = '';

    class Channel {
        constructor() { }

        get state() {
            if (isInvalid) return STATE_INVALID;
            if (closeSignalRecieved) return STATE_CLOSED;
            if (openSignalRecieved) return STATE_OPEN;
            if (name || target) return STATE_READY;
            return STATE_CLEAN;
        };

        open = (channelName, targetDomain) => {
            name = channelName;
            target = targetDomain;
            //
        }
    }

    return new Channel();
}
