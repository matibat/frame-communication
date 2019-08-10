'use strict'

import FrameCommunication from '../build/build';

const assert = chai.assert;

describe('Test suite #1', function() {

    this.beforeEach(function() {
        console.log(JSON.stringify(FrameCommunication));
    });

    it('finds all active frames by domain', function(done, reject) {
        const domains = FrameCommunication.findAllFrames();
        if (Array.isArray(domains)) {
            done();
        } else {
            reject();
        }
    });
});
