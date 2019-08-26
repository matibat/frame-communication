'use strict'

import { windowToIterable } from '../utilities';
export { Frame } from './Frame';

export const getAllFrameWindows = () => { 
    const firstParent = getFirstParent(window);
    const allFrames = getAllChildrenFrames(firstParent);
    allFrames.push(firstParent);
    return allFrames.filter((frame) => frame !== window);
}

const getFirstParent = (mainFrame) => {
    const parentFrame = mainFrame.parent;
    const parentIsSelf = parentFrame === window;
    if (mainFrame.length !== 0 && !parentIsSelf) {
        return getFirstParent(parentFrame);
    }
    return mainFrame;
}

const getAllChildrenFrames = (mainFrame) => { 
    const directChildrenFrames = windowToIterable(mainFrame.frames).map((frame) => windowToIterable(frame));
    const allChildrenFrames = [ ];
    if (directChildrenFrames.length !== 0) {
        allChildrenFrames.push(...directChildrenFrames);
        directChildrenFrames.forEach((childrenFrame) => {
            allChildrenFrames.push(...getAllChildrenFrames(childrenFrame));
        });
    }
    return allChildrenFrames;
}
