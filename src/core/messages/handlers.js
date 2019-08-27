'use strict'

import { Observable } from 'rxjs';
import { getAppName } from '../../index';
import { sayIAm } from './messages';

const appDiscoveredObservers = [ ]

export function whoIsHandler(event) {
    const source = event.source;
    const data = event.data;
    const appName = data.whoIs.appName;
    const myAppName = getAppName();
    if (appName === myAppName) {
        sayIAm(source, '*');
    }
}

export function iAmHandler(event) {
    const source = event.source;
    const data = event.data;
    const appName = data.iAm.appName;
    appDiscoveredObservers.forEach(observer => {
        const discovered = {
            frame: source,
            appName: appName
        }
        observer.next(discovered);
    });
}

export const appDiscovered = new Observable((observer) => {
    appDiscoveredObservers.push(observer);

    return function unsubscribe() {
        const observerIndex = appDiscoveredObservers.indexOf(observer);
        appDiscoveredObservers.splice(observerIndex, 1);
    }
});
