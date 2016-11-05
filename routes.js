'use strict';

const Joi = require('joi');
var solr = require('solr-client');
var fs = require('fs');
var configuration = JSON.parse(fs.readFileSync('./configuration.json'));
var _ = undefined;

var client = solr.createClient(_,_,configuration.core,_,_,_,_,_);

let internals = {};

internals.getDepCat = function (request, reply) {

    var result = 'No depreciation category available'
    var query = client.createQuery()
                  .q(request.params.term)
                  .dismax()
                  .mm(2)
                  .start(0)
                  .rows(10);
    client.search(query,function(err,obj){
       if(err){
        console.log(err);
       }else{
        if (obj.response.numFound > 0){
            result = obj.response.docs["0"].depreciation_category;
        }
       }
    reply(result);
    });
}

module.exports = [{
    method: 'GET',
    path: '/depcat/{term}',
    handler: internals.getDepCat
    }
];
