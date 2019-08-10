
import { windowToIterable } from './utilities';

export const findAllFrames = () => { 
    const firstParent = getFirstParent(window);
    const allFrames = getAllChildrenFrames(firstParent);
    allFrames.push(firstParent);
    return allFrames.filter((frame) => frame !== window);
}

const getFirstParent = (mainFrame) => {
    if (mainFrame.length !== 0) {
        const parentFrame = mainFrame.parent;
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

