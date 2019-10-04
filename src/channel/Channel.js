import { STATE_INVALID, STATE_CLOSED, STATE_OPEN, STATE_CLEAN } from './constants';
import { sendOpenMessage, sendCloseMessage, sendMessage } from './messages';
import { Transaction } from './Transaction';
import { getAppName } from '../index';
import { Handler } from './handler';
import { onIncomingTransaction } from './listener';

/** 
 * configuration {
 *     opener: 'appName',
 *     domain: 'github.com',
 *     name: 'channelName',
 *     type: 'channelType'
 * }
 **/

export function Channel(frame, configuration) {
    let handler = new Handler();
    let opened = false;
    let clean = true;
    let isInvalid = false;

    function setOpenedState(isOpened) {
        if (typeof isOpened === 'boolean') opened = isOpened;
    }

    class Channel {
        constructor() {
            onIncomingTransaction.subscribe({
                next: (message) => {
                    const transaction = message.transaction;
                    const channelName = transaction.channelName;
                    const nameMatches = channelName === this.name;
                    if (nameMatches) handler.handle(message.payload);
                }
            });
        }

        get isValid() {
            return this.state !== STATE_INVALID;
        }

        get isOpened() {
            return this.state === STATE_OPEN;
        }

        get state() {
            if (isInvalid) return STATE_INVALID;
            if (clean) return STATE_CLEAN;
            if (opened) return STATE_OPEN 
            else return STATE_CLOSED;
        };

        get id() {
            return `${frame.appName}.${this.name}`;
        }

        get name() {
            return configuration.name;
        }

        set handler(h) {
            handler.set(h);
        }

        postMessage = (...postMessageOptions) => {
            configuration.frameWindow.postMessage(...postMessageOptions);
        }

        open = async () => {
            return await sendOpenMessage(this)
                .then(() => {
                    clean = false;
                    opened = true;
                    return Promise.resolve();
                });
        }

        close = async () => {
            return await sendCloseMessage(this)
                .then(() => {
                    opened = false;
                    return Promise.resolve();
                });
        }

        send = async (message, timeout) => {
            return await sendMessage(this, message, timeout);
        };
    }

    return new Channel();
}
