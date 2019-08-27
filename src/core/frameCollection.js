'use strict'

import { getAllFrameWindows } from './query';
import { Observable } from 'rxjs';

export const ACTION_ADD = 'ADD';
export const ACTION_REMOVE = 'REMOVE';
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
    REFRESH_INTERVAL = setInterval(() => refresh(), DEFAULT_REFRESH_TIMEOUT);
    refresh();
}

function refresh() { 
    const updatedFrames = getAllFrameWindows();
    const removed = frames.filter(frame => !updatedFrames.includes(frame));
    const added = updatedFrames.filter(frame => !frames.includes(frame));
    removed.forEach(frame => removeFrame(frame));
    added.forEach(frame => addFrame(frame));
}

export const stop = function() {
    clearInterval(REFRESH_INTERVAL);
    REFRESH_INTERVAL = null;
}

export function getAll() {
    return new Promise((done, reject) => {
        const unsubscribe = all.subscribe({
            next: function next(value) {
                done(value);
                unsubscribe();
            }
        });
    });
}

export const all = new Observable(observer => {
    subscribersAll.push(observer);

    observer.next(frames);

    function unsubscribe() {
        const index = subscribersAll.indexOf(observer);
        subscribersAll.splice(index, 1);
    }
    return unsubscribe;
});

export const changes = new Observable(observer => {
    subscribersChanges.push(observer);

    frames.forEach((frame) => {
        observer.next({frame: frame, action: ACTION_ADD});
    });

    function unsubscribe() {
        const index = subscribersChanges.indexOf(observer);
        subscribersChanges.splice(index, 1);
    }
    return unsubscribe;
});
