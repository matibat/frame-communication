import { getAllFrameWindows } from './core';

export function windowToIterable(windowObject) {
    const iterable = [ ];
    for (let i = 0; i < windowObject.length; i++) {
        iterable.push(windowObject[i]);
    }
    iterable.frames = windowObject.frames;
    iterable.original = windowObject;
    return iterable;
}

export const broadcastRawMessage = (frames, ...postMessageOptions) => {
    const f = frames || getAllFrameWindows();
    f.forEach(frame => {
        sendRawMessage(frame, ...postMessageOptions);
    });
}

export const sendRawMessage = (frame, ...postMessageOptions) => {
    if (frame.postMessage) {
        frame.postMessage(...postMessageOptions);
    }
}

