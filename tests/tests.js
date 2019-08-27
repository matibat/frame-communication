'use strict'

import { isNumber } from 'util';

import { getAllFrameWindows } from '../src/core';
import * as FrameCommunication from '../src/index'; 
import { DUMMY_APP_NAME, MAIN_APP_NAME, DEFAULT_TIMEOUT } from './constants';
import { askWhoIs } from '../src/core/messages/messages';

const assert = chai.assert;

describe('core.getAllFrameWindows()', function() {
    let frames;

    this.beforeAll(function() {
        FrameCommunication.enable(MAIN_APP_NAME);
        frames = getAllFrameWindows();
    });

    it('returns an array', function(done) {
        assert.isArray(frames)
        done();
    });

    it('there is some element found', function(done) {
        const length = frames.length;
        assert.isAtLeast(length, 1);
        done();
    });

    it('returned array contains window frames', function(done) {
        frames.forEach(frame => {
            const hasLength = isNumber(frame.length);
            const hasFramesAttribute = Object.keys(frame).includes('frames');
            if (!(hasFramesAttribute && hasLength)) {
                done(new Error('Returned non frame'));
            }
        });
        done();
    });
});

describe('find frames by app name', function() {
    it('returns empty array if no one was found', function() {
        return FrameCommunication.findFrames('wrongAppName');
    })

    it('finds itself', function(done) {
        setTimeout(function() {
            const found = FrameCommunication.findFrames(MAIN_APP_NAME);
            if (found.length < 1) {
                done(new Error('No one found'));
            } else done();
        }, DEFAULT_TIMEOUT);
    });

    it('finds another', function(done) {
        askWhoIs(DUMMY_APP_NAME);
        setTimeout(function() {
            const found = FrameCommunication.findFrames(DUMMY_APP_NAME);
            if (found.length < 1) {
                done(new Error('No one found'));
            } else done();
        }, DEFAULT_TIMEOUT);
    });
});
