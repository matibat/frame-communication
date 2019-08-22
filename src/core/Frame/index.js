'use strict'

import { changes, ACTION_ADD, ACTION_REMOVE } from '../frameCollection';
export { Frame } from './Frame';

const foundFrames = [ ]

let unsubscribeFrameCollection = changes.subscribe({ next: onFrameChanged });

function onFrameChanged({frame, action}) {
    if (action === ACTION_ADD) {
        const newFrame = new Frame(frame);
        foundFrames.push(newFrame);
    } else if (action === ACTION_REMOVE) {
        const toRemove = getFrame(frame);
        const indexToRemove = foundFrames.indexOf(toRemove);
        foundFrames.splice(indexToRemove, 1);
    }
}

export function getFrame(wantedFrame) {
    const found = foundFrames.find(frame => frame.frame === wantedFrame);
    return found;
}

export function findFrames(frameName) {
    const found = foundFrames.filter(frame => frame.name === frameName);
    return found;
}
