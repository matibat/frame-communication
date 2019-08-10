'use strict'

import { findAllFrames } from '../src/core';

const assert = chai.assert;

describe('core.findAllFrames()', function() {
    let frames;

    this.beforeEach(function() {
        console.log(JSON.stringify(FrameCommunication));
        frames = findAllFrames();
    });

    it('returns an array', function(done, reject) {
        frames = findAllFrames();
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
