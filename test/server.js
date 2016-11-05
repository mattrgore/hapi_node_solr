'use strict';

const Lab = require('lab');
const Code = require('code');

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

const server = require('../server');

describe('Example Server', () => {
    it('GET /docs', (done) => {
        server.inject('/docs', (res) => {
            expect(res.statusCode).to.equal(200);
            done();
        })
    });

    it('GET /junk', (done) => {
        server.inject('/junk', (res) => {
            expect(res.statusCode).to.equal(404);
            expect(res.result).to.deep.equal({statusCode: 404, error: 'Not Found'});
            done();
        })
    });
});