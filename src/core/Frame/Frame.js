import * as regeneratorRuntime from 'regenerator-runtime';

import { appDiscovered } from "../messages";

export class Frame {
    constructor(frame) { 
        Object.defineProperties(this, [{ name: 'frame', value: frame.original || frame, writable: true }]);
        this.unsubscribeAppDiscovery = appDiscovered.subscribe({ next: ({frame: value, appName}) => {
            if (value === frame) {
                Object.defineProperty(this, 'appName', { value: appName, writable: false, enumerable: true, configurable: true });
            }
        } });
    }

    get isCommunicationEnabled() {
        return !!this.appName;
    }

    openChannel = async (name, target) => {

    }
}
