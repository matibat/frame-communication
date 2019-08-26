'use strict'

import { getAllFrameWindows } from '../src/core';
import { isNumber } from 'util';

const assert = chai.assert;

describe('core.findAllFrames()', function() {
    let frames;

    this.beforeAll(function() {
        console.log(JSON.stringify(FrameCommunication));
        frames = getAllFrameWindows();
    });

    it('returns an array', function(resolve, reject) {
        assert.isArray(frames)
        resolve();
    });

    it('there is some element found', function(resolve, reject) {
        const length = frames.length;
        assert.isAtLeast(length, 1);
        resolve();
    });

    it('returned array contains window frames', function(resolve, reject) {
        frames.forEach(frame => {
            const hasLength = isNumber(frame.length);
            const hasFramesAttribute = Object.keys(frame).includes('frames');
            if (!(hasFramesAttribute && hasLength)) {
                reject();
            }
        });
        resolve();
    });
});

describe('query frames by app name', function() {
    it('returns empty array if no one was found', function() {
        return FrameCommunication.findFrames('wrongAppName');
    })

    it('finds some direct children frame');
});
