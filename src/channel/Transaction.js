
var count = 0;

export function Transaction(t) {
    let transactionData = typeof t === 'string' ? JSON.parse(t) : t;
    let transactionCount = transactionData.count ? transactionData.count : count++;

    console.debug(`New transaction with data: ${JSON.stringify(transactionData)}`);

    class Transaction {

        get serialized() {
            const unparsed = {
                appName: this.appName,
                channelName: this.channelName,
                count: this.count,
                action: this.action
            }
            return JSON.stringify(unparsed);
        }

        get appName() {
            return transactionData.appName;
        }

        get channelName() {
            return transactionData.channelName;
        }

        get count() {
            return transactionCount;
        }

        get action() {
            return transactionData.action;
        }

        get isValid() {
            const isValid = !!(this.appName && this.channelName && this.action);
            return isValid;
        }
        
        isSame = (transaction) => {
            const sameAppName = transaction.appName === this.appName;
            const sameChannelName = transaction.channelName === this.channelName;
            const sameCount = transaction.count === this.count;
            const sameAction = transaction.action === this.action;
            const isSame = !!(sameAppName && sameChannelName && sameCount && sameAction);
            return isSame;
        };
    }
    return new Transaction();
}
