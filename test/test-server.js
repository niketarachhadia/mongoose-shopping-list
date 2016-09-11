
global.DATABASE_URL = 'mongodb://localhost/shopping-list-test';

var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server.js');
var Item = require('../models/items');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

describe('Shopping List', function() {
    before(function(done) {
        server.runServer(function() {
            Item.create({name: 'Broad beans'},
                        {name: 'Tomatoes'},
                        {name: 'Peppers'}, function() {
                done();
            });
        });
    });
 it('should list items on get',function(done){
	chai.request(app)
	.get('/items')
	.end(function(err,res){
	   should.equal(err, null);
	   res.should.have.status(200);
	   res.should.be.json;
	   res.body.should.be.a('array');
	   res.body.should.have.length(3);
	   res.body[0].should.be.a('object');
	   res.body[0].should.have.property('name');
           res.body[0].name.should.be.a('string');
	   res.body[0].name.should.equal('Broad beans');
	   res.body[1].name.should.equal('Tomatoes');
	   res.body[2].name.should.equal('Peppers');
	   done();					
	});
    });
  it('should add an item on post',function(done){
	chai.request(app)
	.post('/items')
	.send({'name':'Kale'})
	.end(function(err, res){
		should.equal(err, null);
		res.should.have.status(201);
		res.should.be.json;
		res.body.should.be.a('object');
		res.body.should.have.property('name');
                        res.body.name.should.be.a('string');
                        res.body.name.should.equal('Kale');

		done();
	});		
	
    });

it('should edit an item on put',function(done){
	chai.request(app)
        .post('/items')
        .send({'name':'Kale'})
        .end(function(err, res){
		var id=res.body._id;
		chai.request(app)
        	.put('/items/'+id)
        	 .set('dataType','json')
        	.set('contentType','application/json')
        	.send({'name':'ginger','_id':id})
        	.end(function(err, res){
			console.log(res.body);
                	should.equal(err, null);
                	res.should.have.status(201);
                	res.should.be.json;
                	res.body.should.be.a('object');
                	done();
        	});
	});
	
});	
it('should delete an item on delete',function(done){
  chai.request(app)
        .post('/items')
        .send({'name':'Kale'})
        .end(function(err, res){
		var id=res.body._id;
		chai.request(app)
		.delete('/items/'+id)
		.end(function(err, res){
			should.equal(err,null);
			res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
			done();
		});
    });
});
    after(function(done) {
        Item.remove(function() {
            done();
        });
    });
});														
