'use strict'

import { changes, ACTION_ADD, ACTION_REMOVE } from '../core/frameCollection';
import { Frame } from './Frame';
export { Frame };

const foundFrames = [ ]

let unsubscribeFrameCollection = changes.subscribe({ next: onFrameChanged });

function onFrameChanged({value, action}) {
    if (action === ACTION_ADD) {
        const newFrame = new Frame(value);
        foundFrames.push(newFrame);
    } else if (action === ACTION_REMOVE) {
        const toRemove = getFrame(value);
        const indexToRemove = foundFrames.indexOf(toRemove);
        foundFrames.splice(indexToRemove, 1);
    }
}

export function getFrame(wantedFrame) {
    const found = foundFrames.find(frame => frame.frame === wantedFrame);
    return found;
}

export function findFrames(frameName) {
    const found = foundFrames.filter(frame => frame.appName === frameName);
    return found;
}
