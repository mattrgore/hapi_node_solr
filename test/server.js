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

    describe('/products endpoints', () => {
        describe('GET /products', () => {
            it('handle naked request', (done) => {
                server.inject('/products', (res) => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.result[0]).to.deep.equal({id: 1, name: 'Guitar'});
                    expect(res.result[1]).to.deep.equal({id: 2, name: 'Banjo'});
                    done();
                })
            });

            it('handle request with param name', (done) => {
                server.inject('/products?name=Guitar', (res) => {
                    expect(res.statusCode).to.equal(200);
                    expect(res.result[0]).to.deep.equal({id: 1, name: 'Guitar'});
                    expect(res.result).to.have.length(1);
                    done();
                })
            });


        });

        function testFor(id, value, callback) {
            server.inject('/products/' + id, (res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.result).to.deep.equal(value);
                callback();
            })
        }

        it('GET /products/x', (done) => {
            testFor(1, {id: 1, name: 'Guitar'}, () => {
                testFor(2, {id: 2, name: 'Banjo'}, done)
            })
        });

    });


});
