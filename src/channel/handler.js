import * as regeneratorRuntime from 'regenerator-runtime';

const dummyHandler = async (message) => { 
    console.log(`Dummy handler has recieved this message: ${JSON.stringify(message)}`);
    return null;
}

export class Handler {
    constructor(handler) { 
        this.set(handler);
    }

    set = (handler) => {
        this._handler = handler;
    }

    handle = async (message) => {
        let handler;
        if (this.isValid()) {
            handler = this._handler;
        } else {
            handler = dummyHandler;
        }
        return await handler(message);
    }

    isValid = () => {
        const handlerIsAFunction = typeof this._handler === 'function';
        return handlerIsAFunction;
    }
}
