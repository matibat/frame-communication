'use strict'

const PING_MESSAGE = 'ping';
const PONG_MESSAGE = 'pong';

export const broadcastMessage = (frames, ...postMessageOptions) => {
    frames.forEach(frame => {
        sendRawMessage(frame, ...postMessageOptions);
    });
}

export const sendRawMessage = (frame, ...postMessageOptions) => {
    const postMessage = frame.postMessage;
    if (postMessage) {
        postMessage(...postMessageOptions);
    }
}
