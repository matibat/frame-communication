'use strict'

import { getAllFrames } from '../src/core';

const assert = chai.assert;

describe('core.findAllFrames()', function() {
    let frames;

    this.beforeAll(function() {
        console.log(JSON.stringify(FrameCommunication));
        frames = getAllFrames();
    });

    it('returns an array', function(done, reject) {
        assert.isArray(frames)
        done();
    });

    it('returned type is correnct', function(done, reject) {
        const expectedType = FrameCommunication.FrameContainer;
        frames.forEach(frame => {
            assert.instanceOf(frame, expectedType);
        });
        done();
    });
});

describe('query frames by app name', function() {
    it('returns empty array if no one was found', function() {
        return FrameCommunication.findFrames('wrongAppName');
    })

    it('finds some direct children frame');
});
