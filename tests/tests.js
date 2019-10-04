import * as regeneratorRuntime from 'regenerator-runtime';
import { isNumber } from 'util';
import { getAllFrameWindows } from '../src/core';
import * as FrameCommunication from '../src/index'; 
import { DUMMY_APP_NAME, MAIN_APP_NAME, DEFAULT_TIMEOUT, TEST_CHANNEL_NAME, EXAMPLE_MESSAGE } from './constants';
import { askWhoIs } from '../src/core/messages/messages';

const assert = chai.assert;

describe('find frame windows', function() {
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

    this.afterAll(function() {
        FrameCommunication.disable();
    });
});

describe('find frames by app name', function() {

    this.beforeAll(function() {
        FrameCommunication.enable(MAIN_APP_NAME);
    });

    it('returns empty array if no one was found', function() {
        return FrameCommunication.findFrames('wrongAppName');
    })

    it('finds itself', function(done) {
        setTimeout(function() {
            const found = FrameCommunication.findFrames(MAIN_APP_NAME);
            if (found.length < 1) {
                done(new Error('Not found'));
            } else done();
        }, DEFAULT_TIMEOUT);
    });

    it('finds another', function(done) {
        askWhoIs(DUMMY_APP_NAME, null, '*');
        setTimeout(function() {
            const found = FrameCommunication.findFrames(DUMMY_APP_NAME);
            if (found.length < 1) {
                done(new Error('No one found'));
            } else done();
        }, DEFAULT_TIMEOUT);
    });

    this.afterAll(function() {
        FrameCommunication.disable();
    });
});

describe('channels', function() {
    let dummyFrame;

    this.beforeAll(function() {
        FrameCommunication.enable(MAIN_APP_NAME);
        dummyFrame = FrameCommunication.findFrames(DUMMY_APP_NAME)[0];
    });

    it('define channel', function(done) {
        dummyFrame.defineChannel({ name: TEST_CHANNEL_NAME });
        done();
    });

    it('open channel', function(done) {
        dummyFrame.openChannel(TEST_CHANNEL_NAME).then(() => {
            done();
        }).catch(error => {
            done(error)
        });
    });

    it('send message over channel', function(done) {
        const frameChannel = dummyFrame.channel(TEST_CHANNEL_NAME);
        frameChannel.send(EXAMPLE_MESSAGE).then(() => {
            done();
        }).catch(error => {
            done(error)
        });
    });

    it('close channel', function(done) {
        dummyFrame.closeChannel(TEST_CHANNEL_NAME).then(() => {
            done();
        }).catch(error => {
            done(error)
        });
    });

    this.afterAll(function() {
        FrameCommunication.disable();
    });
})
