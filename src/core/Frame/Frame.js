
export class Frame {
    constructor(frame) { 
        Object.defineProperty(this, 'frame', {
            value: frame
        });
    }

    isCommunicationEnabled;

    get isCommunicationEnabled() {
        return this.isCommunicationEnabled;
    }

    openChannel = async (name, target) => {

    }
}
