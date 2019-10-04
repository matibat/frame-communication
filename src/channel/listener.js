import { Observable } from "rxjs";
import { Transaction } from "./Transaction";
import Message from "./Message";

window.addEventListener('message', postMessageHandler);

const transactionResponseListeners = [ ];
const incomingTransactionListeners = [ ];

function postMessageHandler(event) {
    const data = event.data;
    const origin = event.origin;
    const source = event.source;
    if (data.transaction) {
        const transaction = new Transaction(data.transaction);
        const payload = data.payload;
        const transactionListener = transactionResponseListeners.find(listener => transaction.isSame(listener.transaction));
        if (transaction.isValid) {
            const message = new Message ({ transaction, payload });
            if (transactionListener) {
                transactionListener.observer.next(message);
            } else {
                incomingTransactionListeners.forEach(listener => { listener.next(message); })
            }
        } else {
            console.log(`Message with invalid transaction arrived: ${data.transaction}`);
        }
    }
}

export const onTransactionResponse = transaction => new Observable((observer) => {
    const listener = {
        observer: observer,
        transaction: transaction
    }
    transactionResponseListeners.push(listener);

    return function unsubscribe() {
        const observerIndex = transactionResponseListeners.indexOf(observer);
        transactionResponseListeners.splice(observerIndex, 1);
    }
});

export const onIncomingTransaction = new Observable((observer) => {
    incomingTransactionListeners.push(observer);

    return function unsubscribe() {
        const observerIndex = incomingTransactionListeners.indexOf(observer);
        incomingTransactionListeners.splice(observerIndex, 1);
    }
})
