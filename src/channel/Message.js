export default class Message {
    constructor({payload, transaction}) {
        this.transaction = transaction;
        this.payload = payload;
    }
}
