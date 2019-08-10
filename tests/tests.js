'use strict'

// const FrameCommunication = require('frame-communication');
// import * as FrameCommunication from 'FrameCommunication';

const assert = chai.assert;

describe('FrameCommunication.findAllFrames()', function() {
    let domains;

    this.beforeEach(function() {
        console.log(JSON.stringify(FrameCommunication));
        domains = FrameCommunication.findAllFrames();
    });

    it('returns an array', function(done, reject) {
        domains = FrameCommunication.findAllFrames();
        assert.isArray(domains)
        done();
    });

    it('returned type is correnct', function(done, reject) {
        const expectedType = FrameCommunication.FrameContainer;
        assert.instanceOf(domains, expectedType);
    });
});
