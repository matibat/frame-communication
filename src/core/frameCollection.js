'use strict'

import { findAllFrames } from './query';
import { Observable } from 'rxjs';

const ACTION_ADD = 'ADD';
const ACTION_REMOVE = 'REMOVE';
const DEFAULT_REFRESH_TIMEOUT = 5000;
const frames = [ ]
const subscribersAll = [ ]
const subscribersChanges = [ ]
var REFRESH_INTERVAL;

function addFrame(newFrame) {
    frames.push(newFrame);
    notifyChange(newFrame, ACTION_ADD);
}

function removeFrame(deadFrame) {
    const index = frames.indexOf(deadFrame);
    frames.splice(index, 1);
    notifyChange(deadFrame, ACTION_REMOVE);
}

function notifyChange(modifiedValue, action) {
    const changes = {
        value: modifiedValue,
        action: action
    };
    notifyAll(subscribersAll, frames);
    notifyAll(subscribersChanges, changes);
}

function notifyAll(subscribers, value) {
    subscribers.forEach(subscriber => {
        subscriber.next(value);
    });
}

export const start = function(_timeout) {
    if (REFRESH_INTERVAL) {
        stop();
    }
    REFRESH_INTERVAL = setInterval(() => {;
        const updatedFrames = findAllFrames();
        refresh(updatedFrames);
    }, DEFAULT_REFRESH_TIMEOUT);
}

function refresh(updatedFrames) { 
    const removed = frames.filter(frame => !updatedFrames.includes(frame));
    const added = updatedFrames.filter(frame => !frames.includes(frame));
    removed.forEach(frame => removeFrame(frame));
    added.forEach(frame => addFrame(frame));
}

export const stop = function() {
    clearInterval(DEFAULT_REFRESH_TIMEOUT);
    REFRESH_INTERVAL = null;
}

export const all = new Observable(observer => {
    subscribersAll.push(observer);

    function unsubscribe() {
        const index = subscribersAll.indexOf(observer);
        subscribersAll.splice(index, 1);
    }
    return unsubscribe;
});

export const changes = new Observable(observer => {
    subscribersChanges.push(observer);

    function unsubscribe() {
        const index = subscribersChanges.indexOf(observer);
        subscribersChanges.splice(index, 1);
    }
    return unsubscribe;
});
