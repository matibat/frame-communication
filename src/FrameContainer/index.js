'use strict'

export function FrameContainer(frame) {

    isCommunicationEnabled = false;
    
    class _frameContainer {
        get isCommunicationEnabled() {
            return isCommunicationEnabled;
        }
    }

    return new _frameContainer();
}
