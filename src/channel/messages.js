import * as regeneratorRuntime from 'regenerator-runtime';
import { ACTION_DATA, DEFAULT_TIMEOUT, ACTION_SET_STATE, STATE_OPEN, STATE_CLOSED } from "./constants";
import { onTransactionResponse } from "./listener";
import { Transaction } from "./Transaction";
import { getAppName } from "..";

export async function sendOpenMessage(channel, timeout) {
    return await channelStateMessage(channel, STATE_OPEN, timeout);
};

export async function sendCloseMessage(channel, timeout) {
    return await channelStateMessage(channel, STATE_CLOSED, timeout);
}

const channelStateMessage = async (channel, state, timeout) => new Promise((resolve, reject) => {
    const newTransaction = new Transaction({
        appName: getAppName(),
        channelName: channel.name,
        action: ACTION_SET_STATE
    });
    const message = {
        transaction: newTransaction.serialized,
        state
    }
    const timeoutReject = setTimeout(() => {
        subscription.unsubscribe();
        reject(new Error('Timeout'));
    }, timeout || DEFAULT_TIMEOUT);
    const subscription = onTransactionResponse(newTransaction).subscribe({
        next() {
            clearTimeout(timeoutReject);
            resolve();
        }
    });
    channel.postMessage(message, '*');
})

export const sendMessage = async (channel, payload, timeout) => new Promise((resolve, reject) => {
    const newTransaction = new Transaction({
        appName: getAppName(),
        channelName: channel.name,
        action: ACTION_DATA
    });
    const message = {
        transaction: newTransaction.serialized,
        payload
    };
    const timeoutReject = setTimeout(() => {
        subscription.unsubscribe();
        reject(new Error('Timeout'));
    }, timeout || DEFAULT_TIMEOUT);
    const subscription = onTransactionResponse(newTransaction).subscribe({
        next(response) {
            clearTimeout(timeoutReject);
            resolve(response);
        }
    });
    channel.postMessage(message, '*');
});
